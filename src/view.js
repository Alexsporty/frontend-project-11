import onChange from "on-change";
import i18next from "i18next";

// функция отрисовывает список
const render = (elements, state) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === "form.error") {
      const feedback = elements.feedback;
      feedback.textContent = value ? i18next.t(value) : "";
      feedback.classList.toggle("text-danger", !!value);
    }
    if (path === "form.valid") {
      const input = elements.input;
      if (value) {
        input.classList.remove("is-invalid");
      } else {
        input.classList.add("is-invalid");
      }
    }
    if (path === "feeds") {
      const feedsContainer = elements.feeds;
      feedsContainer.innerHTML = "";
      value.forEach((feed) => {
        const feedElem = document.createElement("div");
        feedElem.innerHTML = `<h3>${feed.title}</h3><p>${feed.description}</p>`;
        feedsContainer.appendChild(feedElem);
      });
    }
    if (path === "posts") {
      const postsContainer = elements.posts;
      postsContainer.innerHTML = "";
      value.forEach((post) => {
        const postElem = document.createElement("div");
        postElem.innerHTML = `<a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>`;
        postsContainer.appendChild(postElem);
      });
    }
  });
  return watchedState;
};
export default render;
