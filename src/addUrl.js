import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import validateUrl from "./validate.js";
import fetchRss from "./parser.js";
import updateFeeds from "./setTimeout.js";

const addUrl = (watchedState) => {
  const form = document.querySelector("form");
  const input = form.elements.rss;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();

    validateUrl(inputValue, watchedState.feeds)
      .then(() => {
        fetchRss(inputValue).then(({ feed, posts }) => {
          watchedState.feeds.push(feed);
          watchedState.posts.push(...posts);
          watchedState.form.valid = true;
          watchedState.form.error = null;

          updateFeeds(watchedState)
          
          form.reset();
          input.focus();
        });      
      })
      .catch((err) => {
        console.log("Ошибка валидации", err.message);
        watchedState.form.valid = false;
        watchedState.form.error = err.message;
      });
  });
};
export default addUrl;
