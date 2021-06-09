/**
 * This is a resuable web component that displays the future log
 *
 * @author Dario Aburto  <daaburto@ucsd.edu>
 * @date 2021-06-08
 * @class FutureLogs
 * @extends {HTMLElement}
 */
class FutureLogs extends HTMLElement {
  /* eslint-disable */
  constructor () {
    super();
    document.title = 'Future Log';
  }
  /* eslint-enable */

  get content () {
    return this.getAttribute('.item');
  }

  set content (item) {
    this.innerHTML = `
    <div class="item">
        <h2 class="month"> YOOOOO </h2>
        <log-entries>
        </log-entries>
    </div>
    <style>
        @font-face {
          font-family: headerText;
          src: url(../styles/bright-sunshine.ttf);
        }   

        .month {
          font-family: 'Satisfy', cursive;
          font-size: 60px;
          margin-bottom: 10px;
        }

        future-logs .item {
          border-bottom: 2px solid #2C5684;
        } 

        future-logs .item .month {
          margin-top: 10px;
          margin-bottom: 20px;
        }

        future-logs:nth-child(odd) {
          border-right: 2px solid #2C5684;
        }

        future-logs {
          border-bottom: 2px solid #2C5684;
        }

        .container {
          border-top: 3px solid white;
        }
    </style>
    `;
    this.querySelector('.month').textContent = item.Month;
    const test = document.createElement('log-entries');
    test.setAttribute('class', 'logEntries');
    test.editable = item.editable;
    test.entries = item.entries;
    this.appendChild(test);
  }
}

customElements.define('future-logs', FutureLogs);
