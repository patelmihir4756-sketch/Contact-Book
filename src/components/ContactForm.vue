<template>
  <form class="form-grid" @submit.prevent="submitForm">
    <label>
      First Name
      <input v-model.trim="form.firstName" required type="text" />
    </label>

    <label>
      Last Name
      <input v-model.trim="form.lastName" required type="text" />
    </label>

    <label>
      Email
      <input v-model.trim="form.email" required type="email" />
    </label>

    <label>
      Phone
      <input v-model.trim="form.phone" type="tel" />
    </label>

    <label>
      Company
      <input v-model.trim="form.company" type="text" />
    </label>

    <label class="full-width">
      Notes
      <textarea v-model.trim="form.notes" rows="4"></textarea>
    </label>

    <div class="form-actions full-width">
      <RouterLink class="button button-secondary" :to="cancelTo">Cancel</RouterLink>
      <button class="button" type="submit">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  contact: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: 'Save Contact'
  },
  cancelTo: {
    type: [String, Object],
    default: '/'
  }
})

const emit = defineEmits(['submit'])

const defaultForm = () => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  notes: ''
})

const form = reactive(defaultForm())

watch(
  () => props.contact,
  (contact) => {
    Object.assign(form, defaultForm(), contact || {})
  },
  { immediate: true }
)

function submitForm() {
  emit('submit', {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
    company: form.company,
    notes: form.notes
  })
}
</script>
