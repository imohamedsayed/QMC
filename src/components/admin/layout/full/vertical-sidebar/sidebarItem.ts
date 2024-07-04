import { LayoutDashboardIcon } from 'vue-tabler-icons';

import {
    IconBriefcase,
    IconSettings,
    IconMessages,
    IconBriefcase2,
    IconCategory,
    IconCategoryPlus,
    IconTimeline,
    IconCirclePlus,
    IconIdBadge2,
    IconId,
    IconUsers,
    IconUsersPlus,
    IconArticle,
    IconFilePlus,
    IconHelpOctagon,
    IconHelpHexagonFilled,
    IconUser,
    IconUserShield,
    IconUserPlus
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
        subCaption: 'To view chats',
        to: '/dashboard/tickets'
    },
    { header: 'Why us' },
    {
        title: 'Why Us ',
        icon: IconId,
        to: '/dashboard/why-us'
    },
    {
        title: 'Add Why-us box',
        icon: IconIdBadge2,
        to: '/dashboard/why-us/add'
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
    { header: 'Our Process' },
    {
        title: 'Processes',
        icon: IconTimeline,
        to: '/dashboard/processes'
    },
    {
        title: 'Add Process',
        icon: IconCirclePlus,
        to: '/dashboard/processes/add'
    },
    { header: 'Our Clients' },
    {
        title: 'Clients',
        icon: IconUsers,
        to: '/dashboard/clients'
    },
    {
        title: 'Add Client',
        icon: IconUsersPlus,
        to: '/dashboard/clients/add'
    },
    { header: 'Blogs' },
    {
        title: 'Blogs',
        icon: IconArticle,
        to: '/dashboard/blogs'
    },
    {
        title: 'Add Blog',
        icon: IconFilePlus,
        to: '/dashboard/blogs/add'
    },
    { header: 'FAQs' },
    {
        title: 'FAQs',
        icon: IconHelpHexagonFilled,
        to: '/dashboard/faqs'
    },
    {
        title: 'Add FAQ',
        icon: IconHelpOctagon,
        to: '/dashboard/faqs/add'
    },
    { header: 'Admins' },
    {
        title: 'Admins',
        icon: IconUserShield,
        to: '/dashboard/admins'
    },
    {
        title: 'Add Admin',
        icon: IconUserPlus,
        to: '/dashboard/admins/add'
    },
    { header: 'Extra' },
    {
        title: 'Admin Settings',
        icon: IconUser,
        to: '/dashboard/admin/settings'
    },
    {
        title: 'Settings',
        icon: IconSettings,
        to: '/dashboard/settings'
    }
];

export default sidebarItem;
