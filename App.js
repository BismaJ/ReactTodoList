import React, {Component} from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Todos from "./Todos.js";
import Header from "./Header.js"
import AddTodo from "./AddTodo.js"
import About from "./About.js"
import axios from "axios"
// import {v4 as uuid} from "uuid";

class App extends Component{
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }

    componentDidMount() {
      axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => this.setState({ todos: res.data}))
    }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete("http://jsonplaceholder.typicode.com/todos/${id}")
    .then(res => this.setState({ todos: [...this.state.todos.filter
    (todo => todo.id !== id)] }));
  }

  //Add Todo
  addTodo = (title) => {
    axios.post("http://jsonplaceholder.typicode.com/todos", { 
    title,
    completed: false
  })
    .then(res => this.setState({ todos:
      [...this.state.todos, res.data] }))
  }

  render(){
    return(
      <Router>
      <div className="App">
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>
             <AddTodo addTodo={this.addTodo} />
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
          </React.Fragment>
        )} />
        <Route exact path="/about" component={About} />
            </div>
      </Router>
    )
  }
}

export default App
