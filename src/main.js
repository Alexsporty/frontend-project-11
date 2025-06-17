import 'bootstrap/dist/css/bootstrap.min.css';
import render from "./view.js";
import validateUrl from "./validate.js";
import addUrl from "./addUrl.js";
import i18next from "./initI18next.js";


const state = {
  form: { valid: true, error: null },
  feeds: [],
  posts: [],
  ui: {
    readPostId: new Set(),
  },
};

const elements = {
  form: document.querySelector("form"),
  input: document.querySelector('input[name="rss"]'),
  feedback: document.querySelector(".feedback"),
  feeds: document.querySelector(".feeds"),
  posts: document.querySelector(".posts"),
};

document.querySelector("h1").textContent = i18next.t("title");
document.querySelector("p.lead").textContent = i18next.t("subtitle");
document.querySelector('button[type="submit"]').textContent = i18next.t("add");
elements.input.placeholder = i18next.t("inputPlaceholder");

const watchedState = render(elements, state);

addUrl(watchedState);
