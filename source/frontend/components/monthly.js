/**
 * This is a re-usable custom web component that displays a month with separations
 * at each week.
 * @author Anahita Afshari <aafshari@ucsd.edu>
 * @date 2021-06-02
 * @class MonthlyLog
 * @extends {HTMLElement}
 */
class MonthlyLog extends HTMLElement {
  /* eslint-disable */
  constructor() {
    super();
  }
  /* eslint-enable */

  get content() {
    return document.querySelector(".month");
  }

  set content(month) {
    this.innerHTML = `
          <style>
            @font-face {
              font-family: headerText;
              src: url(../styles/bright-sunshine.ttf);
            }

            img {
              margin-left: auto;
              margin-right: auto;
              display: block;
              width: 400px;
              height: 250px;
            }

            body {
              background-image: url("../monthlyLog/bg.png");
            }

            .monthName {
              font-size: 80pt;
              font-family: headerText;
              color: #2C5684;
              position: absolute;
              top: 7%;
              left: 53%;
            }

            .monthLogDes {
              display: flex;
              border: #95C9FF 3px dotted;
              align-items: center;
              justify-content: center;
              padding-top: 10px;
              padding-bottom: 10px;
              margin-right: 20px;
            }

          </style>
          <header class="monthName">June</header>
          <img src="../monthlyLog/paint.png">
          `;
    const logEntry = document.createElement("log-entries");
    logEntry.editable = month.editable;
    logEntry.entries = month.entries;
    logEntry.setAttribute("class", "monthLogDes");
    this.appendChild(logEntry);
    this.makeList(month);
  }

  /**
   * Make a list of the days with appropriate week lines
   * @author Anahita Afshari <aafshari@ucsd.edu>
   * @date 2021-05-30
   */
  makeList(month) {
    /* document.getElementById('monthName').innerHTML = month.name;
    const d = new Date();
    const y = d.getFullYear();
    document.getElementById('yearName').innerHTML = y; */
    const listContainer = document.createElement("div");
    const listElement = document.createElement("ul");
    listElement.classList.add("list-group");

    let listItem;
    let listDes;
    let i;

    this.appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < month.daysOfMonth.length; i++) {
      const day = month.daysOfMonth[i];
      if (day.dayOfWeek === "Sun") {
        const elem = document.createElement("hr");
        listElement.appendChild(elem);
      }

      listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "border-0", "py-0");
      listItem.innerHTML = day.dayNum + " " + day.dayOfWeek + " ";

      listDes = document.createElement("li");
      listDes.setAttribute("id", "description");
      listDes.classList.add("list-group-item", "border-0", "py-0");
      listDes.contentEditable = month.editable;
      listDes.innerText = day.description;
      listDes.style.color = "black";
      listElement.appendChild(listItem);
      listElement.appendChild(listDes);
    }

    let n;
    const list = listElement.querySelectorAll('li[ id = "description"]');

    if (month.editable) {
      listElement.addEventListener("input", (event) => {
        for (n = 0; n < month.daysOfMonth.length; n++) {
          month.daysOfMonth[n].description = list[n].innerText.trim();
          console.log(month.daysOfMonth[n].description);
        }
      });
    }
  }
}
customElements.define("monthly-log", MonthlyLog);
