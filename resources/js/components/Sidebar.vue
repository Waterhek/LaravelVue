<script setup>
import { ref } from 'vue';

const isSidebarClosed = ref(true);

const toggleSidebar = () => {
    isSidebarClosed.value = !isSidebarClosed.value;
}
</script>

<template>
    <button class="sidebar-toggle" @click="toggleSidebar"><i class="fa-solid fa-bars"></i></button>
    <div :class="['sidebar', { 'closed': isSidebarClosed }]">
        <div class="logo">Logo</div>
        <div class="nav">
            <router-link :to="{ name: 'user.index' }" class="nav-link"><i class="fa fa-user"></i>User</router-link>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
    margin: 0;
    padding: 0;
    background-color: #333;
    width: 250px;
    height: 100%;
    overflow: auto;
    transition: transform 0.3s ease;
    transform: translateX(0);
    z-index: 100;
}

.sidebar .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    background-color: #444;
}

.sidebar .nav {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.sidebar .nav a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    margin: 5px 0;
    background-color: #555;
    border-radius: 5px;
}

.sidebar .nav i {
    margin-right: 20px;
}

.sidebar-toggle {
    display: none;
}

@media (max-width: 768px) {
    .sidebar {
        margin-top: 60px;
    }

    .main-content {
        margin-left: 0;
    }

    .sidebar-toggle {
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: #333;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        z-index: 1000;
    }

    .sidebar.closed {
        transform: translateX(-500px);
    }
}
</style>
