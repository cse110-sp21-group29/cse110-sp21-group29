document.addEventListener('DOMContentLoaded', () => {
  const url = './hopefully.json'; // SET URL
  const main = document.querySelector('main');
  let counter = 0;
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      month.forEach((monthz) => {
        if (counter < 6) {
          console.log(monthz);

          // const newMonth = document.createElement('div');
          // newMonth.classList.add('item');
          // newMonth.innerHTML = ' <h2 class="month" >' + monthz.Month + '</h2><div class="entries"></div>';

          // console.log(newMonth);
          const changeDate = document.createElement('future-logs');

          // changeDate.content = newMonth;
          console.log(monthz.Month);
          changeDate.content = monthz;
          console.log(changeDate.querySelector('.entries'));

          // changeDate.querySelector('.item').innerHTML +=

          // console.log(newMonth.querySelector('.item'));

          main.append(changeDate);
          counter++;
        }
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
