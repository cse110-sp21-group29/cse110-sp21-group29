document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  const dailyLog = document.querySelector('daily-log');
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(days => {
      dailyLog.days = days;
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
