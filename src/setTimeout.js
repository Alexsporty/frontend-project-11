import fetchRss from './parser.js'

const updateFeeds = (watchedState) => {
  const promises = watchedState.feeds.map((feed) => {
    return fetchRss(feed.url)
      .then(({ posts }) => {
        const existingLinks = watchedState.posts.map((post) => post.link)
        const uniquePosts = posts.filter(
          (post) => !existingLinks.includes(post.link)
        )
        watchedState.posts.push(...uniquePosts)
      })
      .catch((err) => {
        console.log(`Ошибка обновления файла ${feed.url}`, err.message)
      })
  })
  Promise.all(promises).finally(() => {
    setTimeout(() => updateFeeds(watchedState), 5000)
  })
}
export default updateFeeds
