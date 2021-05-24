document.addEventListener('DOMContentLoaded', () => {
  const url = './hopefully.json'; // SET URL
  const main = document.querySelector('main');
  let counter = 0;
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      month.forEach((monthz) => {
        console.log(monthz);
        if (counter < 6) {
          const newMonth = document.createElement('div');
          newMonth.classList.add('item');
          newMonth.innerHTML = '<div class="test"> <h2 class="month" >' + monthz.Month + '</h2></div>';
          // main.append(newMonth);

          const entries = document.createElement('log-entries');
          entries.content = monthz.entries;

          // console.log(entries);
          newMonth.querySelector('.test').appendChild(entries);

          main.append(newMonth);
          counter++;
        }
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
