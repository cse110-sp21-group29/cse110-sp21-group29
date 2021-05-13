class Entries extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
          <link rel="stylesheet" href="../styles/bootstrap.css">
          <ul class=""list-group"></ul>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const list = this.shadowRoot.querySelector('ul');
    // this.classList.add('card');
  }

  /**
 *
 *
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021/05/13
 * @memberof Entries
 */
  get content () {
    return this.getAttribute('content');
  }

  /**
 *
 *
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021/05/13
 * @memberof Entries
 */
  set content (content) {
    content.forEach((entry) => {

    });
  }
}

customElements.define('entries', Entries);
