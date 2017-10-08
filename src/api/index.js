import authService from '../auth0/AuthService'
import 'isomorphic-fetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const sleep = ms => new Promise(res => setTimeout(res, ms))

const fetchApi = async (url_part, options = {}, contentType = 'application/json') => {
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
    resp = await fetch(`${API_BASE_URL}${url_part}`, options)
  } catch (e) {
    const error = { status: 'error' }
    throw error
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

export function fetchItems() {
  return fetchApi('/extensions')
}

export function fetchMyItems() {
  return fetchApi('/my/extensions', { auth: true })
}

export function fetchItem(id) {
  return fetchApi(`/extensions/${id}`)
}
