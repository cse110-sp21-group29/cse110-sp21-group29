document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  const main = document.querySelector('main');
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(days => {
      days.forEach((day) => {
        /*  const newDay = document.createElement('day-log');
        newDay.content = content;
        newDay.classList.add('card');
        document.body.appendChild(newDay); */
        const newDay = document.createElement('section');
        newDay.classList.add('card');
        const date = new Date(day.date);
        const dateTitle = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        newDay.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' + day.date + '">' + dateTitle + '</time></h2></div>';
        main.appendChild(newDay);
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
