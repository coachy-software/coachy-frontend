export function multipartHeader() {
  return {
    headers: {
      'Authorization': `Basic ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  }
}

export function authorization() {
  return {
    headers: {
      'Authorization': `Basic ${localStorage.getItem('token')}`
    }
  }
}

export function trimLocationHeader(location) {
  return location.substring(location.lastIndexOf('/') + 1);
}
