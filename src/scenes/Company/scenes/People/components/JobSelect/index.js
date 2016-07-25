import React from 'react';
import { Button, Card, withSelect } from 'paintcan';

const jobOptions = [{
  id: '1',
  label: 'Admin/HR/Legal',
}, {
  id: '2',
  label: 'Finance/Purchasing',
}, {
  id: '3',
  label: 'Gen/Corp Management',
}, {
  id: '4',
  label: 'IT/MIS',
}, {
  id: '5',
  label: 'Nurse/NP',
}, {
  id: '6',
  label: 'Physician/MP',
}, {
  id: '7',
  label: 'RD/Engineering/Tech',
}, {
  id: '8',
  label: 'Sales/Marketing/Customer Service',
}];

const JobSelect = withSelect(
  ({ isOpen, toggleSelect, item }) => (
    <Button type="button" active={isOpen} onClick={toggleSelect}>
      {item ? item.label : 'Select a job'}
    </Button>
  ),
  ({ onSelect, jobSelectHandler }) => (
    <Card>
      <ul>
        {jobOptions.map(item => (
          <li
            key={item.id}
            onClick={() => {
              onSelect(item);
              jobSelectHandler(item);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </Card>
  )
);

export default JobSelect;
