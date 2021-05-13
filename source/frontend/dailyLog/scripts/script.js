document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(days => {
      days.forEach((entry) => {
        const newDay = document.createElement('journal-entry');

        newDay.entry = entry;
        document.body.appendChild(newDay);
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
