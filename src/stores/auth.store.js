import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
      ...initialState,
    }),
    actions: {
        async login(user) {
          try{
            const res = await AuthService.login(user)
            this.status.loggedIn = true;
            this.user = res;
            return res;
          }catch(error){
            this.status.loggedIn = false;
            this.user = null;
            throw error
          }
        },
        async logout() {
          await AuthService.logout();
          this.status.loggedIn = false;
          this.user = null;
        },
        async register(user) {
          try{
            const res = await AuthService.register(user)
            this.status.loggedIn = false;
            this.user = null;
            return res;
          }catch(error){
            this.status.loggedIn = false;
            this.user = null;
            throw error
          }
        }
    },
});
