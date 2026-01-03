
import { Transaction, Collector } from '../types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'revenue_tx_v1',
  AUTH_DATA: 'revenue_auth_v1',
  COLLECTOR: 'revenue_collector_v1',
};

export const storageService = {
  saveTransaction: (tx: Transaction) => {
    const existing = storageService.getTransactions();
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([tx, ...existing]));
  },

  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  updateTransactionSync: (id: string, status: 'Synced' | 'Failed') => {
    const txs = storageService.getTransactions().map(tx => 
      tx.id === id ? { ...tx, syncStatus: status } : tx
    );
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
  },

  setCollector: (collector: Collector) => {
    localStorage.setItem(STORAGE_KEYS.COLLECTOR, JSON.stringify(collector));
  },

  getCollector: (): Collector | null => {
    const data = localStorage.getItem(STORAGE_KEYS.COLLECTOR);
    return data ? JSON.parse(data) : null;
  },

  clearAll: () => {
    localStorage.clear();
  }
};
