import AltContainer from 'alt-container';
import React from 'react';
// Getting rid of these in favor of lanes
// import Notes from './Notes.jsx';

// import NoteActions from '../actions/NoteActions';
// import NoteStore from '../stores/NoteStore';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';


//Alt makes all of this redundant

export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = NoteStore.getState();
//   }

//   componentDidMount() {
//     NoteStore.listen(this.storeChanged);
//   }
//   componentWillUnmount() {
//     NoteStore.unlisten(this.storeChanged);
//   }
//   storeChanged = (state) => {
//     // Without a property intitializer 'this' wouldn't
//     // point at the right context because it defaults to
//     // 'undefined' in strict mode.
//     this.setState(state);
//   }

  render() {
    // const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  // addNote() {
  //   NoteActions.create({task: 'New Task'});
  // }
  // editNote (id, task) {
  //   // Don't modify if trying to set an empty value
  //   if(!task.trim()) {
  //     return;
  //   }

  //   NoteActions.update({id, task}) ;
  // }
  // deleteNote (id, e) {
  //   e.stopPropagation();

  //   NoteActions.delete(id);
  // }
  addLane() {
    LaneActions.create({name: 'New lane'});
  }
}
