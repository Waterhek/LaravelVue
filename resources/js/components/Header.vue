<template>
    <header>
      <div class="nav-container">
        <div v-if="isAuthenticated" class="header-right">
            <div class="profile" @click="toggleDropdown">
                <span class="profile-name">User</span>
                <i class="arrow-down"></i>
            </div>
            <div v-if="isDropdownOpen" class="dropdown">
              <button class="dropdown-item">Logout</button>
            </div>
        </div>
      </div>
    </header>
  </template>
  
<script setup>
import { ref, computed } from 'vue';

const isDropdownOpen = ref(false);


const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

</script>
  
  <style scoped>
  .nav-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    color: white;
    padding: 30px 20px;
  }
  
  .logo img {
    height: 40px;
  }
  
  .navigation ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .navigation li {
    margin: 0 15px;
  }
  
  .navigation a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .menu-icon {
    background: white;
    height: 3px;
    width: 25px;
    display: block;
    margin: 5px auto;
  }
  
  .mobile-menu {
    display: none;
  }

  .header-right {
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
}

.profile {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.profile-name {
    margin-right: 10px;
}

.arrow-down {
    border: solid white;
    border-width: 0 2px 2px 0;
    padding: 3px;
    transform: rotate(45deg);
}

.dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
}

.dropdown-item {
    padding: 10px 20px;
    text-decoration: none;
    display: block;
    color: #333;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}
  
  @media (max-width: 768px) {
    .navigation {
      display: none;
    }
  
    .menu-toggle {
      display: block;
    }
  
    .mobile-menu {
      display: block;
      position: absolute;
      top: 60px;
      right: 20px;
      background-color: #333;
      width: 200px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  
    .mobile-menu ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .mobile-menu li {
      border-bottom: 1px solid #444;
    }
  
    .mobile-menu a {
      display: block;
      padding: 10px;
      color: white;
      text-decoration: none;
      text-align: center;
    }
  
    .mobile-menu a:hover {
      background-color: #555;
    }

    .header {
        padding: 10px;
    }

    .profile-name {
        display: none;
    }
  }
  </style>  