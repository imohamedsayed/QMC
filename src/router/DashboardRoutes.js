const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/DashbaordLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
                title: 'Dashboard'
            }
        },
        {
            name: 'Messages',
            path: '/dashboard/tickets',
            component: () => import('@/views/dashboard/messages/Index.vue'),
            meta: {
                title: 'Messages'
            }
        },
        {
            name: 'Message',
            path: '/dashboard/tickets/:id',
            props: true,
            component: () => import('@/views/dashboard/messages/Message.vue'),
            meta: {
                title: 'Message'
            }
        },
        {
            name: 'WhyUs',
            path: '/dashboard/why-us',
            component: () => import('@/views/dashboard/whyUs/Index.vue'),
            meta: {
                title: ' Why Us'
            }
        },
        {
            name: 'AddWhyUs',
            path: '/dashboard/why-us/add',
            component: () => import('@/views/dashboard/whyUs/Create.vue'),
            meta: {
                title: 'Add Why-us Box'
            }
        },
        {
            name: 'EditWhyUs',
            path: '/dashboard/why-us/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/whyUs/Edit.vue'),
            meta: {
                title: 'Edit Why-us Box'
            }
        },
        {
            name: 'Services',
            path: '/dashboard/services',
            component: () => import('@/views/dashboard/services/Index.vue'),
            meta: {
                title: 'Service Sections'
            }
        },
        {
            name: 'AddService',
            path: '/dashboard/services/add',
            component: () => import('@/views/dashboard/services/Create.vue'),
            meta: {
                title: 'Add Services Section'
            }
        },
        {
            name: 'EditService',
            path: '/dashboard/services/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/services/Edit.vue'),
            meta: {
                title: 'Edit Services Section'
            }
        },
        {
            name: 'ChildServices',
            path: '/dashboard/child-services',
            component: () => import('@/views/dashboard/sections/Index.vue'),
            meta: {
                title: ' Services'
            }
        },
        {
            name: 'AddChildService',
            path: '/dashboard/child-services/add',
            component: () => import('@/views/dashboard/sections/Create.vue'),
            meta: {
                title: 'Add Service'
            }
        },
        {
            name: 'EditChildService',
            path: '/dashboard/child-services/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/sections/Edit.vue'),
            meta: {
                title: 'Edit Service'
            }
        },
        {
            name: 'Processes',
            path: '/dashboard/processes',
            component: () => import('@/views/dashboard/processes/Index.vue'),
            meta: {
                title: 'Our Process'
            }
        },
        {
            name: 'AddProcess',
            path: '/dashboard/processes/add',
            component: () => import('@/views/dashboard/processes/Create.vue'),
            meta: {
                title: 'Add Process'
            }
        },
        {
            name: 'EditProcess',
            path: '/dashboard/processes/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/processes/Edit.vue'),
            meta: {
                title: 'Edit Process'
            }
        },
        {
            name: 'Clients',
            path: '/dashboard/clients',
            component: () => import('@/views/dashboard/clients/Index.vue'),
            meta: {
                title: 'Clients'
            }
        },
        {
            name: 'AddClient',
            path: '/dashboard/clients/add',
            component: () => import('@/views/dashboard/clients/Create.vue'),
            meta: {
                title: 'Add Client'
            }
        },
        {
            name: 'EditClient',
            path: '/dashboard/clients/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/clients/Update.vue'),
            meta: {
                title: 'Edit Client'
            }
        },
        {
            name: 'Blogs',
            path: '/dashboard/blogs',
            component: () => import('@/views/dashboard/blogs/Index.vue'),
            meta: {
                title: 'Blogs'
            }
        },
        {
            name: 'AddBlog',
            path: '/dashboard/blogs/add',
            component: () => import('@/views/dashboard/blogs/Create.vue'),
            meta: {
                title: 'Add Blog'
            }
        },
        {
            name: 'EditBlog',
            path: '/dashboard/blogs/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/blogs/Edit.vue'),
            meta: {
                title: 'Edit Blog'
            }
        },
        {
            name: 'FAQs',
            path: '/dashboard/faqs',
            component: () => import('@/views/dashboard/FAQ/Index.vue'),
            meta: {
                title: 'FAQs'
            }
        },
        {
            name: 'AddFAQ',
            path: '/dashboard/faqs/add',
            component: () => import('@/views/dashboard/FAQ/Create.vue'),
            meta: {
                title: 'Add FAQ'
            }
        },
        {
            name: 'EditFAQ',
            path: '/dashboard/faqs/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/FAQ/Edit.vue'),
            meta: {
                title: 'Edit FAQ'
            }
        },
        {
            name: 'AdminSettings',
            path: '/dashboard/admin/settings',
            component: () => import('@/views/dashboard/settings/Admin.vue'),
            meta: {
                title: 'Admin Settings'
            }
        },
        {
            name: 'Settings',
            path: '/dashboard/settings',
            component: () => import('@/views/dashboard/settings/Index.vue'),
            meta: {
                title: 'Settings'
            }
        },
        {
            name: 'EditSettings',
            path: '/dashboard/settings/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/settings/Edit.vue'),
            meta: {
                title: 'Edit Settings'
            }
        },
        {
            name: 'Notifications',
            path: '/dashboard/notifications',
            component: () => import('@/views/dashboard/notifications/Index.vue'),
            meta: {
                title: 'Notifications'
            }
        },
        {
            name: 'Admins',
            path: '/dashboard/admins',
            component: () => import('@/views/dashboard/admins/Index.vue'),
            meta: {
                title: 'Admins'
            }
        },
        {
            name: 'AddAdmin',
            path: '/dashboard/admins/add',
            component: () => import('@/views/dashboard/admins/Create.vue'),
            meta: {
                title: 'Add Admin'
            }
        },
        {
            name: 'EditAdmin',
            path: '/dashboard/admins/:id/edit',
            props: true,
            component: () => import('@/views/dashboard/admins/Edit.vue'),
            meta: {
                title: 'Edit Admin'
            }
        }
    ]
};

export default MainRoutes;
