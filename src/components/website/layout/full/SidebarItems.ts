import {
    IconHome,
    IconUser,
    IconUsersGroup,
    IconTimeline,
    IconHeadphones,
    IconUsers,
    IconNews,
    IconHelpHexagon,
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
        title: 'about',
        icon: IconUsersGroup,
        to: '/about-us'
    },
    {
        title: 'process',
        icon: IconTimeline,
        to: '/our-process'
    },
    {
        title: 'clients',
        icon: IconUsers,
        to: '/our-clients'
    },
    {
        title: 'contact',
        icon: IconHeadphones,
        to: '/contact-us'
    },
    {
        title: 'blog',
        icon: IconNews,
        to: '/blogs'
    },
    {
        title: 'faq',
        icon: IconHelpHexagon,
        to: '/FAQs'
    }
];

export default sidebarItem;
