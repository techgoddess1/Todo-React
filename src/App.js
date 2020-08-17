import React, { Component } from "react";
import {BrowserRouter as Router,Route } from "react-router-dom";
import Todos from "./component/Todos";
import About  from "./component/pages/About";
import AddTodo from "./component/AddTodo";
import Header from "./component/layout/Header";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    todos: [], 
  };

  componentDidMount(){
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10").then(res => this.setState({todos: res.data}));
  }
  //  toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // delete todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    }));
  }; 
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    })
        .then(res =>
    this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path ='/' render= {props =>(
              <>
              <AddTodo addTodo={this.addTodo} />
            <Todos
              todos={this.state.todos}
              markComplete={this.markComplete}
              delTodo={this.delTodo}
            />
              </>
            )}/>
            <Route path = '/about' component={About}>
 
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
