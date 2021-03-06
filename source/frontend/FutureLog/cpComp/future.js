class FutureLogs extends HTMLElement {
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
    
    
    h1{
        text-align: center;
        font-family: literata;
        font-size: 35px;
        color: #2C5684;
    
    }
    
    body {
        background-color: white;
    }
    
    .month {
        color: #2C5684;
        word-break: break-all;
    
    
    }
    
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, minmax(200px, auto));
        grid-gap: 0;
        border-top: solid black;
    
    
    
    }
    
    .item {
        color: #2C5684;
        /*border-bottom: 3px solid black;*/
        /*border-top: 1px solid black;*/
        word-break: break-all;
    
       /* padding: 30px;*/
    }
    
    .item:nth-child(odd){
        border-right: 3px solid black;
        background: red;
    }

    </style>
    <div class="item">
        <h2 class="month"> YOOOOO </h2>
        <log-entries>
        </log-entries>
    </div>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get content () {
    return this.getAttribute('.item');
  }

  set content (item) {
    this.shadowRoot.querySelector('.month').textContent = item.Month;
    const test = document.createElement('log-entries');
    test.content = item.entries;
    this.shadowRoot.appendChild(test);
  }
}

customElements.define('future-logs', FutureLogs);
