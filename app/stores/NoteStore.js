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

    node.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });
  }

  update(updatedNote) {

  }

  delete(id) {

  }
}

// Here, export is connecting the store with Alt using alt.createStore
// Notestore, 'NoteStore' - ain't have to do this, but when this shit gets minified later
// it's possible it may nuke the relation between these two. Grand practice to name them the exact
// same thing
export default alt.createStore(NoteStore, 'NoteStore');
