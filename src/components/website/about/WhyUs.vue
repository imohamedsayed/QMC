<template>
    <div class="why-us">
        <div class="title text-center animate__animated animate__backInDown">
            <p class="text-skin">{{ $t('about.why') }}</p>
        </div>
        <v-row class="mt-8 align-center">
            <v-col cols="12" md="6" lg="4" v-for="(item, index) in $i18n.locale == 'EN' ? whyUsItems : whyUsItemsAR" :key="index">
                <v-card class="text-center mb-4 why-card" elevation="0">
                    <v-icon size="48" class="my-4" color="green">{{ item.icon }}</v-icon>
                    <v-card-title class="card-title">{{ item.title }}</v-card-title>
                    <v-card-text>{{ item.text }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const whyUsItems = ref([
    {
        icon: 'mdi-account-group',
        title: 'EXPERT TEAM OF FINANCIAL PROFESSIONALS',
        text: 'Our team comprises highly qualified financial experts with extensive experience across various sectors.'
    },
    {
        icon: 'mdi-cash',
        title: 'SPECIALIZED TAXATION & ZAKAT CONSULTANTS',
        text: 'Our specialists in taxation and Zakat provide insightful, customized solutions tailored to your needs.'
    },
    {
        icon: 'mdi-briefcase-check',
        title: 'COMPREHENSIVE CORPORATE GOVERNANCE & COMPLIANCE',
        text: 'We offer top-notch guidance in corporate governance and compliance, ensuring your business adheres to all regulations.'
    },
    {
        icon: 'mdi-account-tie',
        title: 'PERSONALIZED CLIENT MANAGEMENT',
        text: 'Enjoy the dedicated attention of a personal account manager, committed to understanding and meeting your unique requirements.'
    },
    {
        icon: 'mdi-lightbulb-outline',
        title: 'INNOVATIVE WORK METHODOLOGY',
        text: 'Our distinctive approach combines cutting-edge strategies with proven methodologies to deliver exceptional results.'
    },
    {
        icon: 'mdi-chart-line',
        title: 'PROVEN STRATEGIES WITH A MODERN TWIST',
        text: 'We blend time-honored strategies with innovative techniques to achieve optimal financial outcomes.'
    },
    {
        icon: 'mdi-cogs ',
        title: 'TAILORED SOLUTIONS FOR EVERY CLIENT',
        text: 'We provide bespoke services designed to meet the specific needs and goals of each client.'
    },
    {
        icon: 'mdi-domain',
        title: 'EXTENSIVE MULTI-SECTOR EXPERIENCE',
        text: 'Our vast experience across multiple industries equips us to handle diverse financial challenges effectively.'
    },
    {
        icon: 'mdi-cash-multiple',
        title: 'PRUDENT FINANCIAL MANAGEMENT',
        text: 'Our fiscally responsible management practices ensure the best use of your resources for maximum profitability.'
    },
    {
        icon: 'mdi-heart',
        title: 'CLIENT-FOCUSED APPROACH',
        text: "We prioritize our clients' success, offering solutions that drive growth and deliver long-term value."
    }
]);

const whyUsItemsAR = ref([
    {
        icon: 'mdi-account-group',
        title: 'فريق متخصص من المحترفين الماليين',
        text: 'يتألف فريقنا من خبراء ماليين مؤهلين تأهيلاً عالياً وذوي خبرة واسعة في مختلف القطاعات.'
    },
    {
        icon: 'mdi-cash',
        title: 'استشاريون متخصصون في الضرائب والزكاة',
        text: 'يقدم خبراؤنا في الضرائب والزكاة حلولًا مخصصة تلبي احتياجاتك.'
    },
    {
        icon: 'mdi-briefcase-check',
        title: 'حوكمة شاملة للشركات والامتثال',
        text: 'نقدم توجيهات ممتازة في حوكمة الشركات والامتثال لضمان التزام عملك بجميع اللوائح.'
    },
    {
        icon: 'mdi-account-tie',
        title: 'إدارة عملاء مخصصة',
        text: 'استمتع بالاهتمام المخصص من مدير حساب شخصي ملتزم بفهم وتلبية متطلباتك الفريدة.'
    },
    {
        icon: 'mdi-lightbulb-outline',
        title: 'منهجية عمل مبتكرة',
        text: 'يجمع نهجنا المتميز بين استراتيجيات متطورة ومنهجيات مثبتة لتحقيق نتائج استثنائية.'
    },
    {
        icon: 'mdi-chart-line',
        title: 'استراتيجيات مثبتة بلمسة عصرية',
        text: 'نمزج بين استراتيجيات مجربة وتقنيات مبتكرة لتحقيق أفضل النتائج المالية.'
    },
    {
        icon: 'mdi-cogs',
        title: 'حلول مخصصة لكل عميل',
        text: 'نقدم خدمات مصممة خصيصًا لتلبية احتياجات وأهداف كل عميل.'
    },
    {
        icon: 'mdi-domain',
        title: 'خبرة واسعة في قطاعات متعددة',
        text: 'تجربتنا الواسعة في مختلف الصناعات تمكننا من التعامل مع تحديات مالية متنوعة بفعالية.'
    },
    {
        icon: 'mdi-cash-multiple',
        title: 'إدارة مالية حكيمة',
        text: 'تضمن ممارساتنا الإدارية المسؤولة ماليًا أفضل استخدام لمواردك لتحقيق أقصى ربحية.'
    },
    {
        icon: 'mdi-heart',
        title: 'نهج يركز على العميل',
        text: 'نحن نضع نجاح عملائنا في مقدمة أولوياتنا، ونقدم حلولًا تحفز النمو وتحقق قيمة طويلة الأجل.'
    }
]);

onMounted(() => {
    gsap.utils.toArray('.why-card').forEach((box) => {
        gsap.from(box, {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play reverse restart reverse'
            }
        });
    });
});
</script>

<style lang="scss" scoped>
.why-us {
    position: relative;
    height: auto;
    .title {
        p {
            font-weight: bold;
            font-size: 2.6rem;
            position: relative;
            padding-bottom: 15px;
            &::after {
                content: '';
                height: 4px;
                background: linear-gradient(270deg, #4b9f61 0.08%, #367cb543 100%);
                width: 300px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        @media (max-width: 1200px) {
            p {
                font-size: 2.4rem;
            }
        }

        @media (max-width: 992px) {
            p {
                font-size: 2.2rem;
            }
        }

        @media (max-width: 768px) {
            p {
                font-size: 2rem;
            }
        }

        @media (max-width: 576px) {
            p {
                font-size: 1.8rem;
            }
        }

        @media (max-width: 400px) {
            p {
                font-size: 1.6rem;
            }
        }
    }
    .v-card {
        transition: transform 0.2s;
        background: #ffffff8b;
        z-index: 10;
    }
    .v-card:hover {
        transform: scale(1.05);
    }
    .card-title {
        font-size: 18px;
        font-weight: bold;
        color: #367cb5;
        word-wrap: break-word;
        white-space: normal;
    }
    .v-card-text {
        color: #5a6a85;
    }
    .liquid-shape {
        position: absolute;
        top: 8%;
        width: 100%;
        z-index: 0;
        opacity: 0.15;
    }
}
</style>
