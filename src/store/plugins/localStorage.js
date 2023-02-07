export default store => {
  store.subscribe((mutation, state) => {
    // console.debug(`Store mutation detected: ${JSON.stringify(mutation)}`);
    localStorage.setItem('settings', JSON.stringify(state.settings));
    localStorage.setItem('data', JSON.stringify(state.data));
  });
};
