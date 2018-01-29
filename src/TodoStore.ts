import { observable, autorun, computed } from 'mobx';

export default class ObservableTodoStore {
    @observable todos: Array<any> = [];
    @observable pendingRequests = 0;

    constructor() {
        autorun(() => console.log(this.report));
    }

    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    addTodo(task: any) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}


export const observableTodoStore = new ObservableTodoStore();