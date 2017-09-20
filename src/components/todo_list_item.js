import React, { Component } from 'react';
import moment from 'moment';

class TodoListItem extends Component {
  formatDate(seconds) {
    return moment(seconds*1000).format("MMM Do YYYY, h:mm:ss a")
  }

  render() {
    return (
      <div className="row tasks-list-item">
        <div className="col-xs-3">
          {this.props.todo.task}
        </div>
        <div className="col-xs-1">
          {this.props.todo.typeName}
        </div>
        <div className="col-xs-3">
          {this.formatDate(this.props.todo.created_at)}
        </div>
        <div className="col-xs-3">
          {this.formatDate(this.props.todo.expires_at)}
        </div>
        <div className="col-xs-2 text-right">
          <input type="checkbox" defaultChecked={this.props.todo.done} />
        </div>
      </div>
    );
  }
};

export default TodoListItem;
