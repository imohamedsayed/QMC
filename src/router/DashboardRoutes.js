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
            name: 'Services',
            path: '/dashboard/services',
            component: () => import('@/views/dashboard/services/Index.vue'),
            meta: {
                title: 'Service Sections'
            }
        },
        {
            name: 'Add Service',
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
        }
    ]
};

export default MainRoutes;
