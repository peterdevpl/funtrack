import React, {Component} from 'react';
import TaskList from '../taskList/TaskList';

class TaskBoard extends Component {
  sortStatuses(a, b) {
    return b.stage - a.stage;
  }

  render() {
    return (
      <div>
        {this.props.statuses.sort(this.sortStatuses).map((status) =>
          <TaskList
            key={status.id}
            statusName={status.name}
            tasks={this.props.tasks.filter((task) => task.status === status.id)}
            estimateTypes={this.props.estimateTypes}
            businessValueTypes={this.props.businessValueTypes}
            onSelectTask={this.props.onSelectTask} />
        )}
      </div>
    );
  }
}

export default TaskBoard;
