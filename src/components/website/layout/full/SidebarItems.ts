import {
    IconHome,
    IconUser,
    IconUsersGroup,
    IconDevicesPc,
    IconHeadphones,
    IconShoppingBag,
    IconHeart,
    IconDiscount,
    IconDevices
} from '@tabler/icons-vue';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'main' },
    {
        title: 'home',
        icon: IconHome,
        to: '/'
    },
    {
        title: 'profile',
        icon: IconUser,
        to: '/profile'
    },
    // { header: 'branch' },
    // {
    //     title: 'products',
    //     icon: IconDevices,
    //     to: '/products'
    // },
    // {
    //     title: 'offers',
    //     icon: IconDiscount,
    //     to: '/offers'
    // },
    // {
    //     title: 'about',
    //     icon: IconUsersGroup,
    //     to: '/about-us'
    // },
    // {
    //     title: 'contact',
    //     icon: IconHeadphones,
    //     to: '/contact-us'
    // },
    // {
    //     title: 'build',
    //     icon: IconDevicesPc,
    //     to: '/build-ur-bundle'
    // },
    // {
    //     title: 'cart',
    //     icon: IconShoppingBag,
    //     to: '/cart'
    // },
    // {
    //     title: 'wishlist',
    //     icon: IconHeart,
    //     to: '/wish-list'
    // },

    // { header: 'extra' }
];

export default sidebarItem;
