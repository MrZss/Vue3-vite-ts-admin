import { defineStore } from 'pinia';

export const useApp = defineStore({
    id: "user",

    state: () => {
        return {
            user: '',
        }
    },

    actions: {
        updateUser(value: string){
            this.user = value;
        }
    }
})