import { DateTime } from 'luxon';
import React, {Component} from 'react';
import EditTaskForm from '../editTaskForm/EditTaskForm';
import TaskBoard from '../taskBoard/TaskBoard';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.emptyTask = {
      summary: '',
      status: 'backlog',
      estimate: '',
      businessValue: '',
    };
    this.state = {
      statuses: props.statuses,
      tasks: props.tasks,
      estimateTypes: props.estimateTypes,
      businessValueTypes: props.businessValueTypes,
      editedTask: {},
    };
    Object.assign(this.state.editedTask, this.emptyTask);

    this.handleEditTaskSubmit = this.handleEditTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((previousState) => ({
      editedTask: {
        ...previousState.editedTask,
        [name]: value
      }
    }));
  }

  findNextTaskId() {
    if (this.state.tasks.length === 0) {
      return 1;
    }
    return Math.max.apply(Math, this.state.tasks.map((task) => parseInt(task.id.split('-')[1]))) + 1;
  }

  handleEditTaskSubmit(event) {
    event.preventDefault();
    const editedTask = {};
    Object.assign(editedTask, this.state.editedTask);
    if (!editedTask.id) {
      editedTask.id = [this.props.projectName, this.findNextTaskId()].join('-');
      const now = DateTime.now();
      editedTask.createdAt = now.toISO();
    }

    this.setState(function(previousState) {
      const emptyTask = {};
      Object.assign(emptyTask, this.emptyTask);
      const newTasksList = [...previousState.tasks];
      const oldIndex = newTasksList.findIndex((item) => item.id === editedTask.id);
      if (oldIndex !== -1) {
        newTasksList.splice(oldIndex, 1);
      }
      newTasksList.push(editedTask);

      return {
        tasks: newTasksList,
        editedTask: emptyTask,
      };
    });
  }

  handleSelectTask(taskId) {
    const task = this.state.tasks.filter((item) => item.id === taskId)[0];
    const editedTask = {};
    Object.assign(editedTask, task);
    this.setState({
      editedTask: editedTask
    });
  }

  render() {
    return (
      <main>
        <TaskBoard statuses={this.state.statuses}
          tasks={this.state.tasks}
          estimateTypes={this.state.estimateTypes}
          businessValueTypes={this.state.businessValueTypes}
          onSelectTask={this.handleSelectTask} />

        <EditTaskForm statuses={this.state.statuses}
          estimateTypes={this.state.estimateTypes}
          businessValueTypes={this.state.businessValueTypes}
          task={this.state.editedTask}
          onSubmit={this.handleEditTaskSubmit}
          onInputChange={this.handleInputChange} />
      </main>
    );
  }
}

export default Dashboard;
