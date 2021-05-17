/**
 * The daily-log web component
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-16
 * @class DailyLog
 * @extends {HTMLElement}
 */
class DailyLog extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
              <link rel="stylesheet" href="../styles/bootstrap.css">
              <style>
                section.focused {
                    /*outline: 5px auto -webkit-focus-ring-color;*/
                }
              </style>
          `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get days () {
    return this.getAttribute('days');
  }

  set days (days) {
    days.forEach((day) => {
      const newDay = document.createElement('section');
      newDay.tabIndex = 0;
      newDay.id = 'dailyLog:' + day.date;
      newDay.classList.add('card', 'w-50', 'mx-auto', 'my-3', 'border-3');
      const date = new Date(day.date);
      const dateTitle = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
      newDay.innerHTML = '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
        day.date + '">' + dateTitle + '</time></h2></div>';
      const entries = document.createElement('log-entries');
      entries.entries = day.entries;
      newDay.querySelector('.card-body').appendChild(entries);
      this.shadowRoot.appendChild(newDay);
      newDay.addEventListener('focus', event => {
        location.hash = newDay.id;
        newDay.scrollIntoView();
        newDay.classList.add('focused');
      });
      newDay.addEventListener('blur', event => {
        newDay.classList.remove('focused');
      });
    });
  }
}
customElements.define('daily-log', DailyLog);
