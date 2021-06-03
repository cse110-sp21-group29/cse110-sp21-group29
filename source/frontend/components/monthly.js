/**
 *
 * This is a re-usable custom web component that displays a month with separations at each week.
 * @author Anahita Afshari <aafshari@ucsd.edu>
 * @date 2021-06-02
 * @class MonthlyLog
 * @extends {HTMLElement}
 */
class MonthlyLog extends HTMLElement {
  constructor () {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
    <style> 
      @font-face {
         font-family: headerText;
         src: url(bright-sunshine.ttf);
      }

      @font-face {
         font-family: literata;
         src: url(literata.ttf);
      }

      body {
         background-color: white;
      }

      .header-container {
         position: relative;
         text-align: center;
         color: white;
      }

      header {
         font-size: 80pt;
         font-family: headerText;
         text-align: center;
         color: #2C5684;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -85%);
      }

      img {
         width: 400px;
         height: 250px;
      }

      h1 {
         font-family: literata;
         text-align: center;
         transform: translate(-15px, -130px);
         font-size: 35px;
      }

      ul {
         list-style-type: none;
      }

      li {
         font-family: literata;
         font-size: 20px;
         color: #2C5684;
      }

      .position-relative {
         margin-top: -100px;
      }

      hr {
         margin-right: 30px;
      }

      body {
         height: auto;
         background-size: cover;
      }

    </style>
    <div class="header-container">
      <img src="paint.png">
      <header id="monthName"></header>
      <h1 id="yearName"></h1>
   </div>

   <body background="bg.png">
      <main class="position-relative">
      </main>
      <script src="../components/entries.js" type="module"></script>
      <script src="./scripts/script.js" type="module"></script>
      
   </body>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

   /**
    * Create month with appropriate amount of days
    * @author Anahita Afshari <aafshari@ucsd.edu>
    * @date 2021-05-30
    * @param month - the month it is
    * @param year - the year it is
    * @return days - how many days are in the month
    */
   getDaysInMonth (month, year) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const d = new Date();
      const n = months[d.getMonth()];
      const y = d.getFullYear();
      document.getElementById('monthName').innerHTML = n;
      document.getElementById('yearName').innerHTML = y;
      const allDays = getDaysInMonth(d.getMonth(), y);
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
   makeList () {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const d = new Date();
      const n = months[d.getMonth()];
      const y = d.getFullYear();
      document.getElementById('monthName').innerHTML = n;
      document.getElementById('yearName').innerHTML = y;
      const allDays = getDaysInMonth(d.getMonth(), y);
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
}

customElements.define('monthly-log', MonthlyLog);
