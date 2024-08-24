<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const crumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p);
  let accumulatedPath = '';
  return pathArray.map((pathSegment, index) => {
    accumulatedPath += `/${pathSegment}`;
    return {
      label: pathSegment,
      path: accumulatedPath
    };
  });
});
</script>
<template>
    <nav>
        <ol class="breadcrumb">
        <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
            <router-link v-if="index < crumbs.length - 1" :to="crumb.path">
            {{ crumb.label }}
            </router-link>
            <span v-else>{{ crumb.label }}</span>
        </li>
        </ol>
    </nav>
</template>

<style scoped>
    .breadcrumb {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    }

    .breadcrumb-item {
    margin-right: 0.5rem;
    }

    .breadcrumb-item a {
    text-decoration: none;
    }

    .breadcrumb-item span {
    color: gray;
    }
</style>
  