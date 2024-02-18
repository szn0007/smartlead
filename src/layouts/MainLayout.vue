<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="q-px-lg">
        <q-toolbar-title>
          <q-img src="/logo.svg" height="30px" width="140px" />
        </q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn rounded style="background-color: #333788" no-caps>
            <q-img src="/icon.svg" height="16px" width="16px" />
            <div class="q-ml-sm">Trail expires in 12 days</div>
          </q-btn>
          <q-btn round dense flat>
            <q-img src="/union.svg" height="18px" width="18px" />
          </q-btn>
          <q-btn round dense flat>
            <q-img src="/gifts.svg" height="18px" width="18px" />
          </q-btn>
          <q-btn round flat>
            <q-avatar size="24px">
              <img src="https://s3-alpha-sig.figma.com/img/d48e/0f1f/6380fec1035b1a2c33f92502f87eda80?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nWBiX02z84dLtDSFrV8ujxYiPYxMybCbd~oynpnBzSTUd-lXjIwgHFJCiXuEDRJMHkE8lW302-gM12m5Yq4uRBK1O5SCxxC2x-A5LfhrpV8hx~RDbMQK89Z7G~jM9nxZ6nfjIWdNe5HdEIRX9Ht-XUM4oV42pNgBSMwHdox69J2vtbZC4CxB6N-VaKtcxLYg~fi1Z7Kxl2TGGaJRhfztxs~n1azqKHZR03UMcCvAu3AmfqD9TYsL8KxN9w7UE8tKZgAST4sp~yjbixU7rxeY8FcwOxy70P6CusWqwX4LE~MkCn7enjEXU32Ba-M7ybwOBLMqWydN1Xgb6pSTkbH3Bw__">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu fit :offset="[10, 5]" square>
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup>
                  <q-item-section>Hello {{ userEmail }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item clickable @click="confirmLogout = true">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <q-dialog v-model="confirmLogout" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6 q-ma-none">Are you sure you want to logout?</div>
          </q-card-section>
          <hr/>
          <q-card-actions align="right">
            <q-btn label="Cancel" color="negative" v-close-popup />
            <q-btn label="Logout" color="primary" @click="logout" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      class="flex column justify-between"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list class="drawer-bottom-links">
        <div class="inset-border"></div>
        <q-item
          clickable
          tag="a"
          class="q-pa-md q-mt-md"
          :href="'https://www.slack.com'" target="_blank"
        >
          <q-item-section
            avatar
            class="q-ml-sm"
          >
            <q-img src="/slack.svg" height="24px" width="24px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Join Slack Community</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          class="q-pa-md"
          :href="'https://www.smartlead.ai/'" target="_blank"
        >
          <q-item-section
            avatar
            class="q-ml-sm"
          >
            <q-img src="/video.svg" height="24px" width="24px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Smartlead Tutorials</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const linksList = [
  {
    title: 'All Leads',
    icon: '/all-leads.svg',
    activeIcon: '/all-leads-active.svg',
    link: '/all-leads',
  },
  {
    title: 'Master Inbox',
    icon: '/master-inbox.svg',
    activeIcon: '/master-inbox-active.svg',
    link: '/master-inbox',
  },
  {
    title: 'Email Campaigns',
    icon: '/email-campaigns.svg',
    activeIcon: '/email-campaigns-active.svg',
    link: '/email-campaigns',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const store = useStore();
    const userEmail = computed(() => store.state.auth.email);
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();
    const confirmLogout = ref(false);

    const logout = () => {
      $store.dispatch('auth/logoutUser');
      $q.notify({
        message: 'Logout Successful',
        color: 'primary',
        position: 'center',
      });
      $router.push('/login');
    };
    return {
      essentialLinks: linksList,
      userEmail,
      logout,
      confirmLogout,
    };
  },
});
</script>

<style>
  .drawer-bottom-links{
    position: relative;
  }
  .inset-border::before{
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px; /* Width of the top border */
    height: 2px; /* Height of the top border */
    background-color: #E1E3EF; /* Border color */
  }
</style>
