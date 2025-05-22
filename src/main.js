import render from "./view.js";
import validateUrl from "./validate.js";
import addUrl from "./addUrl.js";

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

const watchedState = render(elements, state);

addUrl(watchedState);
