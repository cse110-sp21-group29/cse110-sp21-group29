document.addEventListener('DOMContentLoaded', () => {
  const url = './monthlyLog.json'; // SET URL
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      const monthlyLog = document.createElement('monthly-log');

      monthlyLog.content = month;

      document.body.appendChild(monthlyLog);
      window.month = month;
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
