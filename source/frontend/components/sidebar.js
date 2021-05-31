/**
 *
 * This is a re-usable custom web component that setup sidebar, enables search bar, and enable navigating to note on a certain date
 * @author Dadian Zhu <dazhu@ucsd.edu>
 * @date 2021-05-30
 * @export
 * @class SideBar
 * @extends {HTMLElement}
 */
export class SideBar extends HTMLElement {
  constructor () {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
            <style>
            
            a{
              text-align:center;
              text-decoration: none;
              display:block;
              color: #e1ffff;
              font-family: "Comic Sans MS", "Comic Sans", cursive;
              font-size: 18px;
              padding: 10px 25px;
            }

            a:hover {
              text-decoration: underline;
              background-color: #0076ad;
            }

            input{
              width:90%;
              height:20px;
              padding-left:10px;
            }
            .sidebar {
                height: 100%;
                background-color: #22282c;
                position:relative;
                padding-top: 40px;
                overflow-y: scroll;
            }
            .sidebar_hide{
                width:0%;
            }
            .futureLog{
              
              display:block;
            }
            .monthlyLog{
              
              display:block;
            }
            .dailyLog{
              
              display:block;
            }
            h3{
              color: #e1ffff; 
              font-family: "Comic Sans MS", "Comic Sans", cursive;
              font-weight: bold;
            }
            h3:hover {
              text-decoration: underline;
              background-color: #0076ad;
            }
            </style> 
            <section class="sidebar">
                
                <input id="searchbar" type="text" placeholder="Search..">
                <h3 id='future'>Future Log</h3>
                <section class="futureLog"></section>
                <h3 id='monthly'>Monthly Log</h3>
                <section class="monthlyLog"></section> 
                <h3 id='daily'>Daily Log</h3>
                <section class="dailyLog"></section>
             </section>
            
            `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
 *
 *
 * @author Dadian Zhu <dazhu@ucsd.edu>
 * @date 2021-05-30
 * @memberof SideBar
 */
  get content () {
    return this.getAttribute('content');
  }

  /* const dailySection = this.shadowRoot.querySelector("[class='dailyLog']");
  dailySection.addEventListener('click', function () {
  this.dailySection.classList.add('daily_hide');
  for (let i = 0; i < entry.length; i++) {

  }
});
*//**
 *
 *
 * @author Dadian Zhu <dazhu@ucsd.edu>
 * @date 2021-05-30
 * @memberof SideBar
 */

  set content (entry) {
    console.log(entry);
    const futureList = document.createElement('div');
    futureList.setAttribute('class', 'list-group');
    const monthlyList = document.createElement('div');
    monthlyList.setAttribute('class', 'list-group');
    const dailyList = document.createElement('div');
    dailyList.setAttribute('class', 'list-group');
    console.log(entry.date);
    console.log(entry.length);
    for (let i = 0; i < entry.length; i++) {
      const a = document.createElement('a');
      a.setAttribute('class', 'list-group-item');
      a.innerHTML = entry[i].date;
      dailyList.appendChild(a);
      a.setAttribute('href', '#/dailyLog/' + entry[i].date);
    }
    // const li = document.createElement('li');
    // li.innerHTML = day.date;
    // if(entry.category=='Future Log'){
    //     futureList.appendChild(li);
    // }
    // if(entry.category=='Monthly Log'){
    //     monthlyList.appendChild(li);
    // }
    // if(entry.category=='Daily Log'){

    // }
    this.shadowRoot.querySelector("[class='futureLog']").appendChild(futureList);
    this.shadowRoot.querySelector("[class='monthlyLog']").appendChild(monthlyList);
    this.shadowRoot.querySelector("[class='dailyLog']").appendChild(dailyList);
    this.shadowRoot.getElementById('daily').addEventListener('click', () => {
      for (let i = 0; i < entry.length; i++) {
        if (this.shadowRoot.querySelectorAll("[class='list-group-item']")[i].style.display === 'block') {
          this.shadowRoot.querySelectorAll("[class='list-group-item']")[i].style.display = 'none';
        } else {
          this.shadowRoot.querySelectorAll("[class='list-group-item']")[i].style.display = 'block';
        }
      }
    });
    const input = this.shadowRoot.getElementById('searchbar');
    const link = this.shadowRoot.querySelectorAll("[class='list-group-item']");

    input.addEventListener('keyup', () => {
      for (let i = 0; i < link.length; i++) {
        if (!link[i].innerHTML.includes(input.value)) {
          link[i].style.display = 'none';
        } else {
          link[i].style.display = 'block';
        }
      }
    });
  }
}
customElements.define('side-bar', SideBar);
