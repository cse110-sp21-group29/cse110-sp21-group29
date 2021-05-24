let dailyLog;
let sideBar;
document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  dailyLog = document.getElementById('dailyLog');
  sideBar = document.querySelector('side-bar');
  fetch(url)
    .then(response => response.json())
    .then(days => {
      days.forEach((day) => {
        const newDay = document.createElement('section');
        newDay.tabIndex = 0;
        newDay.id = 'dailyLog:' + day.date;
        newDay.classList.add('card', 'w-50', 'mx-auto', 'my-3', 'border-3');
        const date = new Date(day.date);
        const dateTitle = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        newDay.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
          day.date + '">' + dateTitle + '</time></h2></div>';
        const entries = document.createElement('log-entries');
        entries.editable = day.editable;
        entries.entries = day.entries;
        newDay.querySelector('.card-body').appendChild(entries);
        dailyLog.appendChild(newDay);
        newDay.addEventListener('focus', event => {
          location.hash = newDay.id;
          newDay.classList.add('focused');
        });
        newDay.addEventListener('blur', event => {
          newDay.classList.remove('focused');
        });
        sideBar.content = day.entries;
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});

window.addEventListener('hashchange', event => {
  const elem = document.getElementById(location.hash.substring(1));
  if (elem && document.activeElement !== elem) {
    elem.focus();
    console.log(location.hash);
    elem.classList.add('focus');
  }
});
