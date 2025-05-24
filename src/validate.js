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
  const rssSchema = yup.object({
    url: yup.string().url().required().notOneOf(feeds),
  });
  return rssSchema.validate({ url });
};

export default validateUrl;
