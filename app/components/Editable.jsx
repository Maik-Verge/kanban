// This setup uses an uncontrolled design with its input. The control
// over state is handed over to the dom and captured through event handlers
// If I want to validate the input when the user is typing, it would be
// useful to conert it into a controlled deisgn. in this case you define
// a onChange handler and a value prop

import React from 'react';

export default class Editable extends React.Component {
  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit = () => {
    return <input type="text"
      ref={
        (e) => e ? e.selectionStart = this.props.value.length : null
      }
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  renderDelete = () => {
    return <button
      className="delete"
      onClick={this.props.onDelete}>x</button>;
  };
  renderValue = () => {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  };
  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  };
}
