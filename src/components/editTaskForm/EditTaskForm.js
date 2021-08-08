import React, {Component} from 'react';

class EditTaskForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <h2>{this.props.task.id ? 'Edit existing task' : 'Add new task'}</h2>
        <div className="row">
          <input id="task-name"
            name="summary"
            maxLength="255"
            placeholder="Task summary"
            value={this.props.task.summary}
            onChange={this.props.onInputChange} />
        </div>
        <div className="row">
          Status:
          <select name="status" value={this.props.task.status} onChange={this.props.onInputChange}>
            {this.props.statuses.map(status => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>
        </div>
        <div className="row">
          Estimate:
          {this.props.estimateTypes.map(type => (
            <span key={type.id}>
              <input type="radio"
                name="estimate"
                id={'task-estimate-' + type.id}
                value={type.id}
                checked={this.props.task.estimate === type.id}
                onChange={this.props.onInputChange} />
              <label htmlFor={'task-estimate-' + type.id}>{type.label}</label>
            </span>
          ))}
        </div>
        <div className="row">
          <div>Business value:</div>
          {this.props.businessValueTypes.map(type => (
            <div key={type.id}>
              <input type="radio"
                name="businessValue"
                id={'task-business-value-' + type.id}
                value={type.id}
                checked={this.props.task.businessValue === type.id}
                onChange={this.props.onInputChange} />
              <label htmlFor={'task-business-value-' + type.id}><strong>{type.name}:</strong> {type.label}</label>
            </div>
          ))}
        </div>
        <div className="row">
          <input type="submit" value="Save" />
        </div>
      </form>
    );
  }
}

export default EditTaskForm;
