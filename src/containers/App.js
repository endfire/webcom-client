import React from 'react';
import DevTools from './DevTools';
import { Button, DropdownItem, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ButtonDropdown from '../ui/ButtonDropdown';
import Tooltip from '../ui/Tooltip';
import Modal from '../ui/Modal';

const App = () => (
  <div>
    <p>Hello world!</p>
    <Button color="danger">Danger!</Button>
    <ButtonDropdown text="Dropdown yo" caret>
      <DropdownItem header>Header</DropdownItem>
      <DropdownItem>Item</DropdownItem>
      <DropdownItem divider />
    </ButtonDropdown>

    <Tooltip
      target={<p>I am a tooltip</p>}
      placement="right"
      target="test"
    >
      {"This is a tooltip"}
    </Tooltip>

    <Modal target={<Button color="danger" size="lg">Modal time!</Button>}>
      <ModalHeader hasToggle>Header</ModalHeader>
      <ModalBody><h1>Body yo!</h1></ModalBody>
      <ModalFooter>
        <Button color="primary" hasToggle>Do Something</Button>
        <Button color="secondary" hasToggle>Cancel</Button>
      </ModalFooter>
    </Modal>
    <DevTools />
  </div>
);

export default App;
