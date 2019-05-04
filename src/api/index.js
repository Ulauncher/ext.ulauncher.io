import authService from '../auth0/AuthService'
import 'isomorphic-fetch'

const sleep = ms => new Promise(res => setTimeout(res, ms))

const fetchApi = async (urlPart, options = {}, contentType = 'application/json') => {
  options.headers = { Accept: 'application/json' }
  if (options.auth) {
    // wait until session is renewed
    while (authService.sessionHasExpired()) {
      await sleep(150)
    }

    options.headers.Authorization = `Bearer ${authService.getToken()}`
  }
  if (contentType) {
    options.headers['Content-Type'] = contentType
  }

  let resp
  try {
    resp = await fetch(`${process.env.REACT_APP_API_BASE_URL}${urlPart}`, options)
  } catch (e) {
    const error = { status: 'error' }
    throw error
  }

  if (resp.status === 204) {
    return true
  }

  const respContentType = resp.headers.get('Content-Type')
  if (respContentType !== 'application/json') {
    throw new Error(`Unknown Content-Type ${respContentType}`)
  }

  const jsonResp = await resp.json()
  if (resp.ok) {
    return jsonResp
  } else {
    const error = {
      status: resp.status,
      body: jsonResp,
      ...jsonResp.error
    }
    throw error
  }
}

export function checkManifest(url) {
  return fetchApi(`/check-manifest?url=${url}`, { auth: true })
}

export function uploadImages(formData) {
  return fetchApi(
    '/upload-images',
    {
      auth: true,
      method: 'POST',
      body: formData
    },
    null
  )
}

export function submitExtension(data) {
  return fetchApi('/extensions', {
    auth: true,
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function editExtension(id, data) {
  return fetchApi(`/extensions/${id}`, {
    auth: true,
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

export function fetchItems() {
  return fetchApi('/extensions')
}

export function fetchMyItems() {
  return fetchApi('/my/extensions', { auth: true })
}

export function fetchItem(id) {
  return fetchApi(`/extensions/${id}`)
}

export function deleteItem(id) {
  return fetchApi(`/extensions/${id}`, {
    auth: true,
    method: 'DELETE'
  })
}

export async function getComments(extId) {
  let resp
  try {
    resp = await fetch(`/disqus-archive/${extId}.json`)
  } catch (e) {
    const error = { status: 'error' }
    throw error
  }

  const respContentType = resp.headers.get('Content-Type')
  if (respContentType !== 'application/json') {
    const error = { status: 'error' }
    throw error
  }

  return await resp.json()
}
