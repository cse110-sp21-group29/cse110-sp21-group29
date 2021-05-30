export const router = {};
// const main = document.querySelector('main');
router.setState = function () {
  if (location.hash === '#/dailyLog') {
    router.setDailyLog();
    router.setDailyLogHome();
    return;
  }
  if (location.hash.substring(0, 10) === '#/dailyLog') {
    router.setDailyLog();
    router.setDay();
    return;
  }
  if (location.hash === '#/futureLog') {
    router.setFutureLog();
    return;
  }
  location.hash = '#/dailyLog';
};

router.setDailyLog = function () {
  document.body.className = 'dailyLog';
  const url = './dailyLog.json'; // SET URL
  const dailyLog = document.getElementById('dailyLogDiv');
  fetch(url)
    .then(response => response.json())
    .then(days => {
      days.forEach((day) => {
        const newDay = document.createElement('section');
        newDay.tabIndex = 0;
        newDay.id = '/dailyLog/' + day.date;
        newDay.classList.add('card', 'w-50', 'mx-auto', 'my-3', 'border-3');
        const date = new Date(day.date);
        const dateTitle = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        newDay.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
          day.date + '">' + dateTitle + '</time></h2></div>';
        dailyLog.appendChild(newDay);
        const entries = document.createElement('log-entries');
        entries.parentId = newDay.id;
        entries.editable = day.editable;
        entries.entries = day.entries;
        newDay.querySelector('.card-body').appendChild(entries);
        newDay.addEventListener('focus', event => {
          location.hash = newDay.id;
          newDay.classList.add('focused');
        });
        newDay.addEventListener('blur', event => {
          newDay.classList.remove('focused');
        });
      });
    });
};

router.setDailyLogHome = function () {
  window.scrollTo(0, 0);
  document.activeElement.blur();
};

router.setDay = function () {
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

router.setFutureLog = function () {
  document.body.className = 'futureLog';
  const futureLogUrl = './futureLog.json'; // SET URL
  const futureLog = document.getElementById('futureLogDiv');
  let counter = 0;
  fetch(futureLogUrl)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      month.forEach((monthz) => {
        if (counter < 6) {
          // console.log(monthz);

          // const newMonth = document.createElement('div');
          // newMonth.classList.add('item');
          // newMonth.innerHTML = ' <h2 class="month" >' + monthz.Month + '</h2><div class="entries"></div>';

          // console.log(newMonth);
          const changeDate = document.createElement('future-logs');

          // changeDate.content = newMonth;
          // console.log(monthz.Month);
          changeDate.content = monthz;
          // console.log(changeDate.querySelector('.entries'));

          // changeDate.querySelector('.item').innerHTML +=

          // console.log(newMonth.querySelector('.item'));

          futureLog.append(changeDate);
          counter++;
        }
      });
    });
};
