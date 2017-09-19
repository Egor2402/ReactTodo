import React, { Component } from 'react';
import moment from 'moment';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      expires_at: this.getCurrentDateTime()
    };
  }

  onInputChange(state) {
    this.setState(state);
  }

  onClickAddButton() {
    if (this.state.term) {
      this.props.onAddTask({
        task: this.state.term,
        created_at: moment().format('X'),
        expires_at: moment(this.state.expires_at).format('X')
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
    return (
      <div>
        <span>Task:</span>
        <input type="text"
          className="form-control"
          value={this.state.term}
          onChange={(event) => this.onInputChange({term: event.target.value})}
        />
      <span>Expires At:</span>
        <input type="datetime-local"
          className="form-control"
          value={this.state.expires_at}
          onChange={(event) => this.onInputChange({expires_at: event.target.value})}
        />
        <button className="btn" onClick={::this.onClickAddButton}>Add</button>
        <button className="btn" onClick={this.props.onCancelAddingTask}>Cancel</button>
      </div>
    );
  }
};

export default AddTodo;
