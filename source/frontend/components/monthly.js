/* global */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();
const n = months[d.getMonth()];
const y = d.getFullYear();
document.getElementById('monthName').innerHTML = n;
document.getElementById('yearName').innerHTML = y;
const allDays = getDaysInMonth(d.getMonth(), y);

/**
 * Create month with appropriate amount of days
 * @author Anahita Afshari <aafshari@ucsd.edu>
 * @date 2021-05-30
 * @param month - the month it is
 * @param year - the year it is
 * @return days - how many days are in the month
 */
function getDaysInMonth (month, year) {
  const date = new Date(year, month, 1);
  const days = [];
  const dNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  while (date.getMonth() === month) {
    const temp = new Date(date);
    const tempDayName = dNames[temp.getDay()];
    const tempDayNum = temp.getDate();
    const tempStr = String(tempDayNum) + '         ' + String(tempDayName);
    days.push(tempStr);
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/**
 * Make a list of the days with appropriate week lines
 * @author Anahita Afshari <aafshari@ucsd.edu>
 * @date 2021-05-30
 */
function makeList () {
  const listData = allDays;
  const listContainer = document.createElement('div');
  const listElement = document.createElement('ul');
  const numberOfListItems = listData.length;
  let listItem;
  let i;

  document.getElementsByTagName('body')[0].appendChild(listContainer);
  listContainer.appendChild(listElement);

  for (i = 0; i < numberOfListItems; i++) {
    const count = listData[i];
    const weekCount = count.slice(count.length - 3);
    console.log(weekCount);

    if (weekCount === 'Sun') {
      const elem = document.createElement('hr');
      listElement.appendChild(elem);
      console.log(weekCount);
    }

    listItem = document.createElement('li');
    listItem.innerHTML = listData[i];
    listElement.appendChild(listItem);
  }
}

makeList();
