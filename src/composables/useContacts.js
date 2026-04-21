import { computed, ref } from 'vue'
import { sampleContacts } from '../data/sampleContacts'

const STORAGE_KEY = 'vue-contact-book'
const contacts = ref(loadContacts())

function loadContacts() {
  const savedContacts = localStorage.getItem(STORAGE_KEY)

  if (!savedContacts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts))
    return [...sampleContacts]
  }

  try {
    return JSON.parse(savedContacts)
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts))
    return [...sampleContacts]
  }
}

function saveContacts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts.value))
}

function sortContacts(list) {
  return [...list].sort((firstContact, secondContact) => {
    const lastNameCompare = firstContact.lastName.localeCompare(secondContact.lastName)

    if (lastNameCompare !== 0) {
      return lastNameCompare
    }

    return firstContact.firstName.localeCompare(secondContact.firstName)
  })
}

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return String(Date.now())
}

export function useContacts() {
  const sortedContacts = computed(() => sortContacts(contacts.value))

  function findContact(id) {
    return contacts.value.find((contact) => contact.id === id)
  }

  function addContact(contact) {
    const newContact = {
      ...contact,
      id: createId()
    }

    contacts.value.push(newContact)
    saveContacts()
    return newContact
  }

  function updateContact(id, updatedContact) {
    const contactIndex = contacts.value.findIndex((contact) => contact.id === id)

    if (contactIndex === -1) {
      return null
    }

    contacts.value[contactIndex] = {
      ...contacts.value[contactIndex],
      ...updatedContact,
      id
    }

    saveContacts()
    return contacts.value[contactIndex]
  }

  function deleteContact(id) {
    contacts.value = contacts.value.filter((contact) => contact.id !== id)
    saveContacts()
  }

  return {
    contacts,
    sortedContacts,
    findContact,
    addContact,
    updateContact,
    deleteContact
  }
}
