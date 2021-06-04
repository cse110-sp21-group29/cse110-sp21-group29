export const router = {};
const dailyLogUrl = 'send/';
const dailySaveUrl = 'receive/'
const futureLogUrl = './futureLog.json';
const dailyLog = document.getElementById('dailyLogDiv');
let dailyLogLoaded = false;
// const main = document.querySelector('main');
router.setState = function () {
  if (location.hash === '#/dailyLog') {
    router.loadDailyLog();
    router.setDailyLogHome();
    router.saveDailyLog();
    return;
  }
  if (location.hash.substring(0, 10) === '#/dailyLog') {
    router.loadDailyLog();
    router.setDay();
    router.saveDailyLog();
    return;
  }
  if (location.hash === '#/futureLog') {
    dailyLogLoaded = false;
    router.setFutureLog();
    return;
  }

  if (location.hash === '#' || location.hash === '#/' || location.hash === '') {
    location.hash = '#/dailyLog';
  }
  router.setError();
};

router.loadDailyLog = function () {
  if (dailyLogLoaded) return;
  dailyLogLoaded = true;
  document.body.className = 'dailyLog';
  dailyLog.innerHTML = '';
  fetch(dailyLogUrl, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(days => {
      window.days = days;
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

router.saveDailyLog = function () {
  setInterval(
    function(){
      fetch(dailySaveUrl, {
        method: 'POST',
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.days)
      });
    }, 5000
  );
};

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].replace(/\s/g, "");;
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
  const futureLog = document.getElementById('futureLogDiv');
  let counter = 0;
  fetch(futureLogUrl)
    .then(response => response.json())
    .then(month => {
      month.forEach((monthz) => {
        if (counter < 6) {
          const changeDate = document.createElement('future-logs');
          changeDate.content = monthz;
          futureLog.append(changeDate);
          counter++;
        }
      });
    });
};

router.setError = function () {
  document.body.className = 'error';
};
