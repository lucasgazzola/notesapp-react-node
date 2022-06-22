const API_URL = process.env.API_URL || 'http://localhost:5000/api';
const NOTES_URL = `${API_URL}/notes`;
const ARCHIVED_NOTES_URL = `${API_URL}/archived`;


export async function setNewNote({ title, content, categories }) {
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        title,
        content,
        categories
      })
  }
  await fetch(NOTES_URL, headers)
    .then(response => response.json())
    .catch(console.error)
}


export async function getAllNotes() {
  return await fetch(NOTES_URL)
    .then(response => response.json())
    .catch(console.error)
}

export async function getAllArchivedNotes() {
  return await fetch(ARCHIVED_NOTES_URL)
    .then(response => response.json())
    .catch(console.error)
}


export async function updateNote({ id, title, content, categories, isArchived, isClickArchived }) {
  const headers = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        id,
        title,
        isArchived,
        isClickArchived,
        categories,
        content,
      })
  }
  await fetch(NOTES_URL, headers)
    .then(response => response.json())
    .catch(console.error)
}


export async function deleteNote(id) {
  const headers = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        id
      }
    )
  }
  await fetch(NOTES_URL, headers)
    .then(res => res.json())
    .catch(console.error)
}