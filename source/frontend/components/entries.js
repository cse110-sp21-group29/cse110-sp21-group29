/**
 *
 *
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-13
 * @class LogEntries
 * @extends {HTMLElement}
 */
class LogEntries extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
          <link rel="stylesheet" href="../styles/bootstrap.css">
          <ul class=""list-group"></ul>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // this.classList.add('card');
  }

  /**
 *
 *
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-13
 * @memberof LogEntries
 */
  get content () {
    return this.getAttribute('content');
  }

  /**
 *
 *
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-13
 * @memberof LogEntries
 */
  set content (content) {
    const list = this.shadowRoot.querySelector('ul');
    content.forEach((entry) => {
      if (entry.type === 'note') {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.classList.add('border-0');
        item.innerText = '– ' + entry.text;
        list.appendChild(item);
      }
    });
  }
}

customElements.define('log-entries', LogEntries);
