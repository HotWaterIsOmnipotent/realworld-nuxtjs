<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>
        <user-meta :article="article"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <user-meta :article="article" />
      </div>
      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">
          <comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../../api/article';
import MarkdownIt from 'markdown-it';
import UserMeta from './user-meta.vue';
import Comments from './comments.vue';


export default {
  middleware: 'authenticate',
  name: 'articlePage',

  async asyncData({ params }) {
    console.log(params, 'params')
    const { data } = await getArticle(params.slug);
    const { article } = data;

    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },

  components: {
    UserMeta,
    Comments
  }
}
</script>

<style>

</style>