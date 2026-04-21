<template>
  <section class="stack-lg">
    <div>
      <p class="eyebrow">{{ isEditing ? 'Update Contact' : 'Create Contact' }}</p>
      <h2>{{ isEditing ? 'Edit contact information' : 'Add a new contact' }}</h2>
      <p class="muted">
        {{ isEditing ? 'Make changes below and save the updated contact.' : 'Fill out the form to add a new contact to the contact book.' }}
      </p>
    </div>

    <div v-if="isEditing && !contact" class="empty-state">
      <h3>Contact not found</h3>
      <p>This contact cannot be edited because it does not exist.</p>
      <RouterLink class="button" to="/">Back to Contacts</RouterLink>
    </div>

    <ContactForm
      v-else
      :cancel-to="cancelDestination"
      :contact="contact"
      :submit-label="isEditing ? 'Save Changes' : 'Create Contact'"
      @submit="saveContact"
    />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ContactForm from '../components/ContactForm.vue'
import { useContacts } from '../composables/useContacts'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const { findContact, addContact, updateContact } = useContacts()

const isEditing = computed(() => Boolean(props.id))
const contact = computed(() => (props.id ? findContact(props.id) : null))
const cancelDestination = computed(() => (props.id ? `/contacts/${props.id}` : '/'))

function saveContact(contactData) {
  if (isEditing.value) {
    const updatedContact = updateContact(props.id, contactData)

    if (updatedContact) {
      router.push(`/contacts/${updatedContact.id}`)
    }

    return
  }

  const createdContact = addContact(contactData)
  router.push(`/contacts/${createdContact.id}`)
}
</script>
