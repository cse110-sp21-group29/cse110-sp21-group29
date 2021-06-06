document.addEventListener('DOMContentLoaded', () => {
  const url = './monthlyLog.json'; // SET URL
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      console.log(month);

      const monthlyLog = document.createElement('monthly-log');
      console.log(monthlyLog.content);

      monthlyLog.content = month;

      document.body.appendChild(monthlyLog);
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
