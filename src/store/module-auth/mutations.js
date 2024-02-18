export const SET_USER_EMAIL = (state, email) => {
  state.email = email;
};

export const RESET_USER = (state) => {
  state.email = '';
  localStorage.removeItem('vuex');
};
