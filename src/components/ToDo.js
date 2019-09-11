import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const ToDo = ({ _id, title, description, completed, toggleEdit, editItem }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    editItem({ _id, completed: !completed })
      .then(setLoading(false))
  }

  return (
    <Card className='mt-3'>
      <Card.Header>
        <Button variant='secondary' className='mx-3 float-left' onClick={toggleEdit}>Edit Item</Button>
        <strong>{title}</strong>
        {completed && ' COMPLETED'}
        <Button
          variant={completed ? 'secondary' : 'primary'}
          className='float-right'
          onClick={handleClick}
        >{loading ?
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          :
          completed
            ?
            'Remove Complete'
            :
            'Mark Complete'
          }
        </Button>
      </Card.Header>
      <Card.Body>{description}</Card.Body>
    </Card>
  )
}

export default ToDo;