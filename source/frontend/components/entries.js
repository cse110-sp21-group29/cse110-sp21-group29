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
          <link rel="stylesheet" href="../styles/bootstrap.css">
          <ul class=""list-group"></ul>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.list = this.shadowRoot.querySelector('ul');
    // this.classList.add('card');
  }

  get content () {
    return this.getAttribute('content');
  }

  set content (content) {
    content.forEach((entry) => {
      if (entry.type === 'note') {
        this.createMainNote(entry);
        return;
      }
      if (entry.type === 'event') {
        this.createMainEvent(entry);
      }
    });
  }

  /**
 *
 * A helper method to create notes
 * @author Julius Tran <j6tran@ucsd.edu>
 * @date 2021-05-15
 * @param {*} note - The contents of the note
 * @memberof LogEntries
 */
  createMainNote (note) {
    const noteElem = this.createNote(note, this.list);
    if (note.subentries.length > 0) {
      const subList = document.createElement('ul');
      subList.classList.add('list-group');
      noteElem.appendChild(subList);
      note.subentries.forEach(subentry => {
        if (subentry.type === 'note') this.createNote(subentry, subList);
      });
    }
  }

  createNote (note, list) {
    const noteElem = this.createLi(list);
    noteElem.innerText = '– ' + note.text;
    return noteElem;
  }

  createMainEvent (event) {
    const eventElem = this.createEvent(event, this.list);
    if (event.subentries.length > 0) {
      const subList = document.createElement('ul');
      subList.classList.add('list-group');
      eventElem.appendChild(subList);
      event.subentries.forEach(subentry => {
        if (subentry.type === 'note') {
          this.createNote(subentry, subList);
          return;
        }
        if (subentry.type === 'event') {
          this.createEvent(subentry, subList);
        }
      });
    }
  }

  createEvent (event, list) {
    const eventElem = this.createLi(list);
    eventElem.innerText = '○ ' + event.text;
    if (event.startTime) {
      eventElem.innerHTML += '<br><span>&nbsp &nbsp Starts: ' + event.startTime + '</span>';
      if (event.endTime) {
        eventElem.innerHTML += '<span>&nbsp Ends: ' + event.endTime + '</span>';
      }
    }
    return eventElem;
  }

  /**
   *
   * A helper method that creates <li> and appends them to a <ol>
   * @author Julius Tran <j6tran@ucsd.edu>
   * @date 2021-05-15
   * @param {*} list
   * @return {*} The created <li> element
   * @memberof LogEntries
   */
  createLi (list) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'py-0');
    list.appendChild(li);
    return li;
  }
}

customElements.define('log-entries', LogEntries);
