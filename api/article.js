import { request } from '@/plugins/request';

/**
 * 文章列表
 * @param {Object} params 
 * @param {String} params.tag 
 * @param {String} params.author
 * @param {String} params.favorited
 * @param {Number} params.limit // Limit number of articles
 * @param {Number} params.offset // Offset/skip number of articles
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

/**
 * 个人文章列表
 * @param {Object} params 
 * @param {String} params.tag 
 * @param {String} params.author
 * @param {String} params.favorited
 * @param {Number} params.limit // Limit number of articles
 * @param {Number} params.offset // Offset/skip number of articles
 */
export const getArticlesFeed = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

/**
 * 文章点赞
 * @param {string | number} slug
 */
export const feedFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

/**
 * 删除点赞
 * @param {string | number} slug
 */
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

/**
 * 文章详情
 * @param {string | number} slug
 */
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}


/**
 * 评论列表
 * @param {string | number} slug
 */
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}