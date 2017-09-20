import React, { Component } from 'react';
import moment from 'moment';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      expires_at: this.getCurrentDateTime(),
      type: props.types[0].name
    };
  }

  onSelectorChange(state) {
    this.setState(state);
  }

  onClickAddButton() {
    if (this.state.term) {
      this.props.onAddTask({
        task: this.state.term,
        created_at: moment().format('X'),
        expires_at: moment(this.state.expires_at).format('X'),
        typeName: this.state.type
      });
      this.setState({term: ''});
    }
  }

  componentWillReceiveProps() {
    this.setState({expires_at: this.getCurrentDateTime() });
  }

  getCurrentDateTime() {
    return moment().format('YYYY-MM-DDTHH:mm:ss')
  }

  render() {
    const typeOptions = [];
    this.props.types.forEach((type) => {
      typeOptions.push(<option key={type.id}>{type.name}</option>);
    });

    return (
      <div>
        <span>Task:</span>
        <input type="text"
          className="form-control"
          value={this.state.term}
          onChange={(event) => this.onSelectorChange({term: event.target.value})}
        />
        <span>Type:</span>
        <select
          className="form-control"
          onChange={(event) => this.onSelectorChange({type: event.target.value})}
          value={this.state.type}
        >
          {typeOptions}
        </select>
        <span>Expires At:</span>
        <input type="datetime-local"
          className="form-control"
          value={this.state.expires_at}
          onChange={(event) => this.onSelectorChange({expires_at: event.target.value})}
        />
        <button className="btn" onClick={::this.onClickAddButton}>Add</button>
        <button className="btn" onClick={this.props.onCancelAddingTask}>Cancel</button>
      </div>
    );
  }
};

export default AddTodo;
