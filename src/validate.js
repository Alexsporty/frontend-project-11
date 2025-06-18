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
    url: yup.string().url('Ссылка должна быть валидным URL').required().notOneOf(existingUrl),
  });
  console.log(rssSchema);
  return rssSchema.validate({ url: normalizedInput }, {abortEarly: false})
  .catch((err) => {
    throw new Error(err.errors[0])
  })
};

export default validateUrl;
