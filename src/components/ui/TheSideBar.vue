<script setup>
import { initSidebar } from "@/assets/sidebar.js";
import PerfectScrollbar from "perfect-scrollbar";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// Lifecycle hook (metoda) i Vue 3
onMounted(() => {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) new PerfectScrollbar(sidebar);
  initSidebar();
});

const route = useRoute();
const isActive = (routeName) => {
  return {
    active: route.name === routeName,
  };
};
</script>

<template>
  <div id="sidebar" class="active">
    <div class="sidebar-wrapper">
      <div class="sidebar-header position-relative">
        <div class="d-flex justify-content-between align-items-center">
          <div class="logo">
            <!-- <a href="index.html"><img src="@/assets/images/logo/logo.svg" alt="Logo" srcset="" /></a> -->
            Logo
          </div>

          <div class="sidebar-toggler x">
            <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
          </div>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class="sidebar-title">Menu</li>

          <li class="sidebar-item" :class="isActive('home')">
            <router-link to="/" class="sidebar-link">
              <i class="bi bi-grid-fill"></i>
              <span>Dashboard</span>
            </router-link>
          </li>

          <li class="sidebar-item has-sub">
            <a href="#" class="sidebar-link">
              <i class="bi bi-stack"></i>
              <span>Components</span>
            </a>
            <ul class="submenu">
              <li class="submenu-item">
                <a href="component-alert.html">Alert</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
