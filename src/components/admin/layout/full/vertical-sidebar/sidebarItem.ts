import { LayoutDashboardIcon } from 'vue-tabler-icons';

import { IconBriefcase, IconSettings, IconMessages, IconBriefcase2, IconCategory, IconCategoryPlus } from '@tabler/icons-vue';

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
    { header: 'Services' },
    {
        title: 'Service Sections',
        icon: IconCategory,
        to: '/dashboard/services'
    },
    {
        title: 'Add Section',
        icon: IconCategoryPlus,
        to: '/dashboard/services/add'
    },
    {
        title: ' Services',
        icon: IconBriefcase,
        to: '/dashboard/child-services'
    },
    {
        title: 'Add Service',
        icon: IconBriefcase2,
        to: '/dashboard/child-services/add'
    },
    { header: 'Extra' },
    {
        title: 'Settings',
        icon: IconSettings,
        to: '/dashboard/settings'
    }
];

export default sidebarItem;
