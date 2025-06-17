import * as yup from "yup";
import normalizeUrl from './normalizeUrl.js'

yup.setLocale({
  string: {
    url: "errors.url",
  },
  mixed: {
    required: "errors.required",
    notOneOf: "errors.duplicate",
  },
});

const validateUrl = (url, feeds) => {
  const normalizedInput = normalizeUrl(url)
  const existingUrl = feeds.map((feed) => normalizeUrl(feed.url));
  const rssSchema = yup.object({
    url: yup.string().url().required().notOneOf(existingUrl),
  });
  return rssSchema.validate({ url: normalizedInput });
};

export default validateUrl;
