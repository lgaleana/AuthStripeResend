# Stripe building blocks

## Checkout flow

The checkout flow relies on a list of price lookups (or subscription keys). Here is the usual flow:

1. `stripe-get-subscription-prices`: Retrieve the list of subscription prices, given a list of subscription keys.
2. `stripe-checkout` send a price id and user information to subscribe.
3. `stripe-webhooks` will listen for changes.

**WARNING**: The Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the raw request body