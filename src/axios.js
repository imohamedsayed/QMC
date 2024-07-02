import axios from 'axios';
import { useAuthStore } from './stores/AuthStore';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
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
