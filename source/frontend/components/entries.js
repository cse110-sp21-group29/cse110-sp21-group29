/* global BSN */

/**
 *
 * This is a re-usable custom web component that displays notes, tasks, and events.
 * Simply set its .content property to the array of entries
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-13
 * @class LogEntries
 * @extends {HTMLElement}
 */
export class LogEntries extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
          <link rel="stylesheet" href="../styles/bootstrap.css">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
          <style>
            .focused {
              outline: 5px auto -webkit-focus-ring-color;
            }
          </style>
          <article id="entries"></article>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML += '<slot name="addButtonSlot"></slot>';
  }

  get entries () {
    return this.getAttribute('entries');
  }
  /* eslint-disable */
  set entries (entries) {
    // this.tabIndex = 0;
    this.entryArray = entries;
    const article = this.shadowRoot.getElementById('entries');
    article.innerHTML = '';
    this.createList(article, entries,true);
    if (this.editable && !this.addButtonCreated) {
      this.addButtonCreated = true;
      this.createAddButton();
      this.createAddNestedButton();
      
    }
  }

  createAddButton() {
    const addDropdown = document.createElement('div');
    const id = this.uniqueId();
    addDropdown.innerHTML = `
      <button id="${id}" type="button" data-bs-toggle="dropdown" data-bs-keyboard="true" aria-haspopup="true" aria-expanded="false"
      class="px-1 pt-1 mx-4 mb-2 btn btn-lg btn-primary dropdown-toggle">
        <i class="bi-journal-plus"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="myDropdown">
        <a class="dropdown-item"  href="#">Add Note</a>
        <a class="dropdown-item"  href="#">Add Event</a>
        <a class="dropdown-item"  href="#">Add Task</a>
      <div>
    `;
    addDropdown.classList.add("dropdown");
    addDropdown.slot='addButtonSlot';
    
    document.body.appendChild(addDropdown);
    const myDropdownInit = new BSN.Dropdown( `#${id}`);
    this.appendChild(addDropdown);
    
    let addItems = addDropdown.querySelectorAll('a');
    addItems[0].addEventListener('click', event => {
      this.entryArray.push({
        "type": "note",
        "text": "A note",
        "subEntries": []
      });
      this.entries = this.entryArray;
    })
    addItems[1].addEventListener('click', event => {
      this.entryArray.push({
        "type": "event",
        "text": "An event",
        "startTime": "",
        "endTime": "",
        "subEntries": []
      });
      this.entries = this.entryArray;
    })
    addItems[2].addEventListener('click', event => {
      this.entryArray.push({
        "type": "task",
        "text": "A task",
        "subEntries": []
      });
      this.entries = this.entryArray;
    })
  }

  createAddNestedButton() {
    this.addNestedDropdown = document.createElement('div');
    const id = this.uniqueId();
    this.addNestedDropdown.innerHTML = `
      <button id="${id}"  type="button" data-bs-toggle="dropdown" data-bs-keyboard="true" aria-haspopup="true" aria-expanded="false"
      class="px-1 pt-1 mx-4 mb-2 btn btn-lg btn-primary dropdown-toggle">
        <i class="bi-journal-plus"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="myDropdown">
        <a class="dropdown-item"  href="#">Add Note</a>
        <a class="dropdown-item"  href="#">Add Event</a>
        <a class="dropdown-item"  href="#">Add Task</a>
        <a class="dropdown-item"  href="#">Delete Entry</a>
      <div>
    `;
    this.addNestedDropdown.classList.add('dropdown','d-block');
    this.addNestedDropdown.item = {};
    document.body.appendChild(this.addNestedDropdown);
    const myDropdownInit = new BSN.Dropdown(`#${id}`);
    this.appendChild(this.addNestedDropdown);
    let addItems = this.addNestedDropdown.querySelectorAll('a');
   
    addItems[0].addEventListener('click', event => {
      this.addNestedDropdown.item.subEntries.push({
        "type": "note",
        "text": "A note",
      });
      this.entries = this.entryArray;
    })
    addItems[1].addEventListener('click', event => {
      this.addNestedDropdown.item.subEntries.push({
        "type": "event",
        "text": "An event",
      });
      this.entries = this.entryArray;
    })
    addItems[2].addEventListener('click', event => {
      this.addNestedDropdown.item.subEntries.push(        {
        "type": "task",
        "text": "A task",
      });
      this.entries = this.entryArray;
    })
    addItems[3].addEventListener('click', event => {
      const index = this.entryArray.indexOf(this.addNestedDropdown.item);
      this.entryArray.splice(index,1);
      this.entries = this.entryArray;
    })
/*     this.addEventListener('focusout',event => {
      this.addNestedDropdown.classList.add('d-none');
    })     */
    
    this.addNestedDropdown.addEventListener('focus',event => {
      this.addNestedDropdown.classList.remove('d-none');
    })    

  }

  /* eslint-enable */

  /**
 * Create an ol element containing the entries.
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-15
 * @param {Object} - The element to append the ol to
 * @param {Object[]} entries - The data for the entries
 * @return {HTMLUListElement} The created list
 * @memberof LogEntries
 */
  createList (elem, entries, topLevel) {
    if (!entries || entries.length === 0) return false;
    const list = document.createElement('ul');
    list.classList.add('list-group');
    elem.appendChild(list);
    entries.forEach(entry => {
      if (entry.type === 'note') {
        list.appendChild(this.createNote(entry, topLevel));
        return;
      }
      if (entry.type === 'event') {
        list.appendChild(this.createEvent(entry, topLevel));
        return;
      }
      if (entry.type === 'task') {
        list.appendChild(this.createTask(entry, topLevel));
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
  createLi (bullet, item, topLevel) {
    const li = document.createElement('li');
    // li.draggable = true;
    li.innerHTML = `
    <span class="d-inline-block pr-5"><span>${bullet}</span><span class="mr-5" >${item.text}</span></span>
    
    `;
    li.classList.add('list-group-item', 'border-0', 'py-0', 'd-inline-block');

    if (this.editable) {
      li.tabIndex = 0;
      li.children[0].children[0].tabIndex = 0;
      li.children[0].children[1].contentEditable = true;
      li.addEventListener('focus', event => {
        li.classList.add('focused');
      });
      if (topLevel) {
        const slotName = this.uniqueId();
        const divID = this.uniqueId();
        li.innerHTML += `
        <div id="${divID}" class="float-right"><slot name="${slotName}"></slot></div>
        `;
        li.addEventListener('focus', event => {
          this.addNestedDropdown.classList.remove('d-none');
          this.addNestedDropdown.item = item;
          /*  this.addNestedDropdown.style.top = li.getBoundingClientRect().y + 'px';
          this.addNestedDropdown.style.left = li.getBoundingClientRect().x + 50 + 'px'; */
          this.addNestedDropdown.slot = slotName;
          this.appendChild(this.addNestedDropdown);
        });
      }
      li.addEventListener('blur', event => {
        li.classList.remove('focused');
      });
      li.children[0].children[1].addEventListener('input', event => {
        item.text = li.children[0].children[1].innerText.trim();
      });
    }
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
  createNote (note, topLevel) {
    const noteElem = this.createLi('–', note, topLevel);
    // noteElem.innerText = '– ' + note.text;
    this.createList(noteElem, note.subEntries, false);
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
  createEvent (event, topLevel) {
    const eventElem = this.createLi('○', event, topLevel);
    // eventElem.innerText = '○ ' + event.text;
    if (!this.editable) {
      if (event.startTime) {
        eventElem.innerHTML += `
        <br><span>&nbsp &nbsp Starts:  ${this.convertTime(event.startTime)}</span>
        `;
        if (event.endTime) {
          eventElem.innerHTML += `
          <span>&nbsp Ends:  ${this.convertTime(event.endTime)}</span>
          `;
        }
      }
    } else {
      eventElem.innerHTML += `
      <br>
      <span> 
        &nbsp &nbsp  Starts: <input type="time" value="${event.startTime}" name="startTime">
        &nbsp Ends: <input type="time" value="${event.endTime}" name="endTime">
      </span>
      `;
      eventElem.querySelectorAll('input[type=time]')[0].addEventListener('input', ev => {
        event.startTime = ev.path[0].value;
      });
      eventElem.querySelectorAll('input[type=time]')[1].addEventListener('input', ev => {
        event.endTime = ev.path[0].value;
      });
    }

    this.createList(eventElem, event.subEntries, false);
    return eventElem;
  }

  /**
   *
   *
   * @author Julius Tran <j6tran@ucsd.edu>
   * @date 2021-06-02
   * @param {*} time - A time string in 24-hour format
   * @return {*} The time string in 12 hour format
   * @memberof LogEntries
   */
  convertTime (time) {
    if (time) return new Date('2000-01-01T' + time + 'Z').toLocaleTimeString({}, { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' });
    return '';
  }

  /**
   * Create a task li element
   * @author Julius Tran <j6tran@ucsd.edu>
   * @date 2021-05-15
   * @param {*} task  The task data
   * @return {HTMLLIElement}  The created task
   * @memberof LogEntries
   */
  createTask (task, topLevel) {
    const taskElem = this.createLi('●', task, topLevel);
    if (!this.editable) {
      if (task.deadline) {
        taskElem.innerHTML += `
        <br><span>&nbsp &nbsp Deadline: ${this.convertTime(task.deadline)}</span>
        `;
      }
    } else {
      taskElem.innerHTML += `
      <br><span>&nbsp &nbsp Deadline: <input type="time" value="${task.deadline}"></span>
        `;
      taskElem.querySelector('input[type="time"]').addEventListener('input', ev => {
        task.deadline = ev.path[0].value;
      });
    }
    this.createList(taskElem, task.subEntries, false);
    return taskElem;
  }

  uniqueId () {
    return 'id-' + Math.random().toString(36).substring(2);
  }
}

customElements.define('log-entries', LogEntries);
