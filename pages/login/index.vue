<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/regsister">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(value, key) in errors">
              <li :key="msg" v-for="msg in value">{{ key }} {{ msg }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" minlength="8" v-model="user.password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, regsister } from '@/api/user';

// 仅在客户端加载 js-cookie包
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  name: 'LoginPage',
  middleware: 'notauthenticate',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit () {
      try {
        const { data } = this.isLogin
        ? await login({ user: this.user })
        : await regsister({ user: this.user })

        // 保存用户登录态
        this.$store.commit('setUser', data.user)

        // 登录态持久化，防止刷新页面丢失
        Cookie.set('user', data.user)

        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.errors
        console.log(error.response.data.errors, 'error.response.data.errors')
      }
    }
  }
}
</script>

<style>

</style>