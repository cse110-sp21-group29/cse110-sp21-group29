
class FutureLogs extends HTMLElement {
  /* eslint-disable */
  constructor () {
    super();
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
    </div>`;
    this.querySelector('.month').textContent = item.Month;
    const test = document.createElement('log-entries');
    test.editable = item.editable;
    test.entries = item.entries;
    this.appendChild(test);
  }
}

customElements.define('future-logs', FutureLogs);
