import validateUrl from "./validate.js";
import fetchRss from "./parser.js";
import updateFeeds from "./setTimeout.js";
import normalizeUrl from "./normalizeUrl.js";

const addUrl = (watchedState) => {
  const form = document.querySelector("form");
  const input = form.elements.rss;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    validateUrl(inputValue, watchedState.feeds)
      .then(() => {
        const normalizedUrl = normalizeUrl(inputValue);

        fetchRss(normalizedUrl).then(({ feed, posts }) => {
          const alreadyExists = watchedState.feeds.some(
            (existing) => normalizeUrl(existing.url) === normalizedUrl
          );

          if (!alreadyExists) {
            watchedState.feeds.push(feed);
          }

          const existingPostLinks = watchedState.posts.map((post) => post.link);
          const newPosts = posts.filter(
            (post) => !existingPostLinks.includes(post.link)
          );

          watchedState.posts.push(...newPosts);
          watchedState.form.valid = true;
          watchedState.form.error = null;
          updateFeeds(watchedState);

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
