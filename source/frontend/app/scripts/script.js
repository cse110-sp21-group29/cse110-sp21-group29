let dailyLog;
document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  dailyLog = document.querySelector('daily-log');
  fetch(url)
    .then(response => response.json())
    .then(days => {
      dailyLog.days = days;
      console.log(days);
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});

window.addEventListener('hashchange', event => {
  const elem = dailyLog.shadowRoot.querySelector(location.hash);
  if (elem && dailyLog.shadowRoot.activeElement !== elem) {
    elem.focus();
    elem.classList.add('focus');
  }
});
