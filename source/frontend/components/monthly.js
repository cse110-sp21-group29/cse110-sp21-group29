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
    <link rel="stylesheet" href="../styles/bootstrap.css">
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
         margin-top: 100px;
      }

      hr {
         margin-right: 30px;
      }

      body {
         height: auto;
         background-size: cover;
      }

    </style>

    <div class="month">
      <ul class="list-group">
        <li class="list-group-item">
        </li>
      </ul>
    </div>


    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get content () {
    return document.querySelector('.month');
  }

  set content (month) {
    const logEntry = document.createElement('log-entries');
    logEntry.editable = month.editable;
    logEntry.entry = month.entry;
    this.appendChild(logEntry);
    this.makeList(month);
  }

  /**
    * Make a list of the days with appropriate week lines
    * @author Anahita Afshari <aafshari@ucsd.edu>
    * @date 2021-05-30
    */
  makeList (month) {
    document.getElementById('monthName').innerHTML = month.name;
    const d = new Date();
    const y = d.getFullYear();
    document.getElementById('yearName').innerHTML = y;
    const listContainer = document.createElement('div');

    const listElement = document.createElement('ul');
    listElement.classList.add('list-group');

    let listItem;
    let listDes;
    let i;

    document.getElementsByTagName('body')[0].appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < month.daysOfMonth.length; i++) {
      const day = month.daysOfMonth[i];
      if (day.Week === 'Sun') {
        const elem = document.createElement('hr');
        listElement.appendChild(elem);
      }

      listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'border-0', 'py-0');
      listItem.innerHTML = day.Day + ' ' + day.Week + ' ';

      listDes = document.createElement('li');
      listDes.classList.add('list-group-item', 'border-0', 'py-0');
      listDes.contentEditable = true;
      listDes.innerHTML = day.Description;
      listElement.appendChild(listItem);
      listElement.appendChild(listDes);
    }
  }
}
customElements.define('monthly-log', MonthlyLog);
