
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Collector, Transaction, PaymentMethod, SyncStatus } from './types';
import { storageService } from './services/storageService';
import { DISTRICT_CODE } from './constants';

interface AppContextType {
  collector: Collector | null;
  transactions: Transaction[];
  isOnline: boolean;
  isSyncing: boolean;
  currentView: string;
  activeTx: Transaction | null;
  setCollector: (c: Collector | null) => void;
  setCurrentView: (view: any) => void;
  setActiveTx: (tx: Transaction | null) => void;
  addTransaction: (txData: any) => void;
  syncTransactions: () => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collector, setCollectorState] = useState<Collector | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentView, setCurrentView] = useState('auth');
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);

  useEffect(() => {
    const savedCollector = storageService.getCollector();
    if (savedCollector) {
      setCollectorState(savedCollector);
      setCurrentView('dashboard');
    }
    setTransactions(storageService.getTransactions());

    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const setCollector = (c: Collector | null) => {
    if (c) storageService.setCollector(c);
    setCollectorState(c);
  };

  const addTransaction = (txData: any) => {
    if (!collector) return;

    const newTx: Transaction = {
      ...txData,
      id: `TX-${DISTRICT_CODE}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      syncStatus: isOnline ? 'Synced' : 'Pending',
      collectorId: collector.id,
      ticketId: `${DISTRICT_CODE}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };

    storageService.saveTransaction(newTx);
    setTransactions(prev => [newTx, ...prev]);
    setActiveTx(newTx);
    setCurrentView('receipt');
  };

  const syncTransactions = async () => {
    if (!isOnline) return;
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const txs = storageService.getTransactions();
    txs.forEach(tx => {
      if (tx.syncStatus === 'Pending') {
        storageService.updateTransactionSync(tx.id, 'Synced');
      }
    });
    setTransactions(storageService.getTransactions());
    setIsSyncing(false);
  };

  const logout = () => {
    storageService.clearAll();
    setCollectorState(null);
    setCurrentView('auth');
  };

  return (
    <AppContext.Provider value={{
      collector, transactions, isOnline, isSyncing, currentView, activeTx,
      setCollector, setCurrentView, setActiveTx, addTransaction, syncTransactions, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
