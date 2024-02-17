<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    class="q-pa-md navigation-links"
    active-class="active-background"
  >
    <q-item-section
      v-if="icon"
      avatar
      class="q-ml-xs"
    >
      <q-img v-if="link === $route.path" :src="activeIcon" height="24px" width="24px" />
      <q-img v-else :src="icon" height="24px" width="24px" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    activeIcon: {
      type: String,
      default: '',
    },
  },
});
</script>

<style>
  .navigation-links{
    border-width: 0 0 0 5px;
    border-style: solid;
    border-color: #ffffff;
  }
  .active-background{
    background-color: #F1F2FD;
    border-width: 0 0 0 5px;
    border-style: solid;
    border-color: #757AE9;
  }
</style>
