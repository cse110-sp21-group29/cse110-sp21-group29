document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json'; // SET URL
  const main = document.querySelector('main');
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(days => {
      const sideBar=document.createElement('side-bar');

      days.forEach((day) => {
        const newDay = document.createElement('section');
        newDay.setAttribute('id', day.date);
        newDay.classList.add('card', 'w-50', 'mx-auto', 'my-3', 'border-3');
        const date = new Date(day.date);
        const dateTitle = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        newDay.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
        day.date + '">' + dateTitle + '</time></h2></div>';
        const entries = document.createElement('log-entries');
        entries.content = day.entries;
        newDay.querySelector('.card-body').appendChild(entries);
        main.appendChild(newDay);
        sideBar.content=day.entries;
      });
      main.appendChild(sideBar);
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
