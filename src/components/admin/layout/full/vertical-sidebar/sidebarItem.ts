import { LayoutDashboardIcon } from 'vue-tabler-icons';

import {
    IconCategoryPlus,
    IconCategoryFilled,
    IconCpu,
    IconCopyPlus,
    IconBrandApple,
    IconDevicesPc,
    IconDevicesPlus,
    IconDeviceDesktop,
    IconDeviceDesktopPlus,
    IconDevices2,
    IconDiscount2,
    IconGiftCard,
    IconSettings,
    IconTruck,
    IconTruckDelivery,
    IconMessages,
    IconReceipt,
    IconFilePlus,
    IconCarouselHorizontal,
    IconUsers,
    IconUsersPlus
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
    { header: 'Home' },
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/dashboard'
    },
    {
        title: 'Messages',
        icon: IconMessages,
        to: '/dashboard/tickets'
    },
    { header: 'Categories' },
    {
        title: 'Categories',
        icon: IconCategoryFilled,
        to: '/dashboard/categories'
    },
    {
        title: 'Add Category',
        icon: IconCategoryPlus,
        to: '/dashboard/categories/add'
    },
    { header: 'Specifications' },
    {
        title: 'Specifications',
        icon: IconCpu,
        to: '/dashboard/specifications'
    },
    {
        title: 'Add Specification',
        icon: IconCopyPlus,
        to: '/dashboard/specifications/add'
    },
    { header: 'Brands' },
    {
        title: 'Brands',
        icon: IconBrandApple,
        to: '/dashboard/brands'
    },
    {
        title: 'Add Brand',
        icon: IconCopyPlus,
        to: '/dashboard/brands/add'
    },
    { header: 'PC' },
    {
        title: 'PCs',
        icon: IconDevicesPc,
        to: '/dashboard/pcs'
    },
    {
        title: 'Add PC',
        icon: IconDevicesPlus,
        to: '/dashboard/pcs/add'
    },
    { header: 'PC Model' },
    {
        title: 'PC Models',
        icon: IconDeviceDesktop,
        to: '/dashboard/pc-model'
    },
    {
        title: 'Add PC Model',
        icon: IconDeviceDesktopPlus,
        to: '/dashboard/pc-model/add'
    },
    { header: 'Products' },
    {
        title: 'All Products',
        icon: IconDevices2,
        to: '/dashboard/products'
    },
    {
        title: 'Add Product',
        icon: IconDevicesPlus,
        to: '/dashboard/products/add'
    },
    { header: 'Sales' },
    {
        title: 'All Sales',
        icon: IconGiftCard,
        to: '/dashboard/sales'
    },
    {
        title: 'Add Sale',
        icon: IconDiscount2,
        to: '/dashboard/sales/add'
    },
    { header: 'Bundles' },
    {
        title: 'Add Bundle',
        icon: IconDevices2,
        to: '/dashboard/bundles/add'
    },
    { header: 'Orders' },
    {
        title: 'Orders',
        icon: IconTruck,
        to: '/dashboard/orders'
    },
    {
        title: 'Orders Settings',
        icon: IconTruckDelivery,
        to: '/dashboard/orders/settings'
    },
    { header: 'Invoices' },
    {
        title: 'Invoices',
        icon: IconReceipt,
        to: '/dashboard/invoices'
    },
    {
        title: 'Add Invoice',
        icon: IconFilePlus,
        to: '/dashboard/invoices/add'
    },
    { header: 'Admins' },
    {
        title: 'Admins',
        icon: IconUsers,
        to: '/dashboard/admins'
    },
    {
        title: 'Add Admin',
        icon: IconUsersPlus,
        to: '/dashboard/admins/add'
    },
    { header: 'Extra' },
    {
        title: 'Carousel',
        icon: IconCarouselHorizontal,
        to: '/dashboard/carousel'
    },
    {
        title: 'Settings',
        icon: IconSettings,
        to: '/dashboard/settings'
    }
];

export default sidebarItem;
