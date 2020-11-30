<template><div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link
                v-if="user"
                class="nav-link disabled"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }"
                :class="{
                  active: tab === 'your_feed'
                }"
                exact
                >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }"
                :class="{
                  active: tab === 'global_feed'
                }"
                exact
                >Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{
                  active: tab === 'tag'
                }"
                :to="{
                  tab: 'tag',
                  tag
                }"
              >#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link 
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
              ><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link
              class="author"
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
              >{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.updatedAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{active: article.favorited}"
              @click="onFavorite(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link
            :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
            class="preview-link"
          >
            <h1>{{ article.title }}</h1>
            <p>{{ article.body }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
      </div>
      <nav>
        <ul class="pagination">
          <li
            class="page-item ng-scope"
            :class="{
              active: pageNum === page
            }"
            v-for="pageNum in totalPages"
            :key="pageNum"
          >
            <nuxt-link
              class="page-link ng-binding"
              :to="{
                name: 'home',
                query: {
                  page: pageNum,
                  tag: $route.query.tag,
                  tab
                }
              }"
            >{{ pageNum }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <nuxt-link
              v-for="tag in tags"
              :key="tag"
              :to="{
                name: 'home',
                query: {
                  tag,
                  tab: 'tag'
                }
              }"
              class="tag-pill tag-default"
            >{{ tag }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getArticlesFeed, feedFavorite, deleteFavorite } from '../../api/article';
import { getTags } from '../../api/tags';
import { mapState } from 'vuex';

export default {
  name: 'HomePage',

  async asyncData( { query } ) {
    const limit = 20;
    const page = Number.parseInt(query.page || 1);
    const { tag, tab="global_feed" } = query;

    const loadArticleList = tab === 'your_feed' ? getArticlesFeed : getArticles
    const [ articlesRes, tagsRes ] = await Promise.all([
      loadArticleList({
        limit,
        offset: (page - 1) * limit,
        tag,
        tab
      }),
      getTags()
    ])

    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data
    articles.forEach(element => element.favoriteDisabled = false);
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPages() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if(article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      } else {
        await feedFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>