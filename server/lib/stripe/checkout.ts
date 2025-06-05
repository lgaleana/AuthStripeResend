import { stripe } from './config';
import { getActiveCustomerSubscriptions } from './subscriptions';
import { findOrCreateStripeCustomer as findOrCreateCustomer } from './customers';

export interface CreateCheckoutSessionParams {
    userId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

export async function createCheckoutSession({
    userId,
    priceId,
    successUrl,
    cancelUrl,
}: CreateCheckoutSessionParams): Promise<string | null> {
    // Find or create customer to avoid duplicates
    const customer = await findOrCreateCustomer(userId);

    // Check for existing active subscriptions to prevent duplicates
    const activeSubscriptions = await getActiveCustomerSubscriptions({
        customerId: customer.id,
    });
    if (activeSubscriptions.length > 0) {
        return null;
    }

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        customer: customer.id,
        metadata: {
            user_id: userId,
            price_id: priceId,
        },
        subscription_data: {
            metadata: {
                user_id: userId,
                price_id: priceId,
            },
        },
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
    });
    return session.url!;
} 