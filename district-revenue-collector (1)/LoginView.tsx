
import React from 'react';
import { LogIn, User, Building2 } from 'lucide-react';
import { Card } from './components/Shared';
import { useApp } from './AppContext';
import { INITIAL_COLLECTOR, DISTRICT_NAME } from './constants';

const LoginView: React.FC = () => {
  const { setCollector, setCurrentView } = useApp();

  const handlePinInput = (pin: string) => {
    if (pin === INITIAL_COLLECTOR.pin) {
      setCollector(INITIAL_COLLECTOR);
      setCurrentView('dashboard');
    } else if (pin.length === 4) {
      alert('Invalid PIN. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center p-6 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="text-center mb-10 relative z-10">
        <div className="inline-block bg-white p-5 rounded-[2rem] mb-6 shadow-2xl shadow-emerald-500/20">
          <Building2 className="w-14 h-14 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-black mb-1 uppercase tracking-tight">{DISTRICT_NAME}</h1>
        <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">Official Revenue Portal</p>
      </div>
      
      <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 relative z-10">
        <h2 className="text-lg font-bold mb-8 text-center text-slate-200">Collector Identification</h2>
        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-2 tracking-widest">Authorized Personnel</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
              <input 
                type="text" 
                value={INITIAL_COLLECTOR.name} 
                readOnly 
                className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-2 tracking-widest">Enter Secure PIN</label>
            <input 
              type="password" 
              maxLength={4}
              autoFocus
              onChange={(e) => handlePinInput(e.target.value)}
              placeholder="••••"
              className="w-full bg-emerald-500 text-white border-none rounded-2xl py-5 text-center text-4xl font-black tracking-[0.5em] shadow-xl focus:ring-4 focus:ring-emerald-400 transition-all placeholder:text-emerald-700/50" 
            />
          </div>
        </div>
      </Card>
      
      <div className="mt-12 text-center relative z-10">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Device ID: {INITIAL_COLLECTOR.deviceId}</p>
        <div className="w-1 h-1 bg-slate-700 rounded-full mx-auto mb-2"></div>
        <p className="text-[9px] text-slate-600 font-medium px-12">Authorized use only. All transactions are digitally signed and geofenced for audit.</p>
      </div>
    </div>
  );
};

export default LoginView;
