import axios from "axios";
import i18next from "i18next";
import { state } from "./state.js";
const parser = new DOMParser();

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).slice(2, 9);

const fetchRss = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  return axios
    .get(proxyUrl)
    .then((response) => {
      const xmlString = response.data.contents;
      const doc = parser.parseFromString(xmlString, "application/xml");
      const channel = doc.querySelector("channel");

      if (!channel) {
        throw new Error(i18next.t("errors.invalidRss"));
      }

      const feed = {
        id: generateId(),
        title: channel.querySelector("title").textContent,
        description: channel.querySelector("description").textContent,
        url,
      };

      const posts = [];
      const items = doc.querySelectorAll("item");
      items.forEach((item) => {
        const rawDescription = item.querySelector("description").textContent;
        const tempElement = document.createElement("div");
        tempElement.innerHTML = rawDescription;
        const cleanElement = tempElement.textContent;
        posts.push({
          id: generateId(),
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent,
          description: cleanElement,
        });
      });
      return { feed, posts };
    })
    .catch((error) => {
      console.error("Ошибка запроса", error);
      throw new Error(error);
    });
};

export default fetchRss;
