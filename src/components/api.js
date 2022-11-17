const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-2',
  headers: {
    authorization: '0cb069e0-7de5-48c6-b0ea-1db96abfeced',
    'Content-Type': 'application/json'
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => {
    err.code = res.status;

    return Promise.reject(err)
  });
}

export async function getBasicData() {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  return checkResponse(res);
};

export async function changeProfileData(name, about) {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
  return checkResponse(res);
}

export async function changeProfileAvatar(avatar) {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  });
  return checkResponse(res);
}

export async function getInitialCards() {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return checkResponse(res);
}

export async function createCardTape(data) {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  });
  return checkResponse(res);
}

export const switchLike = async (id, isLiked) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  });
  return checkResponse(res);
}

export const deleteCardOnServer = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  });
  return checkResponse(res);
}