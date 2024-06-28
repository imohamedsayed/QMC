const MainRoutes = {
    path: '/website',
    meta: {
        requiresAuth: true
    },
    redirect: '/website',
    component: () => import('@/layouts/WebsiteLayout.vue'),
    children: [
        {
            name: 'landing',
            path: '/',
            component: () => import('@/views/website/Landing.vue'),
            meta: {
                title: 'Home'
            }
        },
        {
            name: 'contact',
            path: '/contact-us',
            component: () => import('@/views/website/ContactUs.vue'),
            meta: {
                title: 'Contact Us',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        },
        {
            name: 'process',
            path: '/our-process',
            component: () => import('@/views/website/Process.vue'),
            meta: {
                title: 'Our Process',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        }
    ]
};

export default MainRoutes;
