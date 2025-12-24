const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedPage.vue') },
      { path: 'finanzas', component: () => import('pages/AccountStatusPage.vue') },
      { path: 'solicitudes', component: () => import('pages/RequestsPage.vue') },
      { path: 'reservas', component: () => import('pages/ReservationsPage.vue') },
      { path: 'notificaciones', component: () => import('pages/NotificationsPage.vue') },
      { path: 'seguridad', component: () => import('pages/SecurityPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
