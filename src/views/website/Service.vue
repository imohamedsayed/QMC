<template>
    <div class="service py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="skin"></v-icon>
                    </v-btn>
                    <v-icon icon="mdi-chevron-right" v-if="$i18n.locale === 'EN'"></v-icon>
                    <v-icon icon="mdi-chevron-left" v-else></v-icon>
                </template>
                <template v-slot:divider v-if="$i18n.locale === 'EN'">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
                <template v-slot:divider v-else>
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </template>
            </v-breadcrumbs>
            <div class="title text-center animate__animated animate__backInDown mb-10">
                <p class="text-skin">{{ $t('services.title') }}</p>
            </div>

            <div class="service-content my-10 elevation-1">
                <div class="overlay"></div>
                <div class="content">
                    <div v-if="!loading">
                        <h2 class="text-center mb-10 text-green">Make Feasibilty Study</h2>
                        <img
                            class="service-img left"
                            style="width: 100%; max-height: 400px"
                            src="https://st.depositphotos.com/1000423/1637/i/450/depositphotos_16370285-stock-photo-hand-pushing-on-a-touch.jpg"
                        />
                        <div class="about-service">
                            <p class="about mb-10 mt-8 right">About This Service</p>
                            <p class="left">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, laboriosam modi est corporis qui esse
                                placeat praesentium tempore illum expedita maxime, autem sequi asperiores beatae provident totam similique
                                earum consequatur. In a quidem vero! Facilis quasi enim, provident pariatur quod nobis perferendis aut
                                accusantium, voluptatum nesciunt ex, eligendi voluptatibus laborum quidem repudiandae ipsum illum at
                                sapiente libero. Aspernatur, adipisci optio. Earum quibusdam neque nihil quod amet veritatis consequuntur,
                                dicta voluptate voluptates tempore tempora. Iste quasi earum, sequi tempore corporis voluptates odit nisi
                                eligendi soluta velit nobis error natus iure? Dolorum. Eveniet, laboriosam ipsam excepturi neque impedit
                                quaerat ut non sapiente magnam repellendus numquam reiciendis, a, voluptas enim cupiditate. Ex fugit cumque
                                tenetur fugiat earum perferendis id quasi similique ratione enim? Eius blanditiis aut distinctio impedit,
                                molestias quo! Voluptatum sint tenetur quidem eveniet repudiandae temporibus amet reprehenderit et
                                doloribus, fuga pariatur rerum ipsa accusantium recusandae aliquam assumenda perferendis incidunt officiis
                                debitis. At natus blanditiis nam perspiciatis modi quam sapiente porro beatae necessitatibus quos expedita
                                vitae placeat nesciunt error quo assumenda, consectetur excepturi sint dolores ad consequatur! Tenetur earum
                                tempora quibusdam possimus! Assumenda possimus ipsa necessitatibus eaque, iusto vitae numquam ratione
                                deleniti et dignissimos optio doloremque odio pariatur, cupiditate itaque, quaerat doloribus. Eligendi ut,
                                nihil natus veniam et dolorum expedita nostrum deserunt! Quam molestias excepturi numquam recusandae fuga
                                ipsam mollitia dignissimos officiis impedit, ut doloribus deleniti facilis velit, assumenda veniam commodi
                                ducimus blanditiis reprehenderit enim natus aliquam architecto. Dignissimos sed iste eum? Minima itaque
                                debitis illum blanditiis! Saepe totam ut deserunt? Delectus nam excepturi culpa iure neque aut
                                necessitatibus commodi expedita aliquam facere debitis laboriosam rerum libero, earum eos, suscipit
                                provident cum? Eius ipsa veritatis fuga quasi perspiciatis provident nesciunt possimus officiis, labore
                                sequi dolorum consequuntur maiores voluptatum culpa tempora quaerat, cumque ipsam? Facere dolorem ipsum
                                nesciunt quasi fugit iusto expedita distinctio! Nisi sed magnam quas, iusto, placeat exercitationem, maxime
                                quod nam non odio quia fugiat soluta blanditiis? Asperiores, ex maiores ea dolores ab unde tempore porro
                                maxime. Natus veritatis nesciunt molestiae! Error aut itaque voluptate molestiae soluta eligendi, vitae
                                nulla id in autem quibusdam ducimus ex blanditiis culpa. Similique odio, tempora deserunt iusto earum
                                recusandae facilis, necessitatibus, dicta perferendis nostrum voluptas. Fugiat qui voluptas, nemo cumque
                                vitae assumenda dolorum quibusdam molestiae tempora quas tempore suscipit praesentium aperiam magnam?
                                Cupiditate molestias dolorum consequuntur eligendi optio accusamus. Quae eaque distinctio nostrum nesciunt
                                aliquam. Harum quas quod aliquid aliquam quos corrupti quo? Dolorem voluptate ipsa soluta numquam aspernatur
                                quia cumque officiis, perspiciatis consequatur blanditiis error, quisquam veritatis sunt, delectus nemo aut
                                qui magnam quibusdam? Quis, officiis dolor, voluptatibus, cumque eaque accusamus doloribus quos recusandae
                                necessitatibus nulla exercitationem reiciendis! Eveniet, qui? Sit exercitationem in voluptate animi illo
                                ipsam sunt. Est necessitatibus non atque magnam suscipit. Consectetur iste, itaque corrupti ipsam neque id
                                mollitia voluptatum cumque tempora aperiam placeat dolores sunt amet ea tenetur aliquam voluptates et?
                                Accusamus illo doloremque vel odit numquam provident deserunt et. Culpa maxime amet excepturi dolore, velit
                                consequuntur aspernatur fugit in dolor ad quibusdam optio obcaecati nisi iste exercitationem fuga quia.
                                Dolore officiis deserunt cum necessitatibus odit tempore, natus excepturi non? Hic aliquid eveniet eos
                                repellat facere suscipit fuga fugit quibusdam, voluptatibus nostrum deleniti alias adipisci mollitia,
                                recusandae reiciendis laudantium. Ratione odit ipsam quidem esse praesentium! Fuga deleniti excepturi
                                consequatur quis. Numquam hic commodi mollitia suscipit sed debitis eius dicta ex architecto sit esse
                                perspiciatis temporibus, consequatur a, dignissimos explicabo? Laboriosam, quia architecto repellendus nam
                                fugiat vero dolorum exercitationem at! Animi! Commodi pariatur quasi earum similique quibusdam explicabo
                                illum excepturi architecto voluptatum sit? Consectetur tempore eos sequi, ducimus quidem cumque. Omnis
                                maiores aliquam neque? Reiciendis atque iste voluptas hic qui nobis?
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <h2 class="text-center mb-10 text-green skelton header"></h2>

                        <div class="skelton rectangle"></div>
                        <v-progress-linear color="skin" indeterminate class="my-7"></v-progress-linear>
                        <div class="about-service">
                            <p class="about mb-10 mt-8 right skelton title"></p>
                            <p class="left skelton paragraph"></p>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import { IconUsersGroup } from '@tabler/icons-vue';
