<template>
  <section v-if="contact" class="stack-lg">
    <div class="details-header">
      <div>
        <p class="eyebrow">Contact Details</p>
        <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
      </div>

      <div class="details-actions">
        <RouterLink class="button button-secondary" :to="`/contacts/${contact.id}/edit`">
          Edit
        </RouterLink>
        <button class="button button-danger" type="button" @click="removeContact">Delete</button>
      </div>
    </div>

    <div class="details-grid">
      <article class="detail-card">
        <h3>Email</h3>
        <p>{{ contact.email || 'No email added' }}</p>
      </article>

      <article class="detail-card">
        <h3>Phone</h3>
        <p>{{ contact.phone || 'No phone number added' }}</p>
      </article>

      <article class="detail-card">
        <h3>Company</h3>
        <p>{{ contact.company || 'No company added' }}</p>
      </article>

      <article class="detail-card full-card">
        <h3>Notes</h3>
        <p>{{ contact.notes || 'No notes added' }}</p>
      </article>
    </div>
  </section>

  <section v-else class="empty-state">
    <h2>Contact not found</h2>
    <p>The contact you tried to open does not exist.</p>
    <RouterLink class="button" to="/">Back to Contacts</RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { findContact, deleteContact } = useContacts()

const contact = computed(() => findContact(props.id))

function removeContact() {
  if (!contact.value) {
    return
  }

  const confirmed = window.confirm(`Delete ${contact.value.firstName} ${contact.value.lastName}?`)

  if (!confirmed) {
    return
  }

  deleteContact(contact.value.id)
  router.push('/')
}
</script>
