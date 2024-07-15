import axios from 'axios';
import { useAuthStore } from './stores/AuthStore';

axios.defaults.baseURL = 'https://api.qmconsults.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['Accept-Language'] = localStorage.lang?.toLowerCase() || 'en';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
let x = false;
axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 401 && !x) {
            const authStore = useAuthStore();
            authStore.emptyAll();
            x = true;
        }
        return error;
    }
);
