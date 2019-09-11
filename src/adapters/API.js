const apiEndpoint = 'http://localhost:3000/api/v1';
const itemsUrl = `${apiEndpoint}/items`;

const getItems = () => {
  return fetch(itemsUrl)
    .then(res => res.json())
};

const getItem = (item) => {
  return fetch(`${itemsUrl}/${item._id}`)
    .then(res => res.json())
}

const postItem = (item) => {
  return fetch(`${itemsUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...item })
  })
    .then(res => res.json())
}

const patchItem = (item) => {
  return fetch(`${itemsUrl}/${item._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...item })
  })
    .then(res => res.json())
}

const deleteItem = (item) => {
  return fetch(`${itemsUrl}/${item._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export default {
  getItems,
  getItem,
  postItem,
  patchItem,
  deleteItem
};