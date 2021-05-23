const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dateObj = new Date();
const currMonth = dateObj.getMonth();
const currMonth1 = currMonth + 1;
const updatedMonth1 = months[checkMonths(currMonth1)];
const currMonth2 = currMonth1 + 1;
const updatedMonth2 = months[checkMonths(currMonth2)];
const currMonth3 = currMonth2 + 1;
const updatedMonth3 = months[checkMonths(currMonth3)];
const currMonth4 = currMonth3 + 1;
const updatedMonth4 = months[checkMonths(currMonth4)];
const currMonth5 = currMonth4 + 1;
const updatedMonth5 = months[checkMonths(currMonth5)];
const currMonth6 = currMonth5 + 1;
const updatedMonth6 = months[checkMonths(currMonth6)];

<<<<<<< HEAD
<<<<<<< HEAD
document.getElementById('month1').innerHTML = updatedMonth1;
=======
document.getElementById("month1").innerHTML = updatedMonth1;
>>>>>>> Future Log
=======
document.getElementById('month1').innerHTML = updatedMonth1;
>>>>>>> "fixed linting"
document.getElementById('month2').innerHTML = updatedMonth2;
document.getElementById('month3').innerHTML = updatedMonth3;
document.getElementById('month4').innerHTML = updatedMonth4;
document.getElementById('month5').innerHTML = updatedMonth5;
document.getElementById('month6').innerHTML = updatedMonth6;

// const currYear = dateObj.getUTCFullYear();
// console.log(currYear);

function checkMonths (month) {
  if (month >= 12) {
    month = 0;
  }
  const updatedMonth = month;
  return updatedMonth;
}

document.addEventListener('DOMContentLoaded', () => {
  const url = './hopefully.json'; // SET URL
  const main = document.querySelector('main');
  fetch(url)
    .then(response => response.json()) /* FILL IN RESPONSE HANDLING HERE */
    .then(month => {
      month.forEach((monthz) => {
        const newMonth = document.createElement('section');
        newMonth.setAttribute('id', monthz.Month);
        const entries = document.createElement('log-entries');
        entries.content = monthz.entries;
        // let wrapper = document.createElement('div');
        // let inside = document.createElement('')

        document.querySelector('.item').appendChild(entries);
        main.append(newMonth);
        console.log(newMonth);
        /*
          newMonth.classList.add('card', 'w-50', 'mx-auto', 'my-3', 'border-3');
         // const date = new Date(day.date);
          const newM = new Month(monthz.month);
          const dateTitle = newM.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
          newMonth.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
          monthz.Monthz + '">' + dateTitle + '</time></h2></div>';
          const entries = document.createElement('log-entries');
          entries.content = monthz.entries;
          newMonth.querySelector('.card-body').appendChild(entries);
          main.appendChild(newDay);
          */
      });
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
