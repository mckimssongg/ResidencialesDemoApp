export interface Transaction {
  id: string;
  date: string; // ISO date
  amount: number;
  type: 'charge' | 'payment' | 'discount' | 'penalty';
  description: string;
  status: 'paid' | 'pending' | 'applied';
  tag: string; // e.g., 'Cuota', 'Pago', 'Penalidad'
  tagName: string;
}

export interface AccountSummary {
  totalBalance: number;
  overdueBalance: number;
  lastUpdated: string;
}

const MOCK_DELAY = 800; // ms

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2023-01-01',
    amount: 1200.00,
    type: 'charge',
    description: 'Cuota Mantenimiento Enero 2023',
    status: 'paid',
    tag: 'charge',
    tagName: 'Cuota'
  },
  {
    id: 't2',
    date: '2023-01-03',
    amount: 1200.00,
    type: 'payment',
    description: 'Pago Mantenimiento Enero 2023',
    status: 'applied',
    tag: 'payment',
    tagName: 'Pago'
  },
  {
    id: 't3',
    date: '2023-02-01',
    amount: 1200.00,
    type: 'charge',
    description: 'Cuota Mantenimiento Febrero 2023',
    status: 'paid',
    tag: 'charge',
    tagName: 'Cuota'
  },
  {
    id: 't4',
    date: '2023-02-05',
    amount: 1100.00,
    type: 'payment',
    description: 'Pago Parcial Febrero 2023',
    status: 'applied',
    tag: 'payment',
    tagName: 'Pago'
  },
  {
    id: 't5',
    date: '2023-02-10',
    amount: 100.00,
    type: 'discount',
    description: 'Descuento Pronto Pago',
    status: 'applied',
    tag: 'discount',
    tagName: 'Descuento'
  },
  {
    id: 't6',
    date: '2023-03-01',
    amount: 1200.00,
    type: 'charge',
    description: 'Cuota Mantenimiento Marzo 2023',
    status: 'pending',
    tag: 'charge',
    tagName: 'Cuota'
  },
  {
    id: 't7',
    date: '2023-03-07',
    amount: 500.00,
    type: 'penalty',
    description: 'Multa por ruido excesivo',
    status: 'pending',
    tag: 'penalty',
    tagName: 'Penalidad'
  }
];

export const MockFinanceService = {
  getAccountSummary(): Promise<AccountSummary> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalBalance: 1700.00, // 1200 + 500 pending
          overdueBalance: 1200.00,
          lastUpdated: new Date().toISOString()
        });
      }, MOCK_DELAY);
    });
  },

  getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockTransactions]);
      }, MOCK_DELAY);
    });
  },

  payTransaction(transactionId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success
        resolve({
          success: true,
          message: 'Pago procesado correctamente.'
        });
      }, 1500);
    });
  }
};
