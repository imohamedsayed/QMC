<template>
    <div class="d-flex justify-center align-center text-center h-100vh">
        <div>
            <img src="@/assets/images/landing/law.svg" width="500" alt="404" />
            <h1 class="text-h1 pt-3">{{ $t('error.oops') }}</h1>
            <h4 class="text-h4 my-8">{{ $t('error.message') }}</h4>
            <v-btn flat color="blueLogo" class="mb-4" to="/">{{ $t('error.goHome') }}</v-btn>
        </div>
    </div>
</template>
