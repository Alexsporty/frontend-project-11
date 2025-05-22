import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import validateUrl from "./validate.js";

const addUrl = (watchedState) => {
  const form = document.querySelector("form");
  const input = form.elements.rss;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();

    validateUrl(inputValue, watchedState.feeds)
      .then(() => {
        console.log("URL валиден и не дублируется");
        watchedState.feeds.push(inputValue);
        watchedState.form.valid = true;
        watchedState.form.error = null;
        console.log(watchedState.feeds);

        form.reset();
        input.focus();
      })
      .catch((err) => {
        console.log("Ошибка валидации", err.message);
        watchedState.form.valid = false;
        watchedState.form.error = err.message;
      });
  });
};
export default addUrl;
