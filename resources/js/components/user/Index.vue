<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2';

const router = useRouter();

const search = ref('');
const users = ref({
    data: [],
    prev_page_url: null,
    next_page_url: null
});

onMounted(async () => {
    getListing('/api/user');
});

const searchUsers = () => {
    getListing(`/api/user?page=${currentPage.value}&search=${search.value}`);
}

//Start Pagination
const currentPage = ref(1);

const pageNumbers = computed(() => {
  const numbers = [];
  for (let i = 1; i <= users.value.last_page; i++) {
    numbers.push(i);
  }
  return numbers;
});

const pageUrls = computed(() => {
  const urls = [];
  for (let i = 1; i <= users.value.last_page; i++) {
    urls.push(`/api/user?page=${i}`);
  }
  return urls;
});
//End Pagination

const newUser = () => {
    router.push('/user/create');
}

const getListing = async(url) => {
    try {
        const response = await axios.get(url);
        users.value = response.data.users;
        currentPage.value = response.data.users.current_page;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

const updateUser = async (id) => {
    router.push(`/user/${id}/edit`);
}

const deleteUser = async (id) => {
    const modal = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (modal.isConfirmed) {
      await axios.delete(`/api/user/delete/${id}`);
      users.value.data = users.value.data.filter(user => user.id !== id);
      
      Swal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      );
    }
}

</script>

<template>
    <div class="section-header">
        <div class="section-title">
            User Management
        </div>
        <button class="btn" @click="newUser">New User</button>
    </div>
    <div class="search-section">
        <input v-model="search" @input="searchUsers" type="text" class="form-input" placeholder="Search users..." />
    </div>
    <div class="table-container">
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th class="action">Action</th>
            </tr>
            <tr v-for="user in users.data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <div class="action-button-container">
                        <button class="btn-square btn-edit" @click="updateUser(user.id)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-square btn-delete" @click="deleteUser(user.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="pagination-container">
        <button 
        :disabled="!users.prev_page_url"
        @click="getListing(users.prev_page_url)">
            <i class="fa fa-chevron-left"></i>
        </button>

        <button 
        v-for="page in pageNumbers"
        :key="page"
        :class="{ 'active': page === currentPage }"
        @click="getListing(pageUrls[page - 1])">
        {{ page }}
        </button>

        <button 
        :disabled="!users.next_page_url"
        @click="getListing(users.next_page_url)">
        <i class="fa fa-chevron-right"></i>
        </button>
    </div>
</template>

<style scoped>
.table-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
    white-space: nowrap;
}

th.action{
    text-align: center;
}

th.action, td.action {
    width: 150px;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-container button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  cursor: pointer;
}

.pagination-container button.active {
  background-color: blue;
  color: white;
}

.pagination-container button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.search-section{
    margin-bottom: 30px;
}

@media (max-width: 768px) {
    table {
        width: 100%;
    }

    th, td {
        white-space: normal;
    }

    th, td {
        font-size: 14px;
    }

    td.action {
        text-align: center;
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }
}
</style>

