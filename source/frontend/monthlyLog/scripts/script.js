// Get Month 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
const n = months[d.getMonth()];
const y = d.getFullYear();
document.getElementById("monthName").innerHTML = n;
document.getElementById("yearName").innerHTML = y;

// Get Days
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  const dNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  while (date.getMonth() === month) {
    var temp = new Date(date);
    var tempDayName = dNames[temp.getDay()];
    var tempDayNum = temp.getDate();
    var tempStr = String(tempDayNum) + "         " + String(tempDayName);
    days.push(tempStr);
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const allDays = getDaysInMonth(d.getMonth(), y);

function makeList() {
  let listData = allDays,
    listContainer = document.createElement('div'),
    listElement = document.createElement('ul'),
    numberOfListItems = listData.length,
    listItem,
    i;

  document.getElementsByTagName('body')[0].appendChild(listContainer);
  listContainer.appendChild(listElement);

  for (i = 0; i < numberOfListItems; i++) {
    var count = listData[i];
    var weekCount = count.slice(count.length - 3);
    console.log(weekCount);

    if (weekCount == "Sun") {
      var elem = document.createElement("hr");
      listElement.appendChild(elem);
      console.log(weekCount);
    }

    listItem = document.createElement('li');
    listItem.innerHTML = listData[i];
    listElement.appendChild(listItem);
  }
}

makeList();
