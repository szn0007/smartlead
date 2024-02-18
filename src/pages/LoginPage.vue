<template>
  <q-layout>
    <q-page-container style="padding-top: 0;">
      <q-page class="flex flex-center">
        <q-header elevated>
          <q-toolbar class="q-px-lg">
            <q-toolbar-title>
              <q-img src="/logo.svg" height="30px" width="140px" />
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
        <div class="flex justify-center items-center login-container">
          <div class="login-form-wrapper">
            <div class="text-h5 text-center">Welcome to Smartlead.ai</div>
            <div class="text-center">Log in to your account </div>

            <q-form
              @submit.prevent="login"
              class="q-gutter-md q-mt-lg"
            >
              <label>Email</label>
              <q-input
                outlined
                dense
                class="q-mt-xs"
                v-model="email"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div class="flex justify-between">
                <label>Password</label>
                <label style="color:#757AE9;">Forgot Password?</label>
              </div>
              <q-input
                outlined
                dense
                class="q-mt-xs"
                :type="isPwd ?  'password' : 'text'"
                v-model="password"
                lazy-rules
              >
                <template v-slot:append>
                  <span class="show-password cursor-pointer" @click="isPwd = !isPwd">
                    {{ isPwd ? 'Show' : 'Hide'}}
                  </span>
                </template>
              </q-input>

              <div>
                <q-btn class="full-width submit-button" unelevated
                label="Sign In" type="submit" />
              </div>
            </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const isPwd = ref(true);
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    const login = () => {
      // Mock user data
      const users = [
        { email: 'user1@smartlead.ai', password: 'password' },
        { email: 'user2@smartlead.ai', password: 'password' },
      ];

      // Find user with matching email and password
      const user = users.find(
        (u) => u.email === email.value && u.password === password.value,
      );

      if (user) {
        $q.notify({
          message: 'Login Successful',
          color: 'primary',
          position: 'center',
        });
        $store.dispatch('auth/loginUser', email.value);
        $router.push('/');
      } else {
        $q.notify({
          message: 'Invalid email or password',
          color: 'negative',
          position: 'center',
        });
      }
    };

    return {
      password,
      isPwd,
      email,
      login,
    };
  },
});
</script>

<style scoped>
  .login-container{
    background-color: #F7F8FE;
    width: 100vw;
    height: 100vh;
  }
  .login-form-wrapper{
    background-color: #ffffff;
    border: 1px solid #C6C7DB;
    width: 545px;
    height: auto;
    padding: 48px;
  }
  label{
    color: #7A7D9C;
    font-size: 14px;
  }
  .submit-button{
    background-color: #EDEEF8;
    color: #A9ABC1;
  }
  .show-password{
    font-size: 12px;
  }
</style>
