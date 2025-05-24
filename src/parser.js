import axios from "axios";
const parser = new DOMParser();

const generateId = () => Date.now().toString() + Math.random().toString(36).slice(2, 9);

const fetchRss = (url) => { 
  return axios
    .get(url)
    .then((response) => {
      const doc = parser.parseFromString(response.data, "text/xml");

      const channel = doc.querySelectorAll("channel");
      const feed = {
        id: generateId(),
        title: channel.querySelector('title').textContent,
        description: channel.querySelector('description').textContent,
      };

      const posts = [];
      const items = doc.querySelectorAll('item');
      items.forEach((item) => {
        posts.push({
            id: generateId(),
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent,
        })
      });
      return {feed, posts}
    })
    .catch((error) => {
      console.error("Ошибка запроса", error);
      throw error;
    });
};

export default fetchRss;
