import * as yup from "yup";

yup.setLocale({
  string: {
    url: "errors.invalidUrl",
  },
  mixed: {
    required: "errors.required",
    notOneOf: "errors.duplicate",
  },
});

const validateUrl = (url, feeds) => {
  const existingUrl = feeds.map(feed => feed.url)
  const rssSchema = yup.object({
    url: yup.string().url().required().notOneOf(existingUrl),
  });
  return rssSchema.validate({ url });
};

export default validateUrl;
