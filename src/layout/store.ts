
import { defineStore } from 'pinia'
 
export const useLayoutStore = defineStore({
  id: 'layout', // id必填，且需要唯一
  state: () => {
    return {
      collapsed: false
    }
  },
  actions: {
    updateCollapsed(collapsed: boolean) {
      console.log('触发', collapsed)
      this.collapsed = collapsed
    }
  }
})

