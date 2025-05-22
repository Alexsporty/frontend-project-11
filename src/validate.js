import * as yup from "yup";

// функция которая проверяет валидность url и дубли url
const validateUrl = (url, feeds) => {
  const rssSchema = yup.object({
    url: yup
      .string()
      .url("Введите коректный url")
      .required("Поле обязательно для заполнения")
      .notOneOf(feeds, "RSS уже существует"),
  });
  return rssSchema.validate({ url });
};
export default validateUrl;
