const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'adminLogin',
            path: '/auth/dashboard/login',
            component: () => import('@/views/auth/AdminLogin.vue'),
            meta: { title: 'Admin Login' }
        },
        {
            name: 'Register',
            path: '/register',
            component: () => import('@/views/auth/Register.vue'),
            meta: { title: 'Register' }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/auth/Login.vue'),
            meta: { title: 'Login' }
        },
        {
            name: 'forgetPassword',
            path: '/forget-password',
            component: () => import('@/views/website/ForgetPassword.vue'),
            meta: { title: 'Forget Password' }
        },
        {
            name: 'ResetPassword',
            path: '/reset-password',
            component: () => import('@/views/website/ResetPassword.vue'),
            meta: { title: 'Reset Password' }
        },
        {
            name: 'AdminForgetPassword',
            path: '/auth/dashboard/forget-password',
            component: () => import('@/views/auth/AdminForget.vue'),
            meta: { title: 'Admin Forget Password' }
        },
        {
            name: 'AdminResetPassword',
            path: '/auth/dashboard/reset-password',
            component: () => import('@/views/auth/AdminReset.vue'),
            meta: { title: 'Admin Reset Password' }
        }
    ]
};

export default AuthRoutes;
