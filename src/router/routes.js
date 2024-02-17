const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'email-campaigns' },
      { path: 'email-campaigns', component: () => import('pages/EmailCampaigns.vue') },
      { path: 'all-leads', component: () => import('pages/AllLeads.vue') },
      { path: 'master-inbox', component: () => import('pages/MasterInbox.vue') },
    ],
  },
  { path: '/login', component: () => import('pages/LoginPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
