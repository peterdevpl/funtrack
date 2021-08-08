import { DateTime } from 'luxon';
import React, {Component} from 'react';

class TaskList extends Component {
  findEstimateType(estimate) {
    return this.props.estimateTypes.filter((type) => estimate === type.id)[0];
  }

  findBusinessValue(value) {
    return this.props.businessValueTypes.filter((type) => value === type.id)[0];
  }

  sortTasks(a, b) {
    const estimates = {a: this.findEstimateType(a.estimate), b: this.findEstimateType(b.estimate)};
    const businessValues = {a: this.findBusinessValue(a.businessValue), b: this.findBusinessValue(b.businessValue)};

    const scoreA = estimates.a.weight / businessValues.a.weight;
    const scoreB = estimates.b.weight / businessValues.b.weight;
  
    if (scoreA > scoreB) {
      return -1;
    } else if (scoreA < scoreB) {
      return 1;
    }
  
    if (a.createdAt < b.createdAt) {
      return -1;
    } else if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }
  
  render() {
    const now = DateTime.now();

    return (
      <section className="task-list">
        <h2>{this.props.statusName}</h2>
        {this.props.tasks.length > 0 && <ul>
          {this.props.tasks.sort(this.sortTasks.bind(this)).map(task => (
            <li key={task.id} onClick={(e) => this.props.onSelectTask(task.id, e)}>
              <span className="task-id">{task.id}</span>
              <span className="task-summary">{task.summary}</span>
              <span className={'task-estimate estimate-' + task.estimate}>{task.estimate}</span>
              <span className={'task-business-value business-value-' + task.businessValue}>{task.businessValue}</span>
              <span className="task-age">{
                Math.round(now.diff(DateTime.fromISO(task.createdAt), 'days').days)
              } days ago</span>
            </li>
          ))}
        </ul>}
      </section>
    );
  }
}

export default TaskList;
