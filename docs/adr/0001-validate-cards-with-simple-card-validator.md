# Validate cards with simple-card-validator

- **Status:** Deprecated
- **Date:** 2026-04-22
- **Applies to:** boutique-paymentservice
- **Deciders:** @arch-beagel-test/checkout

## Context

We needed card-type checks without a payment provider.

## Decision

`charge.js` validates the number with simple-card-validator and accepts only VISA and MasterCard.

## Consequences

Deprecated: a real provider will validate cards. Kept until it lands.
