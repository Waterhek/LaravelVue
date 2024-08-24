<template>
    <div class="main">
        <Sidebar />
        <div class="main-container">
            <Header />
            <div class="content-container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header
  }
});
</script>

<style scoped>



    

.main-container{
    margin-left: 250px; /*Based on Sidebar*/
}

.content-container{
    padding: 40px;
}

@media (max-width: 768px) {
.main-container {
    margin-left: 0;
}

.content-container{
    padding: 15px;
}
}
</style>