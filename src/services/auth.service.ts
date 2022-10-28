import { removeToken, setToken } from '@/utils/AuthService';
import axios from '@/utils/request';

class AuthService {
  async login(user: any) {
    const response = await axios.post('/login', user)
    if (response.tokenData.token) setToken(response.tokenData.token)
    return response.data;
  }

  async logout() {
    removeToken()
  }

  async register(user: any) {
    const res = await axios.post('/signup', user);
    return res
  }
}

export default new AuthService();
