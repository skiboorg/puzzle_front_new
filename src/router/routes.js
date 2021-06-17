
const routes = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'enter', component: () => import('pages/enter.vue') },


    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'about', component: () => import('pages/static/about.vue') },
      { path: 'rating', component: () => import('pages/static/rating.vue') },
      { path: 'info', component: () => import('pages/static/info.vue') },
      { path: 'rules', component: () => import('pages/static/rules.vue') },
      { path: 'contacts', component: () => import('pages/static/contacts.vue') },
      { path: 'feedback', component: () => import('pages/static/feedback.vue') },
      //{ path: 'documents', component: () => import('pages/static/docs.vue') },


    ]
  },
  {
    path: '/game',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/game.vue') },


    ]
  },
  {
    path: '/lk',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'profile', component: () => import('pages/lk/profile') },
      { path: 'stats', component: () => import('pages/lk/stats') },
      { path: 'balance', component: () => import('pages/lk/balance') },
      { path: 'settings', component: () => import('pages/lk/settings') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
