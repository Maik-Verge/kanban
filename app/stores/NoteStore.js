import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });
  }

  update(updatedNote) {

    const notes = this.notes.map(note => {
      if(note.id === updatedNote.id) {
        /* Objec.assign is used to patch the note data here. It
        mutates target (first parameter). In order to avoid that, use {} as its target
        and apply data on it.

        Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b:3}

        You can pass as many objects to the method as you want. */

        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    // This is the same as 'this.setState({notes: notes})'
    //{notes} is known as a an ES6 feature known as property shorthand. This is equivalent to {notes: notes}.
    this.setState({notes});
  }

  delete(id) {

    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });

  }
}

export default alt.createStore(NoteStore, 'NoteStore');
// Here, export is connecting the store with Alt using alt.createStore
// Notestore, 'NoteStore' - ain't have to do this, but when this shit gets minified later
// it's possible it may nuke the relation between these two. Grand practice to name them the exact
// same thing
export default alt.createStore(NoteStore, 'NoteStore');
