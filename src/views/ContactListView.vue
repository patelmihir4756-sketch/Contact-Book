<template>
  <section class="stack-lg">
    <div class="toolbar">
      <div>
        <h2>Contacts</h2>
        <p class="muted">Contacts are sorted alphabetically by last name.</p>
      </div>

      <label class="search-box">
        <span>Search</span>
        <input v-model.trim="searchText" placeholder="Search by first or last name" type="text" />
      </label>
    </div>

    <div v-if="filteredContacts.length" class="contact-list">
      <RouterLink
        v-for="contact in filteredContacts"
        :key="contact.id"
        :to="`/contacts/${contact.id}`"
        class="contact-item"
      >
        <div>
          <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
          <p>{{ contact.email }}</p>
        </div>

        <span class="contact-arrow">View</span>
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      <h3>No contacts found</h3>
      <p>Try a different search or add a new contact.</p>
      <RouterLink class="button" to="/contacts/new">Create Contact</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const searchText = ref('')
const { sortedContacts } = useContacts()

const filteredContacts = computed(() => {
  const query = searchText.value.toLowerCase()

  if (!query) {
    return sortedContacts.value
  }

  return sortedContacts.value.filter((contact) => {
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query)
    )
  })
})
</script>
