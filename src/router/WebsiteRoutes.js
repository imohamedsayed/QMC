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
            name: 'services',
            path: '/our-services',
            component: () => import('@/views/website/Services.vue'),
            meta: {
                title: 'Our Services',
                enterCLass: 'animate__animated animate__fadeInLeft',
                leaveClass: 'animate__animated animate__fadeOutRight'
            }
        },
        {
            name: 'parent service',
            path: '/our-services/:id',
            props: true,
            component: () => import('@/views/website/ParentService.vue'),
            meta: {
                title: 'Service',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        },
        {
            name: 'service',
            path: '/our-services/:pid/:id',
            props: true,
            component: () => import('@/views/website/Service.vue'),
            meta: {
                title: 'Service',
                enterCLass: 'animate__animated animate__fadeInLeft',
                leaveClass: 'animate__animated animate__fadeOutRight'
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
        },
        {
            name: 'clients',
            path: '/our-clients',
            component: () => import('@/views/website/Clients.vue'),
            meta: {
                title: 'Our Clients',
                enterCLass: 'animate__animated animate__fadeInLeft',
                leaveClass: 'animate__animated animate__fadeOutRight'
            }
        },
        {
            name: 'about',
            path: '/about-us',
            component: () => import('@/views/website/AboutUs.vue'),
            meta: {
                title: 'About Us',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        },
        {
            name: 'blogs',
            path: '/blogs',
            component: () => import('@/views/website/Blogs.vue'),
            meta: {
                title: 'Blogs',
                enterCLass: 'animate__animated animate__fadeInLeft',
                leaveClass: 'animate__animated animate__fadeOutRight'
            }
        },
        {
            name: 'blog',
            path: '/blogs/:id',
            props: true,
            component: () => import('@/views/website/Blog.vue'),
            meta: {
                title: 'Blogs',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        },
        {
            name: 'faqs',
            path: '/FAQs',
            component: () => import('@/views/website/Faq.vue'),
            meta: {
                title: 'FAQs',
                enterCLass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft'
            }
        }
    ]
};

export default MainRoutes;
