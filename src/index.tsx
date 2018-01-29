import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import ObservableTodoStore, { observableTodoStore } from './TodoStore';

import { observer } from 'mobx-react';

@observer
class TodoView extends React.Component<any> {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />
        {todo.task}
        {todo.assignee ? <small>{todo.assignee.name}</small>: null}
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

interface PropsType {
  store: ObservableTodoStore;
}

@observer
class TodoList extends React.Component<PropsType> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { store } = this.props as any;
    return (
      <div>
        {store.report}
        <ul>
          {store.todos.map((todo: any, idx: number) => <TodoView todo={todo} key={idx} />)}
        </ul>
        {store.pendingRequests > 0 ? <strong>Loading...</strong> : null}
        <button onClick={this.onNewTodo}>New Todo</button>
        <small> (double-click a todo to edit)</small>
      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  }
}

ReactDOM.render(
  <TodoList store={observableTodoStore} />,
  document.getElementById('root')
);

registerServiceWorker();
