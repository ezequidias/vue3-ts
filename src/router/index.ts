import { useAuthStore } from '@/stores';
import { getToken } from '@/utils/AuthService';
import axios from '@/utils/request';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
   // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();
    const token = getToken()

    if(!auth.user && token){
      try{
        const user_details = await axios.get('user')
        auth.status.loggedIn = true
        auth.user = user_details.data
        return '/'
      }catch(e){
        if(!authRequired) return true
        return '/login'
      }
    }

    if (authRequired && !auth.status.loggedIn) return '/login';
    return true;
})

export default router
