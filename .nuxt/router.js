import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4670a364 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _66b138ce = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6f055022 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _4670a364,
    children: [{
      path: "",
      component: _66b138ce
    }, {
      path: "/login",
      component: _6f055022,
      name: "login"
    }, {
      path: "/regsister",
      component: _6f055022,
      name: "regsister"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
