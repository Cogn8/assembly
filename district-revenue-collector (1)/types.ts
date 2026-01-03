
export type PaymentMethod = 'MoMo' | 'Cash';
export type SyncStatus = 'Pending' | 'Synced' | 'Failed';

export interface Collector {
  id: string;
  name: string;
  district: string;
  pin: string;
  deviceId: string;
}

export interface Market {
  id: string;
  name: string;
}

export interface FeeType {
  id: string;
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  marketId: string;
  marketName: string;
  feeTypeId: string;
  feeTypeName: string;
  vendorName?: string;
  vendorReference?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  syncStatus: SyncStatus;
  collectorId: string;
  ticketId: string;
}

export interface DashboardSummary {
  totalCollected: number;
  momoCount: number;
  cashCount: number;
  momoTotal: number;
  cashTotal: number;
  syncPending: number;
}
