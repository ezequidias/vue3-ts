import { defineStore } from 'pinia';

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
        async login(user: object) {
          try{
            const response = await this.$axios.post('/login', user)
            if (response.tokenData.token) localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, response.tokenData.token)
            this.status.loggedIn = true;
            this.user = response.data;
            return response.data;
          }catch(error){
            this.status.loggedIn = false;
            this.user = null;
            throw error
          }
        },
        async logout() {
          localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME)
          this.status.loggedIn = false;
          this.user = null;
        },
        async register(user : object) {
          try{
            const res = await this.$axios.post('/signup', user);
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
