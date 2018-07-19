import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import './todo.css';
import InputText from './Component/InputText'
import ListContent from './Component/ListContent'
import FilterList from './Component/FilterList'

class App extends Component {
  constructor() {
    super();
    this.state ={
      status:'all',
      todos: [{
                      id:'1',
                      name: 'Parking Lot APP Refactor',
                      isComplete:false
                  },
                      {
                          id:'2',
                          name: 'Parking Lot APP 时序图 ',
                          isComplete:true
                      },
                      {
                          id:'3',
                          name: 'Parking Lot APP 中类的流程图',
                          isComplete:false
                      }]
      }   
  }

  changeStatus = (status) => {
    this.setState({status})
  }

  changeCheck = (viewId,event) => {
    this.state.todos.find(item => item.id === viewId).isComplete=event.target.checked;
    this.setState({todos:this.state.todos});
  }

  changeContent = (event) => {
    event.target.setAttribute('contentEditable', 'true');
    event.target.focus();
  }

  addItem = (toAdd) => {
    let todos = this.state.todos;
    todos.push({id:this.generateUUID(),name:toAdd,complete:false});
    this.setState(todos);
  }
  generateUUID=()=> {
    /*jshint bitwise:false */
    var i,
        random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12
            ? 4
            : (i === 16
                ? (random & 3 | 8)
                : random)).toString(16);
    }
    return uuid;
}

  filerByStatus = (status) =>{
    if (status === 'all') {
      return this.state.todos;
    }else if(status === 'active'){
      return this.state.todos.filter(item => !item.isComplete);
    }else{
      return this.state.todos.filter(item => item.isComplete);
    } 
  }


  render() {
    return (

      <div className="container">
         <div>
               <h2>Jquery To Do List</h2>
                            <p>
                                <em>Simple Todo List with adding and filter by diff status.</em>
                            </p>
                        </div>
        <InputText addHandler={this.addItem}/>
        <br/>

        <div className="ListContent"> 
          <ol>
            {
              this.filerByStatus(this.state.status).map( item => 
                <ListContent
                  todos={item}
                  editHandler={this.changeContent}
                  toggleActiveHandler={this.changeCheck}
                  updateItemContent={this.changeContent}
                />
              )
            }
          </ol>
        </div>
            

        <FilterList status={this.state.status} changeStatusHandler={this.changeStatus}/>
      </div>
    );
  }
}

export default App;
