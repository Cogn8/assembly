
import React from 'react';
import { ShoppingCart, RefreshCw, Wallet, CreditCard } from 'lucide-react';
import { Card, Button } from './components/Shared';
import { useApp } from './AppContext';

const DashboardView: React.FC = () => {
  const { transactions, isOnline, isSyncing, syncTransactions, setCurrentView } = useApp();

  const totalRevenue = transactions.reduce((a, b) => a + b.amount, 0);
  const pendingSync = transactions.filter(t => t.syncStatus === 'Pending').length;
  const momoTotal = transactions.filter(t => t.paymentMethod === 'MoMo').reduce((a, b) => a + b.amount, 0);
  const cashTotal = transactions.filter(t => t.paymentMethod === 'Cash').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 px-1">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="font-black text-xl text-slate-800">Assembly Status</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-white border-l-4 border-l-emerald-500 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Today's Revenue</p>
          <h3 className="text-2xl font-black text-slate-900">GHS {totalRevenue.toFixed(2)}</h3>
        </Card>
        <Card className="p-4 bg-white border-l-4 border-l-amber-500 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Receipts</p>
          <h3 className="text-2xl font-black text-slate-900">{transactions.length}</h3>
        </Card>
      </div>

      {pendingSync > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-xl">
              <RefreshCw className={`w-5 h-5 text-amber-600 ${isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">{pendingSync} Pending Sync</p>
              <p className="text-xs text-amber-700">Offline receipts detected</p>
            </div>
          </div>
          {isOnline && (
            <Button onClick={syncTransactions} variant="secondary" size="sm" disabled={isSyncing}>
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          )}
        </div>
      )}

      <div className="py-2">
        <Button onClick={() => setCurrentView('collection')} size="xl" className="w-full flex items-center justify-center gap-4 py-8 shadow-2xl shadow-emerald-500/20 rounded-3xl">
          <ShoppingCart className="w-8 h-8" />
          New Collection
        </Button>
      </div>

      <Card className="p-5">
        <h4 className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-500" />
          Funds Summary
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-slate-600">Mobile Money</span>
            </div>
            <span className="font-black text-slate-900 text-lg">GHS {momoTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-slate-600">Cash Collections</span>
            </div>
            <span className="font-black text-slate-900 text-lg">GHS {cashTotal.toFixed(2)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
