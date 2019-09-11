import React from 'react';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

const ToDo = ({ _id, title, description, completed, toggleEdit, editItem }) => {
  return (
    <Card className='mt-3'>
      <Card.Header>
        <Button variant='secondary' className='mx-3 float-left' onClick={toggleEdit}>Edit Item</Button>
        <strong>{title}</strong>
        {completed && ' COMPLETED'}
        <Button
          variant={completed ? 'secondary' : 'primary'}
          className='float-right'
          onClick={e => editItem({ _id, title, description, completed: !completed })}
        >{completed ? 'Remove Complete' : 'Mark Complete'}</Button>
      </Card.Header>
      <Card.Body>{description}</Card.Body>
    </Card>
  )
}

export default ToDo;