import { router } from './router.js';

// let dailyLog;
// let sideBar;
document.addEventListener('DOMContentLoaded', () => {
  router.setState();
});

window.addEventListener('hashchange', (event) => {
  router.setState();
});