gsap.registerPlugin(ScrollTrigger);
const items = [
    {
        title: t('bread.services'),
        disabled: false,
        href: '/our-services'
    },
    {
        title: t('bread.service'),
        disabled: true,
        href: '/our-services'
    }
];
const loading = ref(true);
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        animations();
    }, 1000);
    window.scrollTo(0, 0);
});

const animations = () => {
    setTimeout(() => {
        gsap.utils.toArray('.left').forEach((box) => {
            gsap.from(box, {
                x: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    end: 'bottom 20%'
                }
            });
        });
        gsap.utils.toArray('.right').forEach((box) => {
            gsap.from(box, {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    end: 'bottom 20%'
                }
            });
        });
    }, 100);
};
</script>

<style lang="scss" scoped>
.service {
    overflow-x: hidden;
    overflow-y: hidden;
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

    .about-service {
        margin-top: 10px;

        p {
            &.about {
                color: #4b9f61;
                font-weight: bold;
                font-size: 1.6rem;
            }
        }
    }
    .service-img {
        width: 100%;
        border-radius: 10px;
        height: auto;
        max-height: 400px;
        object-fit: cover;
        object-position: center;

        @media (max-width: 768px) {
            max-height: 300px;
        }

        @media (max-width: 576px) {
            max-height: 200px;
        }
    }
    hr {
        margin: 20px 0;
        background-color: #367cb5;
        height: 3px;
    }
    .service-content {
        position: relative;
        height: auto;
        position: relative;
        .overlay {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            background: url('@/assets/images/abstract/abs.png') center no-repeat;
            background-size: cover;
            opacity: 0.3;
        }
        .content {
            padding: 20px;
            position: relative;
            z-index: 10;
            background: #ffffff9d;
            backdrop-filter: blur(4px);
            font-weight: 500;
            line-height: 22px;
            border-radius: 20px;
        }
    }
}
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.header {
        height: 3%;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.title {
        height: 20px;
        width: 400px;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.paragraph {
        margin-top: 10px;
        height: 400px;
    }
    &.rectangle {
        margin-top: 10px;
        height: 200px;
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
