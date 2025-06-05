# Stripe building blocks

## Checkout flow

The checkout flow relies on a list of subscription keys. Here is the usual flow:

1. `stripe-get-subscription-prices`: Retrieve the list of subscription prices, given a list of subscription keys.
2. Have the user choose a subscription plan.
2. `stripe-checkout` send a price id and an user id to subscribe.
3. `stripe-webhooks` will listen for changes.