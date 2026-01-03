
import { Market, FeeType, Collector } from './types';

export const DISTRICT_NAME = "Ahenta West Assembly";
export const DISTRICT_CODE = "AWA";

export const MOCK_MARKETS: Market[] = [
  { id: 'm1', name: 'Agona Nkwanta Market' },
  { id: 'm2', name: 'Dixcove Market' },
  { id: 'm3', name: 'Busua Market' },
  { id: 'm4', name: 'Apowa Market' }
];

export const MOCK_FEE_TYPES: FeeType[] = [
  { id: 'f1', name: 'Daily Market Toll', amount: 2.00 },
  { id: 'f2', name: 'Large Container/Store', amount: 80.00 },
  { id: 'f3', name: 'Small Kiosk Fee', amount: 40.00 },
  { id: 'f4', name: 'Lorry Park Entry (Per Exit)', amount: 5.00 },
  { id: 'f5', name: 'Table Top Vendor', amount: 1.00 }
];

export const INITIAL_COLLECTOR: Collector = {
  id: 'COL-AWA-088',
  name: 'John K. Tetteh',
  district: DISTRICT_NAME,
  pin: '1234',
  deviceId: 'AWA-POS-412'
};
