import Vue from 'vue'
import Router from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import Links from '@/components/links/Links'
import CreateLink from '@/components/links/CreateLink'
import Logs from '@/components/logs/Logs'
import Users from '@/components/users/Users'
import CreateUser from '@/components/users/CreateUser'
import Account from '@/components/users/Account'
import Login from '@/components/users/Login'
import faq from '@/components/faq'
import Dashboard from '@/components/Dashboard'

import AuthService from '@/services/AuthService'
import AlertService from '@/services/AlertService'

// Make alert service globally available
Vue.prototype.$alert = AlertService

Vue.use(Router)
Vue.use(VueClipboard)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/links'
    },
    {
      path: '/links',
      name: 'Links',
      component: Links,
      meta: { requiresLogin: true, requiresAdmin: false }
    }, {
      path: '/createLink',
      name: 'CreateLink',
      component: CreateLink,
      meta: { requiresLogin: false, requiresAdmin: false }
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs,
      meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
      path: '/createUser',
      name: 'CreateUser',
      component: CreateUser,
      meta: { requiresLogin: false, requiresAdmin: false }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: { requiresLogin: true, requiresAdmin: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresLogin: false, requiresAdmin: false }
    },
    {
      path: '/faq',
      name: 'faq',
      component: faq,
      meta: { requiresLogin: false, requiresAdmin: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresLogin: true, requiresAdmin: false }
    }
  ]
})

// Auth service is instantiated wherever it is used due to local storage of user info
const authService = new AuthService()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    if (authService.isAdmin()) {
      next()
    } else {
      next('/login')
    }
  } else if (to.meta.requiresLogin) {
    if (authService.isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
}
)

// THIS IS BAD - making router available globally so it is accessible in services - Better approach?
window.router = router

export default router
