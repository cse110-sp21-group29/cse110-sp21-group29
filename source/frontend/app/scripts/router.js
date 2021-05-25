export const router = {};
router.setState = function () {
  if (location.hash === '#/dailyLog') {
    router.setDailyLogHome();
    return;
  }
  if (location.hash.substring(0, 10) === '#/dailyLog') {
    router.setDailyLog();
    return;
  }
  location.hash = '#/dailyLog';
};

router.setDailyLogHome = function () {
  window.scrollTo(0, 0);
  document.activeElement.blur();
};

router.setDailyLog = function () {
  const day = document.getElementById(location.hash.substring(1));
  if (!day) {
    location.hash = '#/dailyLog';
    router.setDailyLogHome();
  }
  if (document.activeElement !== day) {
    day.focus();
    day.classList.add('focus');
  }
};
