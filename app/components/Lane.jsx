import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';

export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;

    return (
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>

          <Editable className="lane-name" editing={lane.editing}
            value={lane.name} onEdit={this.editName} />
          <div className="lane-delete">
            <button onClick={this.deleteLane}>X</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            // notes: () => NoteStore.getState().notes || []
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >

          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  // Note this shit is jacked up if we had a database. If we were waiting
  // on a backend, we'd need a waitFor to deal with the data dependencies
  // It telles the dispatcher that it should wait before going on.

  editNote(id, task) {
    //Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }
  // addNote() {
  //   NoteActions.create({task: 'New Task'});
  // }
  // deleteNote (id, e) {
  //   e.stopPropagation();

  //   NoteActions.delete(id);
  // }
  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  };
  deleteNote = (noteId, e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }

  editName = (name) => {
    const laneId = this.props.lane.id;

    console.log('edit lane ${laneID} name using ${name}');
  };
  deleteLane = () => {
    const laneId = this.props.lane.id;

    console.log('delete lane ${laneId}');
  };
  activateLaneEdit = () => {
    const laneId = this.props.lane.id;

    console.log('activate lane ${laneId} edit');
  };
  activateNoteEdit(id) {
    console.log('activate note ${id} edit');
  }
}
