import type Stripe from 'stripe';

import { stripe } from './config';
import { updateUserProfileByAdmin, getUserProfileByAdmin, getUserEmailByAdmin } from '../supabase/admin/profiles';

export async function findOrCreateStripeCustomer(userId: string): Promise<Stripe.Customer> {
    // Get user profile first - throw error if not found
    const profile = await getUserProfileByAdmin(userId);
    if (!profile) {
        throw new Error(`Profile not found for user: ${userId}`);
    }
    // If profile already has customer ID, try to retrieve it
    if (profile.stripe_customer_id) {
        const customer = await stripe.customers.retrieve(profile.stripe_customer_id).catch(() => null);
        if (customer && !customer.deleted) {
            return customer;
        }
    }

    // Get user email from auth.users table
    const userEmail = await getUserEmailByAdmin(userId);
    // Look up by email from auth.users
    const existingCustomers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customer = existingCustomers.data[0];

    // If no customer found, create new one
    if (!customer) {
        customer = await stripe.customers.create({
            email: userEmail,
            metadata: { user_id: userId }
        });
    }

    // Update profile
    await updateUserProfileByAdmin(userId, { stripe_customer_id: customer.id });

    return customer;
}
