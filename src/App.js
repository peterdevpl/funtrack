import './App.css';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const defaultStatuses = [
    {
      id: 'backlog',
      name: 'Backlog',
      stage: 1,
    },
    {
      id: 'in-progress',
      name: 'In progress',
      stage: 2,
    },
    {
      id: 'done',
      name: 'Done',
      stage: 3,
    },
  ];

  const estimateTypes = [
    {
      id: 'trivial',
      label: 'Trivial (up to 1 day)',
      weight: 5,
    },
    {
      id: 'days',
      label: '1 to 5 days',
      weight: 3,
    },
    {
      id: 'weeks',
      label: 'Several weeks',
      weight: 1,
    },
  ];

  const businessValueTypes = [
    {
      id: 'critical',
      name: 'Critical',
      label: 'sudden production issues',
      weight: 1,
    },
    {
      id: 'important',
      name: 'Important',
      label: 'impacts the growth, but can be done tomorrow',
      weight: 3,
    },
    {
      id: 'low',
      name: 'Nice-to-have',
      label: 'can be done in free time, any time',
      weight: 6,
    },
  ];

  const statuses = JSON.parse(localStorage.getItem('statuses')) || defaultStatuses;
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const projectName = 'TASK';

  return (
    <div className="App">
      <Dashboard projectName={projectName}
        statuses={statuses}
        tasks={tasks}
        estimateTypes={estimateTypes}
        businessValueTypes={businessValueTypes} />
    </div>
  );
}

export default App;
