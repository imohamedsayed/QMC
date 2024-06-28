<template>
 
    <footer class="footer pa-4 text-center text-md-start">
        <v-row class="">
            <v-col cols="12" md="6" lg="3" class="mt-5">
                <div>
                    <img src="@/assets/images/logo.png" width="300" style="height: 200px" class="" />
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3" class="mt-5">
                <p class="text-green">{{ $t('footer.quickLink') }}</p>
                <div class="mt-5">
                    <v-list-item color="blueLogo" :title="$t('footer.link1')" to="/"> </v-list-item>
                    <v-list-item color="blueLogo" :title="$t('footer.link2')" to="/about-us"> </v-list-item>
                    <v-list-item color="blueLogo" :title="$t('footer.link3')" to="/contact-us"> </v-list-item>
                    <v-list-item color="blueLogo" :title="$t('header.link4')" to="/login"> </v-list-item>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3" class="mt-5 text-blueLogo">
                <p class="text-green">{{ $t('footer.contactUs') }}</p>
                <div class="mt-5 bg-none">
                    <v-list-item :title="'QMC.inc@gmail.com'"> </v-list-item>
                    <v-list-item :title="$t('footer.reservation') + ': +0991xxxxx - +0991xxxxx'"> </v-list-item>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3" class="mt-5">
                <p class="text-green">{{ $t('footer.social') }}</p>
                <div class="social-media d-flex gap-4 mt-5 justify-center">
                    <a href="https://www.facebook.com/profile.php?id=100090516042333" target="_blank">
                        <v-btn icon><IconBrandFacebook /></v-btn>
                    </a>
                    <a href="https://wa.me/+0991xxxxx?text=Hello%20there!" target="_blank">
                        <v-btn icon><IconBrandWhatsapp /></v-btn>
                    </a>
                    <!-- <v-btn icon><IconBrandSnapchat /></v-btn> -->
                    <!-- <v-btn icon><IconBrandTwitter /></v-btn> -->
                </div>
            </v-col>
        </v-row>
        <div class="text-center mt-4">
            <span style="z-index: 100; position: relative; font-size: 14px"
                >QMC - All copyrights reserved &copy; 2024<br />
                Developed by: <a target="_blank" href="https://imohamedsayed.vercel.app/">Eng. Mohamed Sayed</a> ,
                <a target="_blank" href="https://m7moud-portfolio.netlify.app/">Eng. Mahmoud Khairy</a></span
            >
        </div>
    </footer>
</template>

<script setup>
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandWhatsapp,
    IconBrandLinkedin,
    IconBrandSnapchat,
    IconBrandTwitter
} from '@tabler/icons-vue';
</script>

<style lang="scss" scoped>
.contact {
}
footer {
    position: relative;
    min-height: 300px;
    background: #fff;
    overflow: hidden;

    p {
        font-size: 1.4rem;
        font-weight: 600;
        color: white;
    }
    a {
        text-decoration: none;
        color: #367cb5;
        font-weight: bold;
    }
}
</style>
