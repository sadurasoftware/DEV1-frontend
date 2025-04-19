import { create } from 'zustand';
import { ViewBackStore } from '@/types/viewBackStoreType';

export const viewBackStore = create<ViewBackStore>((set) => ({
  backRoutes: '/tickets',
  setBackRoutes: (route) => set({ backRoutes: route }),
}));
