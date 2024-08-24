<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
});

const editMode = ref(false);
const errors = reactive({});

onMounted(() => {
    if(route.name === 'user.edit'){
        editMode.value = true;
        getUser();
    }
    console.log(route.name, editMode.value);
})

const getUser = async () => {
    let response = await axios.get(`/api/user/edit/${route.params.id}`)
        .then((response) => {
            form.name = response.data.user.name;
            form.email = response.data.user.email;
        })
}

const handleSave = async () => {
  try {
    if (editMode.value) {
        await axios.post(`/api/user/update/${route.params.id}`, form);
    } else {
        await axios.post('/api/user/store', form);
    }
    router.push('/');
  } catch (error) {
    if (error.response && error.response.status === 422) {
        const responseErrors = error.response.data.errors;
        Object.keys(responseErrors).forEach(key => {
            errors[key] = responseErrors[key][0];
        });
    } else {
        console.error("An error occurred while saving the user:", error);
    }
  }
};

</script>

<template>
    <div class="container">
        <div class="section">
            <dic class="section-header">
                <div class="section-title" v-if="editMode">Edit User</div>
                <div class="section-title" v-else>Create New User</div>
            </dic>
            <div class="form-section">
                <label>Name</label>
                <input v-model="form.name" type="text" />
                <span class="error" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="form-section">
                <label>Email</label>
                <input v-model="form.email" type="text" />
                <span class="error" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="form-section">
                <label>Password</label>
                <input v-model="form.password" type="password" />
                <span class="error" v-if="errors.password">{{ errors.password }}</span>
            </div>
            <div class="form-section">
                <label>Confirm Password</label>
                <input v-model="form.password_confirmation" type="password" />
                <span class="error" v-if="errors.confirm_password">{{ errors.confirm_password }}</span>
            </div>
            <div class="form-section">
                <button class="btn" type="submit" @click="handleSave">Save</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>