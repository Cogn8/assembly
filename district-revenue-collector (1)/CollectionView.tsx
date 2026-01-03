
import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, User, MapPin, CreditCard, Wallet } from 'lucide-react';
import { Button, StepIndicator } from './components/Shared';
import { useApp } from './AppContext';
import { MOCK_MARKETS, MOCK_FEE_TYPES } from './constants';
import { PaymentMethod } from './types';

const CollectionView: React.FC = () => {
  const { setCurrentView, addTransaction } = useApp();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    marketId: '',
    feeTypeId: '',
    vendorName: '',
    vendorReference: '',
    paymentMethod: 'MoMo' as PaymentMethod,
  });

  const handleBack = () => {
    if (step === 0) setCurrentView('dashboard');
    else setStep(s => s - 1);
  };

  const handleNext = () => setStep(s => s + 1);

  const handleSubmit = () => {
    const market = MOCK_MARKETS.find(m => m.id === formData.marketId)!;
    const feeType = MOCK_FEE_TYPES.find(f => f.id === formData.feeTypeId)!;
    
    addTransaction({
      marketId: formData.marketId,
      marketName: market.name,
      feeTypeId: formData.feeTypeId,
      feeTypeName: feeType.name,
      vendorName: formData.vendorName,
      vendorReference: formData.vendorReference,
      amount: feeType.amount,
      paymentMethod: formData.paymentMethod,
      location: { lat: 4.8833, lng: -1.9833 }
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={handleBack} className="p-2 -ml-2 text-slate-600">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Revenue Entry</h2>
      </div>
      
      <StepIndicator total={4} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Step 1: Location</h3>
          <div className="grid gap-3">
            {MOCK_MARKETS.map(m => (
              <button
                key={m.id}
                onClick={() => { setFormData({...formData, marketId: m.id}); handleNext(); }}
                className={`p-6 rounded-[1.5rem] border-2 text-left transition-all ${formData.marketId === m.id ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{m.name}</span>
                  {formData.marketId === m.id && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Step 2: Rate Class</h3>
          <div className="grid gap-3">
            {MOCK_FEE_TYPES.map(f => (
              <button
                key={f.id}
                onClick={() => { setFormData({...formData, feeTypeId: f.id}); handleNext(); }}
                className={`p-6 rounded-[1.5rem] border-2 text-left transition-all ${formData.feeTypeId === f.id ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg' : 'border-slate-200 bg-white text-slate-600'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-lg leading-tight">{f.name}</span>
                  <span className="font-black text-emerald-700 text-xl ml-2">GHS {f.amount.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Official Gazette Rate</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Step 3: Vendor Details</h3>
          <div className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-2 tracking-widest">Vendor Name (Optional)</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="text" 
                  value={formData.vendorName}
                  onChange={e => setFormData({...formData, vendorName: e.target.value})}
                  placeholder="e.g. Ama Serwaa"
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-2 tracking-widest">Stall / Space Reference</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="text" 
                  value={formData.vendorReference}
                  onChange={e => setFormData({...formData, vendorReference: e.target.value})}
                  placeholder="e.g. BLK-A-12"
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>
          </div>
          <Button onClick={handleNext} size="lg" className="w-full rounded-2xl font-black">CONTINUE</Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest text-center">Step 4: Payment Confirmation</h3>
          
          <div className="bg-slate-900 p-8 rounded-[2rem] text-center shadow-xl shadow-slate-900/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
             <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-2">Total Amount Due</p>
             <h2 className="text-5xl font-black text-white">GHS {MOCK_FEE_TYPES.find(f => f.id === formData.feeTypeId)?.amount.toFixed(2)}</h2>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setFormData({...formData, paymentMethod: 'MoMo'})}
              className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 text-left transition-all ${formData.paymentMethod === 'MoMo' ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-200 bg-white'}`}
            >
              <div className="bg-amber-100 p-3 rounded-2xl">
                <CreditCard className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <p className="font-black text-lg text-slate-800 uppercase tracking-tight">Mobile Money</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Official Preferred Path</p>
              </div>
              {formData.paymentMethod === 'MoMo' && <CheckCircle2 className="w-6 h-6 text-amber-500 ml-auto" />}
            </button>

            <button
              onClick={() => setFormData({...formData, paymentMethod: 'Cash'})}
              className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 text-left transition-all ${formData.paymentMethod === 'Cash' ? 'border-emerald-500 bg-emerald-50 shadow-lg' : 'border-slate-200 bg-white'}`}
            >
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Wallet className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <p className="font-black text-lg text-slate-800 uppercase tracking-tight">Cash Payment</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Requires High Audit Trial</p>
              </div>
              {formData.paymentMethod === 'Cash' && <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-auto" />}
            </button>
          </div>

          <div className="pt-6">
            <Button onClick={handleSubmit} variant={formData.paymentMethod === 'Cash' ? 'secondary' : 'primary'} size="xl" className="w-full rounded-3xl font-black shadow-xl">
              VALIDATE & ISSUE TICKET
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionView;
