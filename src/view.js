import * as bootstrap from "bootstrap";
import onChange from "on-change";
import i18next from "i18next";

// функция отрисовывает список
const render = (elements, state) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === "form.error") {
      const feedbackError = elements.feedback;
      feedbackError.textContent = value ? i18next.t(value) : "";
      feedbackError.classList.remove("text-success");
      feedbackError.classList.toggle("text-danger", !!value);
    }

    if (state.form.valid === true) {
      const feedbackValid = elements.feedback;
      feedbackValid.textContent = i18next.t("messages.success");
      feedbackValid.classList.add("text-success");
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
          const postItem = document.createElement("li");
          postItem.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-start"
          );

          const link = document.createElement("a");
          link.setAttribute("href", post.link);
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
          link.textContent = post.title;

          const isRead = watchedState.ui.readPostId.has(post.id);
          link.classList.add(isRead ? "fw-normal" : "fw-bold");

          const previewBtn = document.createElement("button");
          previewBtn.textContent = "Просмотр";
          previewBtn.classList.add("btn", "btn-outline-primary", "btn-sm");
          previewBtn.setAttribute("data-id", post.id);
          previewBtn.setAttribute("type", "button");

          previewBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const { id } = e.target.dataset;
            const post = watchedState.posts.find((p) => p.id === id);

            watchedState.ui.readPostId.add(id);

            const modalTitle = document.querySelector(".modal-title");
            const modalBody = document.querySelector(".modal-body");
            const modalLink = document.querySelector(".full-article");

            modalTitle.textContent = post.title;
            modalBody.textContent = post.description;
            modalLink.href = post.link;

            const modal = new bootstrap.Modal(document.getElementById("modal"));
            modal.show();
          });
          postItem.appendChild(link);
          postItem.appendChild(previewBtn);
          postsContainer.appendChild(postItem);
        });
      }
    }
  });
  return watchedState;
};
export default render;
