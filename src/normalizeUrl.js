const normalizeUrl = url => {
  try {
    const normalizedUrl = new URL(url)
    return `${normalizedUrl.origin}${normalizedUrl.pathname.replace(/\/$/, '')}`
  } catch {
    return url.trim()
  }
}

export default normalizeUrl
