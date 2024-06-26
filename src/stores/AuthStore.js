import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        admin: null,
        token: null
    }),
    getters: {
        getUser() {
            return this.user;
        },
        getAdmin() {
            return this.admin;
        },
        getToken() {
            return this.token;
        }
    },
    actions: {
        async adminLogin(credentials) {
            try {
                const res = await axios.post('/api_dashboard/login', credentials);
                if (res.status == 200) {
                    const { user, access_token } = res.data;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                    localStorage.setItem('token', access_token);
                    this.admin = user;
                    this.token = access_token;
                    this.user = null;
                } else {
                    throw new Error(res.response.data.error);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async updateAdmin(data) {
            try {
                const res = await axios.post('api_dashboard/update', data);
                if (res.status == 202) {
                    await this.refreshAdmin();
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async refreshAdmin() {
            try {
                const res = await axios.get('api_dashboard/refresh');
                if (res.status == 200) {
                    this.admin = res.data.Admin;
                    console.log(this.admin);
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async logout() {
            try {
                if (this.user) {
                    await axios.post('api/logout');
                } else {
                    await axios.post('api_dashboard/logout');
                }
            } catch (error) {
                throw new Error(error.message);
            }
            this.admin = null;
            this.user = null;
            this.token = null;
        },
        emptyAll() {
            this.admin = null;
            this.user = null;
            this.token = null;
        },
        async Register(user) {
            try {
                const res = await axios.post('api/register', user);
                if (res.status !== 201) {
                    let errors = res.response.data;
                    if (Object.keys(errors).length > 0) {
                        let firstKey = Object.keys(errors)[0];
                        if (Array.isArray(errors[firstKey]) && errors[firstKey].length > 0) {
                            let firstErrorMessage = errors[firstKey][0];
                            throw new Error(firstErrorMessage);
                        }
                    }
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async Login(credentials) {
            try {
                const res = await axios.post('/api/login', credentials);
                if (res.status == 200) {
                    const { user, access_token } = res.data;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                    localStorage.setItem('token', access_token);
                    this.user = user;
                    this.token = access_token;
                    this.admin = null;
                } else {
                    throw new Error(res.response.data.error);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async updateUser(info) {
            try {
                const res = await axios.post('api/update', info);
                if (res.status == 202) {
                    await this.refreshUser();
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async refreshUser() {
            try {
                const res = await axios.get('api/user-profile');
                if (res.status == 200) {
                    this.user = res.data.User;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    persist: true
});
