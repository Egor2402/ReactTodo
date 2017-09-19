import React, { Component } from 'react';
import _ from 'underscore';
import TodoListItem from './todo_list_item'

class TodoList extends Component {
  render() {
    const todoItems = _.sortBy(this.props.todos, 'expires_at').map(todo => {
      return (
        <TodoListItem
          todo={todo}
          key={todo.created_at} />
      );
    });

    return (
      <div className="tasks-list">
        <div className="row tasks-list-header">
          <div className="col-xs-4">Task</div>
          <div className="col-xs-3">Created At</div>
          <div className="col-xs-3">Expires At</div>
          <div className="col-xs-2 text-right">Completed</div>
        </div>
        {todoItems}
      </div>
    );
  }
};

export default TodoList;
