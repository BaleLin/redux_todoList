import React, { Component } from 'react';

export default class ListContent extends Component {
    constructor(props) {
        super(props);
     }
    
    updateItem(e, id, name) {
        if (e.keyCode === 13) {
            this.props.updateItemContent(id, name);
         }
    }
    
     updateChange=(event)=>{
        this.props.editHandler(event);
     }
    toggleActive = (id,event) => {
        this.props.toggleActiveHandler(id,event);
    }



    render() {
        let {todos} = this.props; 

        return (
            <li onDoubleClick={e=>this.updateChange(e)} className = {todos.isComplete ? 'checked':''}>
                <input
                    type="checkbox"
                    className="done-todo"
                    checked={todos.isComplete?'checked':''}
                    onClick={e => this.toggleActive(todos.id,e)}
                />
                    {this.props.todos.name}
            </li>     
        );
    }
}
