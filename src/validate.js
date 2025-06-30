import * as yup from 'yup'
import normalizeUrl from './normalizeUrl.js'

const validateUrl = (url, feeds) => {
  const normalizedInput = normalizeUrl(url)
  const existingUrl = feeds.map((feed) => normalizeUrl(feed.url))
  const rssSchema = yup.object({
    url: yup
      .string()
      .url('url')
      .required('required')
      .notOneOf(existingUrl, 'duplicate'),
  })
  return rssSchema.validate({ url: normalizedInput }).catch((err) => {
    throw new Error(err.errors[0])
  })
}

export default validateUrl
