<script setup>
import TheSideBar from "./TheSideBar.vue";
import TheNavBar from "./TheNavBar.vue";
</script>

<template>
  <div id="app">
    <TheSideBar />

    <div id="main" class="layout-navbar">
      <TheNavBar />

      <div id="main-content">
        <div class="page-heading">
          <!-- <div class="page-title">
            <div class="row">
              <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>Vertical Layout with Navbar</h3>
                <p class="text-subtitle text-muted">Navbar will appear on the top of the page.</p>
              </div>
            </div>
          </div> -->
          <section class="section">
            <!-- Tag special qe na e jep vue-router per me i renderu views ne kete vend -->
            <RouterView />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
