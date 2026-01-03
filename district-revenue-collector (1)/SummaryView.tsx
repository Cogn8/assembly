
import React, { useState } from 'react';
import { CreditCard, Wallet, RefreshCw } from 'lucide-react';
import { Card, Button } from './components/Shared';
import { useApp } from './AppContext';
import { aiService } from './services/aiService';

const SummaryView: React.FC = () => {
  const { transactions, collector, logout } = useApp();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAnalysis = async () => {
    setLoading(true);
    const result = await aiService.analyzeDay(transactions, collector?.name || '');
    setAnalysis(result);
    setLoading(false);
  };

  const totals = transactions.reduce((acc, curr) => {
    acc.total += curr.amount;
    if (curr.paymentMethod === 'Cash') acc.cash += curr.amount;
    else acc.momo += curr.amount;
    return acc;
  }, { total: 0, cash: 0, momo: 0 });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 px-1">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="font-black text-xl text-slate-800">Final Summary</h2>
      </div>
      
      <div className="grid gap-4">
        <Card className="p-8 bg-slate-900 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden rounded-[2.5rem]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.4em] mb-3">Net Realized Collection</p>
          <h3 className="text-5xl font-black mb-8">GHS {totals.total.toFixed(2)}</h3>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Counterfoils</p>
              <p className="text-2xl font-black">{transactions.length}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Sync Health</p>
              <p className={`text-2xl font-black ${transactions.length > 0 && transactions.every(t => t.syncStatus === 'Synced') ? 'text-emerald-400' : 'text-amber-400'}`}>
                {transactions.length > 0 && transactions.every(t => t.syncStatus === 'Synced') ? '100%' : 'PENDING'}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 bg-white shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">MoMo Funds</span>
            </div>
            <p className="text-xl font-black text-slate-900">GHS {totals.momo.toFixed(2)}</p>
          </Card>
          <Card className="p-5 bg-white shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-600 mb-3">
              <Wallet className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Cash Funds</span>
            </div>
            <p className="text-xl font-black text-slate-900">GHS {totals.cash.toFixed(2)}</p>
          </Card>
        </div>

        <Card className="p-6 border-none bg-emerald-600/5 rounded-3xl">
          <h4 className="font-black text-xs text-emerald-900 flex items-center gap-3 mb-4 uppercase tracking-[0.2em]">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            Institutional Analysis
          </h4>
          {!analysis ? (
            <Button onClick={getAnalysis} variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest border-2 border-emerald-500/20 py-4" disabled={loading}>
              {loading ? 'Consulting Auditor...' : 'RUN AI COMPLIANCE CHECK'}
            </Button>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-2 bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
              <p className="text-sm text-slate-700 font-medium leading-relaxed">"{analysis}"</p>
              <p className="text-[9px] text-emerald-600 mt-4 text-right font-black uppercase tracking-widest">— Revenue Analytics Bureau</p>
            </div>
          )}
        </Card>

        <div className="pt-6">
          <Button onClick={logout} variant="primary" size="xl" className="w-full rounded-3xl font-black shadow-2xl py-6">
            FINALIZE DAY & LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
