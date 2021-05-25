/**
 *
 * This is a re-usable custom web component that displays notes, tasks, and events.
 * Simply set its .content property to the array of entries
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
        border-bottom: 3px solid black;
        /*border-top: 1px solid black;*/
        word-break: break-all;
    
       /* padding: 30px;*/
    }
    
    .item:nth-child(odd){
        border-right: 3px solid black;
    }
    </style>
    
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get content () {
    return this.getAttribute('content');
  }

  set content (content) {
    this.createList(this.shadowRoot, content);
  }

  /**
   * Create an ol element containing the entries.
   * @author Julius Tran <j6tran@ucsd.edu>
   * @date 2021-05-15
   * @param {Object} - The element to append the ol to
   * @param {Object[]} entries - The data for the entries
   * @return {HTMLUListElement} The created list
   * @memberof LogEntries
   */
  createList (elem, entries) {
    if (!entries || entries.length === 0) return false;
    const list = document.createElement('ul');
    list.classList.add('list-group');
    elem.appendChild(list);
    entries.forEach(entry => {
      if (entry.type === 'note') {
        list.appendChild(this.createNote(entry));
        return;
      }
      if (entry.type === 'event') {
        list.appendChild(this.createEvent(entry));
        return;
      }
      if (entry.type === 'task') {
        list.appendChild(this.createTask(entry));
      }
    });
    return list;
  }

  /**
     * Create li with proper CSS clasess
     * @author Julius Tran <j6tran@ucsd.edu>
     * @date 2021-05-15
     * @return {HTMLLIElement}  The created li element
     * @memberof LogEntries
     */
  createLi () {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'py-0');
    return li;
  }

  /**
   * Create a note li element
   * @author Julius Tran <j6tran@ucsd.edu>
   * @date 2021-05-15
   * @param {Object} - The note data
   * @return {HTMLLIElement}  The created note
   * @memberof LogEntries
   */
  createNote (note) {
    const noteElem = this.createLi();
    noteElem.innerText = '– ' + note.text;
    this.createList(noteElem, note.subEntries);
    return noteElem;
  }

  /**
     * Create an event li element
     * @author Julius Tran <j6tran@ucsd.edu>
     * @date 2021-05-15
     * @param {*} event - The event data
     * @return {HTMLLIElement} The created event
     * @memberof LogEntries
     */
  createEvent (event) {
    const eventElem = this.createLi();
    eventElem.innerText = '○ ' + event.text;
    if (event.startTime) {
      eventElem.innerHTML += '<br><span>&nbsp &nbsp Starts: ' + event.startTime + '</span>';
      if (event.endTime) {
        eventElem.innerHTML += '<span>&nbsp Ends: ' + event.endTime + '</span>';
      }
    }
    this.createList(eventElem, event.subEntries);
    return eventElem;
  }

  /**
     * Create a task li element
     * @author Julius Tran <j6tran@ucsd.edu>
     * @date 2021-05-15
     * @param {*} task - The task data
     * @return {HTMLLIElement}  The created task
     * @memberof LogEntries
     */
  createTask (task) {
    const taskElem = this.createLi();
    taskElem.innerText = '● ' + task.text;
    if (task.deadline) {
      taskElem.innerHTML += '<br><span>&nbsp &nbsp Deadline: ' + task.deadline + '</span>';
    }
    this.createList(taskElem, task.subEntries);
    return taskElem;
  }
}
customElements.define('log-entries', LogEntries);
