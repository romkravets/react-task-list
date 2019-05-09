import *as React from 'react';
import { HTTPServece } from '../server/http-service';
import './TaskList.scss';

const URL = 'https://evening-dawn-11092.herokuapp.com/list';

export class TaskList extends React.Component {
   constructor() {
      super();
      this.onSubmit = this.onSubmit.bind(this);
      this.valueChange = this.valueChange.bind(this);
      this.httpService = new HTTPServece();
      this.state = {
         tasks: [],
         newTaskTitle: '',
      };

      this.fetchData();
   }

   fetchData() {
      this.httpService.get(URL, (tasks) => {
         this.setState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.tasks = tasks;
            console.log(newState);
            return newState;
         })
      });
   }

   onSubmit(e) {
      e.preventDefault();
      const title = this.state.newTaskTitle;
      this.httpService.post(URL, {title}, (task) => {
         this.setState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.newTaskTitle = '';
            newState.tasks.push(task);
            return newState;
         });
      })
   }

   valueChange(e) {
      const value = e.target.value;
      this.setState((oldState) => {
         const newState = Object.assign({}, oldState);
         newState.newTaskTitle = value;
         return newState;
      })
   }

   render() {
      const listItems = this.state.tasks.map((task, i) => {
         return <li key={i}>{task.title}</li>
      });
      return (
      <div className="task-list">
            <form className="task-list__head" onSubmit={this.onSubmit}>
               <input
                  className="task-list__input"
                  type="text"
                  placeholder="To do"
                  onChange = { this.valueChange }
                  value={ this.state.newTaskTitle } />
               <button className="rask-list__btn">Add</button>
            </form>
            <ul className="task-list__content">
               {listItems}
            </ul>
            <div className="task-list__footer"></div>
      </div>
      )
   }
}