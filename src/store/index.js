import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import auth from './module-auth';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
  reducer: (state) => ({ auth: { email: state.auth.email } }),
});

export default store((/* { ssrContext } */) => {
  const Store = createStore({
    modules: {
      auth,
    },
    plugins: [vuexLocal.plugin],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
