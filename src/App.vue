<template>
  <div class="page-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">Vue 3 Contact Book</p>
        <h1>Keep your contacts organized in one simple place.</h1>
        <p class="hero-text">
          Search through your contacts, open full details, and update information whenever it changes.
        </p>
      </div>

      <nav class="hero-actions">
        <RouterLink class="button button-secondary" to="/">All Contacts</RouterLink>
        <RouterLink class="button" to="/contacts/new">Add Contact</RouterLink>
      </nav>
    </header>

    <main class="content-card">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
