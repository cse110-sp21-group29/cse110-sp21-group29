class SideBar extends HTMLElement{
    constructor(){
        super();
        const template=document.createElement('template');
        template.innerHTML=`
            <style>
            
            .sidebar {
                width: 20%;
                height: 100%;
                background-color: gray;
                position:relative;
                padding-top: 40px;
                overflow-y: scroll;
            }
            .sidebar_hide{
                width:0%;
            }
            
            </style> 
            <section class="sidebar">
                <!-- <button>Collapse</button> -->  
                <input type="text" placeholder="Search.."> 
                <section class="futureLog">Future Log</section>
                <section class="monthlyLog">Monthly Log</section>
                <sectino class="dailyLog">Daily Log</section>
             </section>
            
            `;
        this.attachShadow({mode : 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
            
    }
    get content(){
        return this.shadowRoot.querySelector("[class='sidebar']");
    }
    set content(entry){
        const futureList=document.createElement('ul');
        const monthlyList=document.createElement('ul');
        const dailyList=document.createElement('ul');

        // entries.forEach(entry=>{
            const length = document.querySelectorAll('time').length;
            const li=document.createElement('li');
            li.innerHTML=document.querySelectorAll('time')[length-1].innerHTML;
            // if(entry.category=='Future Log'){
            //     futureList.appendChild(li);
            // }
            // if(entry.category=='Monthly Log'){
            //     monthlyList.appendChild(li);
            // }
            // if(entry.category=='Daily Log'){
                dailyList.appendChild(li);
            // }
        // });  
        this.shadowRoot.querySelector("[class='futureLog']").appendChild(futureList);
        this.shadowRoot.querySelector("[class='monthlyLog']").appendChild(monthlyList);
        this.shadowRoot.querySelector("[class='dailyLog']").appendChild(dailyList);

    }
    
}
customElements.define('side-bar',SideBar);