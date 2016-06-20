import React from 'react';
import DevTools from './DevTools';
import Button from '../components/Button';
import Dropdown from '../ui/Dropdown';
import Modal from '../ui/Modal';
import DropdownMenu from '../components/Dropdown/DropdownMenu';

const App = () => (
  <div>
    <p>Hello world!</p>
    <Dropdown>
      <Button text="Open up!" />
      <DropdownMenu>
        <button className="dropdown-item" type="button">Action</button>
      </DropdownMenu>
    </Dropdown>
    <Dropdown>
      <a href="#" className="dropdown-toggle">Hello! </a>
      <DropdownMenu>
        <button className="dropdown-item" type="button">Action</button>
        <button className="dropdown-item" type="button">Action</button>
      </DropdownMenu>
    </Dropdown>
    <Modal type="primary" size="lg" text="Open modal!">
      <div className="modal-body">
        <p>Hello!</p>
      </div>
    </Modal>
    <DevTools />
  </div>
);

export default App;
