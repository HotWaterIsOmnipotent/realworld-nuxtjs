import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4670a364 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _66b138ce = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6f055022 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _77ade8af = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _0f4f3ddd = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _3aa1c9a7 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _5e782bfc = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _4670a364,
    children: [{
      path: "",
      component: _66b138ce,
      name: "home"
    }, {
      path: "/login",
      component: _6f055022,
      name: "login"
    }, {
      path: "/regsister",
      component: _6f055022,
      name: "regsister"
    }, {
      path: "/profile/:username",
      component: _77ade8af,
      name: "profile"
    }, {
      path: "/settings",
      component: _0f4f3ddd,
      name: "settings"
    }, {
      path: "/editor",
      component: _3aa1c9a7,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5e782bfc,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
