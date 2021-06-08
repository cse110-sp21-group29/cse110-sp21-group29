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
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
            <style>
            a {
              text-align:center;
              text-decoration: none;
              
              color: #ffffff;
              font-size: 18px;
              padding: 10px 25px;
            }

            a:hover {
              text-decoration: underline;
              background-color: #0076ad;
            }

            input {
              width:90%;
              height:20px;
              margin-left:10px;
              margin-right:10px;
            }

            .sidebar {
                height: 100%;
                background-color: #2C5684;
                position:relative;
                padding-top: 40px;
                overflow-y: scroll;
            }

            .sidebar_hide {
                width:0%;
            }

            .futureLog {
              display:block;
            }

            .monthlyLog {
              display:block;
            }

            .dailyLog {
              display:block;
            }
            
            h3 {
              color: #ffffff; 
              font-weight: bold;
              padding-left:10px;
            }

            h3:hover {
              text-decoration: underline;
              background-color: #0076ad;
              cursor: pointer;
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
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   *
   *
   * @author Dadian Zhu <dazhu@ucsd.edu>
   * @date 2021-05-30
   * @memberof SideBar
   */
  get content() {
    return this.getAttribute("content");
  }

  /**
   *
   *
   * @author Dadian Zhu <dazhu@ucsd.edu>
   * @date 2021-05-30
   * @memberof SideBar
   */
  set content(entry) {
    // console.log(entry);
    const futureList = document.createElement("div");
    futureList.setAttribute("class", "list-group");
    const monthlyList = document.createElement("div");
    monthlyList.setAttribute("class", "list-group");
    const dailyList = document.createElement("div");
    dailyList.setAttribute("class", "list-group");
    // console.log(entry.date);
    // console.log(entry.length);
    for (let i = 0; i < entry.length; i++) {
      const a = document.createElement("a");
      a.setAttribute("class", "list-group-item");
      a.style.display = "block";
      a.innerHTML = entry[i].date;
      dailyList.appendChild(a);
      a.setAttribute("href", "#/dailyLog/" + entry[i].date);
    }
    const futureSection = this.shadowRoot.querySelector("[class='futureLog']");
    const monthlySection = this.shadowRoot.querySelector(
      "[class='monthlyLog']"
    );
    const dailySection = this.shadowRoot.querySelector("[class='dailyLog']");
    futureSection.appendChild(futureList);
    monthlySection.appendChild(monthlyList);
    dailySection.appendChild(dailyList);
    this.shadowRoot.getElementById("daily").addEventListener("click", () => {
      console.log("click");
      for (let i = 0; i < entry.length; i++) {
        if (
          this.shadowRoot.querySelectorAll("[class='list-group-item']")[i].style
            .display === "block"
        ) {
          console.log("none");
          this.shadowRoot.querySelectorAll("[class='list-group-item']")[
            i
          ].style.display = "none";
        } else {
          console.log("block");
          this.shadowRoot.querySelectorAll("[class='list-group-item']")[
            i
          ].style.display = "block";
        }
      }
    });

    const input = this.shadowRoot.getElementById("searchbar");
    const link = this.shadowRoot.querySelectorAll("[class='list-group-item']");
    this.shadowRoot.getElementById("future").addEventListener("click", () => {
      location.hash = "/futureLog";
    });
    this.shadowRoot.getElementById("monthly").addEventListener("click", () => {
      location.hash = "#/monthlyLog";
    });
    input.addEventListener("keyup", () => {
      for (let i = 0; i < link.length; i++) {
        if (!link[i].innerHTML.includes(input.value)) {
          link[i].style.display = "none";
        } else {
          link[i].style.display = "block";
        }
      }
    });
  }
}
customElements.define("side-bar", SideBar);
