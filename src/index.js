import $ from "jquery";
import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/todo_list';
import AddTodo from './components/add_todo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: props.todos,
      showAddTask: false
    };
  }

  showAddingTask() {
    this.setState({showAddTask: true});
  }

  hideAddingTask() {
    this.setState({showAddTask: false});
  }

  addTask(todo) {
    const todos = this.state.todos;
    todos.push(todo);
    this.setState({todos});
    this.hideAddingTask();
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <button className={`btn ${this.state.showAddTask ? "hidden" : ""}`} onClick={::this.showAddingTask}>Add task</button>
        </div>
        <div className={this.state.showAddTask ? "add-todo": "hidden"}>
          <AddTodo
            onCancelAddingTask={::this.hideAddingTask}
            onAddTask={::this.addTask}
          />
        </div>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
};

$.ajax({
  type: 'GET',
  url: 'http://rygorh.dev.monterosa.co.uk/todo/items.php',
  success(todos) {
    ReactDOM.render(<App todos={todos} />, document.querySelector('.container'));
  }
});
