import Stripe from 'stripe';

import { stripe } from './config';
import { updateUserProfileByAdmin } from '../supabase/admin/profiles';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!endpointSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
}

export interface WebhookHandlerParams {
    body: string | Buffer;
    signature: string;
}

export async function handleWebhook({
    body,
    signature,
}: WebhookHandlerParams): Promise<void> {
    let event: Stripe.Event;

    // Verify webhook signature and parse event
    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret!);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        throw new Error(`Webhook signature verification failed: ${errorMessage}`);
    }

    // Handle different event types
    switch (event.type) {
        case 'customer.subscription.created':
            const createdSubscription = event.data.object as Stripe.Subscription;
            console.log(`Subscription created: ${createdSubscription.status}`);
            await handleSubscriptionCreated(createdSubscription);
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }
}

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    // Update user profile with the subscription key
    const userId = subscription.metadata?.user_id;
    const subscriptionKey = subscription.metadata?.subscription_key;
    if (!userId) {
        throw new Error(`No user_id in subscription metadata: ${subscription.id}`);
    }
    if (!subscriptionKey) {
        throw new Error(`No price_lookup_key in subscription metadata: ${subscription.id}`);
    }
    await updateUserProfileByAdmin(userId, {
        stripe_subscription_key: subscriptionKey,
    });
    console.log(`Updated profile for user ${userId} with subscription ${subscription.id} for plan ${subscriptionKey}`);
}