export const router = {};
const dailyLogUrl = 'sendDaily/';
const dailySaveUrl = 'receiveDaily/';
const futureLogUrl = 'sendFuture/';
const futureSaveUrl = 'receiveFuture/';
const monthlyLogUrl = 'sendMonthly/';
const monthlySaveUrl = 'receiveMonthly/';
const dailyLog = document.getElementById('dailyLogDiv');
const monthlyLog = document.getElementById('monthlyLogDiv');
const futureLog = document.getElementById('futureLogDiv');
let futureInterval;
let dailyInterval;
let monthlyInterval;
let dailyLogLoaded = false;
// const main = document.querySelector('main');
router.setState = function () {
  if (location.hash === '#/dailyLog') {
    clearMonthly();
    clearFuture();
    if (!dailyLogLoaded) {
      router.loadDailyLog(true, false);
      dailyLogLoaded = true;
    }
    router.setDailyLogHome();
    router.saveDailyLog();
    return;
  }
  if (location.hash.substring(0, 10) === '#/dailyLog') {
    clearMonthly();
    clearFuture();
    if (!dailyLogLoaded) {
      router.loadDailyLog(true, true);
      dailyLogLoaded = true;
    } else {
      router.setDay();
    }
    router.saveDailyLog();
    return;
  }
  if (location.hash === '#/monthlyLog') {
    clearDaily();
    clearFuture();
    dailyLogLoaded = false;
    router.loadDailyLog(false, false);
    console.log('gets here');
    router.setMonthlyLog();
    router.saveMonthlyLog();
    return;
  }
  if (location.hash === '#/futureLog') {
    clearDaily();
    clearMonthly();
    dailyLogLoaded = false;
    router.loadDailyLog(false, false);
    router.setFutureLog();
    router.saveFutureLog();
    return;
  }

  if (location.hash === '#' || location.hash === '#/' || location.hash === '') {
    clearDaily();
    clearMonthly();
    clearFuture();
    location.hash = '#/dailyLog';
    return;
  }
  router.setError();
};

router.loadDailyLog = function (render, setDay) {
  const sideBar = document.createElement('side-bar');
  sideBar.classList.add('col-2', 'h-100', 'position-fixed');
  const nav = document.body.querySelector('nav');
  nav.innerHTML = '';
  nav.appendChild(sideBar);
  document.body.className = 'dailyLog';
  dailyLog.innerHTML = '';
  fetch(dailyLogUrl, {
    method: 'GET',
    headers: {
      type: 'daily'
    }
  })
    .then(response => response.json())
    .then(days => {
      window.days = days;
      sideBar.content = days;
      if (render) router.renderDailyLog(days, setDay);
    });
};

router.renderDailyLog = function (days, setDay) {
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
  if (setDay) router.setDay();
};

router.saveDailyLog = function () {
  dailyInterval = setInterval(
    function () {
      fetch(dailySaveUrl, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
          type: 'daily'
        },
        body: JSON.stringify(window.days)
      });
    }, 1000
  );
};

function clearDaily () {
  if (typeof dailyInterval !== 'undefined') {
    clearInterval(dailyInterval);
  }
}

function getCookie (name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].replace(/\s/g, '');
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

router.setDailyLogHome = function () {
  window.scrollTo(0, 0);
  document.activeElement.blur();
};

router.setDay = function () {
  const day = document.getElementById(location.hash.substring(1));
  if (!day) {
    location.hash = '#/dailyLog';
    return;
  }
  if (document.activeElement !== day) {
    day.focus();
    day.classList.add('focus');
  }
};

router.setFutureLog = function () {
  document.body.className = 'futureLog';
  futureLog.innerHTML = '';
  let counter = 0;
  fetch(futureLogUrl, {
    method: 'GET',
    headers: {
      type: 'future'
    }
  })
    .then(response => response.json())
    .then(month => {
      month.forEach((months) => {
        window.futureMonths = month;
        if (counter < 6) {
          const changeDate = document.createElement('future-logs');
          changeDate.content = months;
          futureLog.append(changeDate);
          counter++;
        }
      });
    });
};

router.saveFutureLog = function () {
  futureInterval = setInterval(
    function () {
      console.log('saves future');
      fetch(futureSaveUrl, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
          type: 'futureLog'
        },
        body: JSON.stringify(window.futureMonths)
      });
    }, 1000
  );
};

function clearFuture () {
  if (typeof futureInterval !== 'undefined') {
    clearInterval(futureInterval);
  }
}

router.setMonthlyLog = function () {
  document.body.className = 'monthlyLog';
  monthlyLog.innerHTML = '';
  fetch(monthlyLogUrl, {
    method: 'GET',
    headers: {
      type: 'monthly'
    }
  })
    .then((response) => response.json())
    .then((months) => {
      window.months = months;
      const monthElem = document.createElement('monthly-log');
      console.dir(monthElem);
      monthElem.content = months[0];
      monthlyLog.appendChild(monthElem);
    });
};

router.saveMonthlyLog = function () {
  monthlyInterval = setInterval(
    function () {
      fetch(monthlySaveUrl, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
          type: 'monthly'
        },
        body: JSON.stringify(window.months)
      });
    }, 1000
  );
};

function clearMonthly () {
  if (typeof monthlyInterval !== 'undefined') {
    clearInterval(monthlyInterval);
  }
}

router.setError = function () {
  document.body.className = 'error';
};
