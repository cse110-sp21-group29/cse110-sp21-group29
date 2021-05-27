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
  }

  get entries () {
    return this.getAttribute('content');
  }
  /* eslint-disable */
  set entries (entries) {
    // this.tabIndex = 0;
    this.createList(this.shadowRoot.getElementById('entries'), entries);
    if (this.editable) {
      const addDropdown = document.createElement('div');
      addDropdown.innerHTML = `
        <button id="myDropdown" type="button" data-bs-toggle="dropdown" data-bs-keyboard="true" aria-haspopup="true" aria-expanded="false"
        class="px-1 pt-1 mx-4 mb-2 btn btn-lg btn-primary dropdown-toggle">
          <i class="bi-journal-plus"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="myDropdown">
          <a class="dropdown-item" href="#">Add Note</a>
          <a class="dropdown-item" href="#">Add Event</a>
          <a class="dropdown-item" href="#">Add Task</a>
        <div>
      `;
      addDropdown.classList.add('dropdown');
      /*       const addButton = document.createElement('button');
      addButton.innerHTML = '<i class="bi-journal-plus"></i>';
      addButton.classList.add('px-1', 'py-1', 'mx-1', 'my-1', 'btn', 'btn-lg', 'btn-primary'); */
      document.getElementById(this.parentId).appendChild(addDropdown);
      
      const myDropdownInit = new BSN.Dropdown('#myDropdown');
      
    }
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
  createLi (bullet, text) {
    const li = document.createElement('li');
    // li.draggable = true;
    li.innerHTML = '<span class="d-inline-block pr-5"><span>' + bullet + ' </span><span class="mr-5" >' + text + '</span></span>';
    li.classList.add('list-group-item', 'border-0', 'py-0');

    if (this.editable) {
      li.tabIndex = 0;
      li.children[0].children[0].tabIndex = 0;
      li.children[0].children[1].contentEditable = true;
      li.addEventListener('focus', event => {
        li.classList.add('focused');
      });
      li.addEventListener('blur', event => {
        li.classList.remove('focused');
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
  createNote (note) {
    const noteElem = this.createLi('–', note.text);
    // noteElem.innerText = '– ' + note.text;
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
    const eventElem = this.createLi('○', event.text);
    // eventElem.innerText = '○ ' + event.text;
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
    const taskElem = this.createLi('●', task.text);

    if (task.deadline) {
      taskElem.innerHTML += '<br><span>&nbsp &nbsp Deadline: ' + task.deadline + '</span>';
    }
    this.createList(taskElem, task.subEntries);
    return taskElem;
  }
}
customElements.define('log-entries', LogEntries);
