
import React from 'react';
import { Receipt, CreditCard, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from './components/Shared';
import { useApp } from './AppContext';

const HistoryView: React.FC = () => {
  const { transactions } = useApp();

  return (
    <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
      <div className="flex items-center gap-2 px-1 mb-6">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="font-black text-xl text-slate-800">Daily Audit Log</h2>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-10 h-10 text-slate-200" />
          </div>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No transactions logged</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map(tx => (
            <Card key={tx.id} className="p-5 flex items-center gap-4 hover:shadow-md transition-all border-slate-100">
              <div className={`p-4 rounded-[1.2rem] ${tx.paymentMethod === 'MoMo' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {tx.paymentMethod === 'MoMo' ? <CreditCard className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-black text-slate-800 text-sm">{tx.feeTypeName}</p>
                  <p className="font-black text-slate-900">GHS {tx.amount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-tight truncate max-w-[150px]">{tx.marketName} • {new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${tx.syncStatus === 'Synced' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                    {tx.syncStatus === 'Synced' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {tx.syncStatus}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
