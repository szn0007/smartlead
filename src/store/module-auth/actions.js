export const loginUser = ({ commit }, email) => {
  commit('SET_USER_EMAIL', email);
};

export const logoutUser = ({ commit }) => {
  commit('RESET_USER');
};
