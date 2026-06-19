export const paymentProviders = ['stripe', 'paystack', 'flutterwave', 'm-pesa'] as const;

export type PaymentProvider = (typeof paymentProviders)[number];
