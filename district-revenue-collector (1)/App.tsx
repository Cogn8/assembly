
import React from 'react';
import { LogOut, Wifi, WifiOff, Building2, LayoutDashboard, History, CheckCircle2 } from 'lucide-react';
import { DISTRICT_NAME } from './constants';
import { AppProvider, useApp } from './AppContext';

// Views
import LoginView from './LoginView';
import DashboardView from './DashboardView';
import HistoryView from './HistoryView';
import CollectionView from './CollectionView';
import SummaryView from './SummaryView';
import ReceiptView from './ReceiptView';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, isOnline, logout, collector } = useApp();

  if (currentView === 'auth') return <LoginView />;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'history': return <HistoryView />;
      case 'collection': return <CollectionView />;
      case 'summary': return <SummaryView />;
      case 'receipt': return <ReceiptView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen pb-24 relative flex flex-col max-w-md mx-auto bg-slate-50">
      <header className="bg-slate-900 text-white p-4 pb-6 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight uppercase tracking-tight truncate max-w-[150px]">{DISTRICT_NAME}</h1>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Revenue Unit</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase ${isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400 animate-pulse'}`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <button onClick={logout} className="text-slate-400 hover:text-white transition-colors"><LogOut className="w-5 h-5" /></button>
        </div>
      </header>

      <main className="flex-1 p-4">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around p-3 pb-6 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-emerald-600' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Dashboard</span>
        </button>
        <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 ${currentView === 'history' ? 'text-emerald-600' : 'text-slate-400'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">History</span>
        </button>
        <button onClick={() => setCurrentView('summary')} className={`flex flex-col items-center gap-1 ${currentView === 'summary' ? 'text-emerald-600' : 'text-slate-400'}`}>
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">End Day</span>
        </button>
      </nav>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
