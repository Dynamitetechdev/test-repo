import { create } from 'zustand';

const UsePoolStore = create((set) => ({
  poolApiData: {},
  investableUsdt: 0,
  setPoolApiData: (update) => set((state) => ({
    poolApiData: typeof update === 'function' ? update(state.poolApiData) : update
  })),
  setInvestableUsdt: (investableUsdt) => set({investableUsdt})
}));

export default UsePoolStore;