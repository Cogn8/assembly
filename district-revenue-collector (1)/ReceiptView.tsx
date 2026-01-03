
import React from 'react';
import { CheckCircle2, Printer } from 'lucide-react';
import { Card, Button } from './components/Shared';
import { useApp } from './AppContext';
import { DISTRICT_NAME } from './constants';

const ReceiptView: React.FC = () => {
  const { activeTx, setCurrentView, collector } = useApp();

  if (!activeTx) {
    setCurrentView('dashboard');
    return null;
  }

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-300">
      <div className="flex flex-col items-center text-center py-6">
        <div className="bg-emerald-100 p-5 rounded-full mb-4 animate-bounce duration-1000">
          <CheckCircle2 className="w-14 h-14 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase">Ticket Generated</h2>
        <p className="text-slate-500 text-sm font-medium">Recorded in Assembly Database</p>
      </div>

      <Card className="p-0 border-none shadow-2xl overflow-visible relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
          Official Receipt
        </div>
        <div className="bg-slate-900 text-white p-8 pt-10 text-center rounded-t-[1.5rem]">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-80 mb-2 truncate">{DISTRICT_NAME}</h3>
          <p className="text-[9px] opacity-40 font-bold uppercase tracking-[0.1em]">Revenue Unit Digital Counterfoil</p>
          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-4xl font-black">GHS {activeTx.amount.toFixed(2)}</p>
            <div className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
              Method: {activeTx.paymentMethod}
            </div>
          </div>
        </div>
        <div className="p-8 bg-white space-y-6 rounded-b-[1.5rem]">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Ticket ID</p>
              <p className="font-black text-slate-800 text-sm truncate">{activeTx.ticketId}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Market</p>
              <p className="font-black text-slate-800 text-sm truncate">{activeTx.marketName}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Rate Item</p>
              <p className="font-black text-slate-800 text-xs truncate">{activeTx.feeTypeName}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Time</p>
              <p className="font-black text-slate-800 text-xs">{new Date(activeTx.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-dashed border-slate-200 flex flex-col items-center gap-6">
            <div className="w-36 h-36 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 p-4">
              <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full opacity-30">
                {Array.from({length: 16}).map((_,i) => <div key={i} className="bg-slate-900 rounded-sm"></div>)}
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-900 font-black uppercase tracking-[0.3em]">SECURE CODE</p>
              <p className="text-[8px] text-slate-400 font-medium max-w-[200px] mt-2 italic leading-relaxed">Present this digital ticket to any official audit personnel upon request.</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-2 overflow-hidden pointer-events-none">
          {Array.from({length: 20}).map((_,i) => <div key={i} className="w-4 h-4 bg-slate-50 rounded-full -mt-2 shrink-0"></div>)}
        </div>
      </Card>

      <div className="flex gap-4 pt-4">
        <Button onClick={() => window.print()} variant="outline" className="flex-1 flex items-center justify-center gap-2 rounded-2xl h-14 font-black">
          <Printer className="w-5 h-5" />
          PRINT
        </Button>
        <Button onClick={() => setCurrentView('dashboard')} className="flex-1 rounded-2xl h-14 font-black">
          FINISH
        </Button>
      </div>
    </div>
  );
};

export default ReceiptView;
