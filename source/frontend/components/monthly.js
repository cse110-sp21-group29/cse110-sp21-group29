/**
 *
 * This is a re-usable custom web component that displays a month with separations at each week.
 * @author Anahita Afshari <aafshari@ucsd.edu>
 * @date 2021-06-02
 * @class MonthlyLog
 * @extends {HTMLElement}
 */
class MonthlyLog extends HTMLElement {
  /* eslint-disable */
  constructor () {
    super();
  }
  /* eslint-disable */

  get content () {
    return document.querySelector('.month');
  }

  set content (month) {
    const logEntry = document.createElement('log-entries');
    logEntry.editable = month.editable;
    logEntry.entries = month.entries;
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

    this.appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < month.daysOfMonth.length; i++) {
      const day = month.daysOfMonth[i];
      if (day.Week === 'Sun') {
        const elem = document.createElement('hr');
        listElement.appendChild(elem);
      }

      listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'border-0', 'py-0');
      listItem.innerHTML = day.dayNum + ' ' + day.dayOfWeek + ' ';

      listDes = document.createElement('li');
      listDes.classList.add('list-group-item', 'border-0', 'py-0');
      listDes.contentEditable = true;
      listDes.innerHTML = day.description;
      listElement.appendChild(listItem);
      listElement.appendChild(listDes);
    }
  }
}
customElements.define('monthly-log', MonthlyLog);
