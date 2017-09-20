import $ from 'jquery';
import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/todo_list';
import AddTodo from './components/add_todo';

class App extends Component {
  constructor(props) {
    super(props);

    const preparedTodos = props.todos.map((todo) => {
      todo.typeName = _.find(props.types, (type) => { return type.id === todo.type }).name;
      return todo;
    });

    this.state = {
      todos: preparedTodos,
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
            types={this.props.types}
          />
        </div>
        <TodoList todos={this.state.todos} types={this.props.types} />
      </div>
    );
  }
};

const todosPromise = $.ajax('http://rygorh.dev.monterosa.co.uk/todo/items.php');
const typesTodoPromise = $.ajax('http://rygorh.dev.monterosa.co.uk/todo/types.php');

$.when(todosPromise, typesTodoPromise).done((todosData, typesData) => {
  ReactDOM.render(<App todos={todosData[0]} types={typesData[0]} />, document.querySelector('.container'));
});
