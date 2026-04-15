const BASE_URL = '/api';

export async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status === 'OK') return json.data;
  throw new Error(json.message || 'Request failed');
}

export async function postData(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  if (json.status === 'OK') return json.data;
  throw new Error(json.message || 'Request failed');
}

export async function uploadFile(endpoint, formData) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  if (json.status === 'OK') return json.data;
  throw new Error(json.message || 'Upload failed');
}

export async function putData(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status === 'OK') return json.data;
  throw new Error(json.message || 'Request failed');
}

export async function deleteData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
