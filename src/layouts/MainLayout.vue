<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
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
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>New tab</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New incognito tab</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Recent tabs</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>History</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Downloads</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Help &amp; Feedback</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    return {
      essentialLinks: linksList,
    };
  },
});
</script>
