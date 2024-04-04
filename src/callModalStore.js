import { create } from "zustand";
export const useCallModalStore = create((set) => ({
    pickerId: null,
    callerId: null,
    setCallerId: (data) => set({ callerId: data }),
    setPickerId: (data) => set({ pickerId: data }),
    showCallComingModal: false,
    showRingingModal: false,
    setShowCallComingModal: (data) => set({ showCallComingModal: data }),
    setShowRingingModal: (data) => set({ showRingingModal: data })
}));

