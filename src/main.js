import render from "./view.js";
import validateUrl from "./validate.js";
import addUrl from "./addUrl.js";
import i18next from "./initI18next.js";

const state = {
  form: {
    valid: true,
    error: null,
  },
  feeds: [],
};

const elements = {
  form: document.querySelector("form"),
  input: document.querySelector('input[name="rss"]'),
  feedback: document.querySelector(".feedback"),
  feeds: document.querySelector(".feeds"),
};

document.querySelector("h1").textContent = i18next.t("title");
document.querySelector("p.text-muted").textContent = i18next.t("subtitle");
document.querySelector('button[type="submit"]').textContent = i18next.t("add");
elements.input.placeholder = i18next.t("inputPlaceholder");

const watchedState = render(elements, state);

addUrl(watchedState);
