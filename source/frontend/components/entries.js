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

  get content () {
    return this.getAttribute('content');
  }

  
  set content (content) {
    content.forEach((entry) => {

    });
  }
}

customElements.define('entries', Entries);
