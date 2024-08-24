<template>
    <component :is="layoutComponent">
        <router-view />
    </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const layoutComponent = computed(() => {
    return route.meta.layout || 'default-layout';
});
</script>
