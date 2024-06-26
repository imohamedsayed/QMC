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
        }

        // {
        //     name: 'Specifications',
        //     path: '/dashboard/specifications',
        //     component: () => import('@/views/dashboard/specifications/Index.vue'),
        //     meta: {
        //         title: 'Specifications'
        //     }
        // },
        // {
        //     name: 'AddSpecification',
        //     path: '/dashboard/specifications/add',
        //     component: () => import('@/views/dashboard/specifications/Create.vue'),
        //     meta: {
        //         title: 'Add Specification'
        //     }
        // },
        // {
        //     name: 'EditSpecification',
        //     path: '/dashboard/specifications/:id/edit',
        //     props: true,
        //     component: () => import('@/views/dashboard/specifications/Edit.vue'),
        //     meta: {
        //         title: 'Edit Specification'
        //     }
        // },
    ]
};

export default MainRoutes;
