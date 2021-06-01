const sidebar = document.querySelector("[class='sidebar']");
// const content = document.querySelector("[class='content']");
// const button=document.querySelector("button");
// button.addEventListener('click',()=> {
//     sidebar.classList.toggle("sidebar_hide");
//     content.classList.toggle("content_full");
// });
const search = document.createElement('input');
search.setAttribute('type', 'text');
search.setAttribute('placeholder', 'Search...');
sidebar.appendChild(search);
const dailyDiv = document.createElement('div');
const monthlyDiv = document.createElement('div');
const futureDiv = document.createElement('div');
dailyDiv.classList.add('dateMenu');
monthlyDiv.classList.add('monthMenu');
futureDiv.classList.add('futureMenu');
dailyDiv.innerHTML = 'Daily Log';
monthlyDiv.innerHTML = 'Monthly Log';
futureDiv.innerHTML = 'Future Log';
const dateList = document.createElement('ul');
document.addEventListener('DOMContentLoaded', () => {
  const url = './test.json';
  fetch(url)
    .then(response => response.json())
    .then(days => {
      days.forEach((day) => {
        const time = document.createElement('li');
        time.innerHTML = day.date;
        dateList.appendChild(time);
      });
      dailyDiv.appendChild(dateList);
      sidebar.appendChild(futureDiv);
      sidebar.appendChild(monthlyDiv);
      sidebar.appendChild(dailyDiv);
    })
    .catch(error => {
      console.log(`%cresult of fetch is an error: \n"${error}"`, 'color: red');
    });
});
