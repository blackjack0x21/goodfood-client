// stores/counter.js
import { defineStore } from 'pinia'

export const useRgpdStore = defineStore('rgpd', {
  state: () => {
    return { acceptedRgpd: false }
  },
  getters: {
    getRgpdState: (state) =>  state.acceptedRgpd
  },
  actions: {
    accept() {
      this.acceptedRgpd = true;
    },
  },
})