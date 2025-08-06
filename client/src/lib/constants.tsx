export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: '💳' },
  { id: 'dana', name: 'DANA', icon: '💰' },
  { id: 'ovo', name: 'OVO', icon: '📱' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
] as const;

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const CONTACT_INFO = {
  whatsapp: '+6281234567890',
  email: 'support@topzoneid.com',
  phone: '+62 812-3456-7890',
} as const;
