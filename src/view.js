import onChange from "on-change";

// функция отрисовывает список
const render = (elements, state) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === "form.error") {
      const feedback = elements.feedback;
      feedback.textContent = value;
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
      value.forEach((feedUrl) => {
        const li = document.createElement("li");
        li.textContent = feedUrl;
        feedsContainer.appendChild(li);
      });
    }
  });
  return watchedState;
};
export default render;
