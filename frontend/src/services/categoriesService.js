const API_URL = process.env.API_URL || 'https://lucas-notes-app.herokuapp.com/api';

export async function getAllCategoriesOnNote(id) {
  return await fetch(`${API_URL}/notes/${id}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .catch(console.error)
}

export async function getAllCategories() {
  return await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .catch(console.error)
}

export async function getNotesOfCategory(categoryName) {
  return await fetch(`${API_URL}/categories/${categoryName}/notes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .catch(console.error)
}