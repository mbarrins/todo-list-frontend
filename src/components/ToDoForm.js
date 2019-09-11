import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import API from '../adapters/API'

class ToDoForm extends React.Component {
  state = {
    _id: '',
    title: '',
    description: '',
    loading: false
  }

  componentDidMount() {
    const { _id, title, description } = this.props
    this.setState({
      _id: _id || '',
      title: title || '',
      description: description || ''
    })
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { loading, ...item } = this.state

    if (item._id === '') delete item._id;

    this.props.handleSubmit(item)
      .then(this.props.toggleForm())
      .then(this.setState({ loading: false }))
  }

  render() {
    const { loading, title, description, _id } = this.state

    if (loading) return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )

    return (
      <Form className='text-left' onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" placeholder="Title" value={title} onChange={(e) => this.handleChange('title', e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="description" placeholder="Description" value={description} onChange={(e) => this.handleChange('description', e.target.value)} />
        </Form.Group>
        <ButtonToolbar>
          <Button variant="primary" className='mx-5' type="submit">
            Submit
          </Button>
          {_id !== '' && <Button variant='danger' className='mx-5' onClick={this.props.deleteItem}>
            Delete
          </Button>}
          <Button variant="secondary" className='mx-5' onClick={this.props.toggleForm}>
            Cancel
          </Button>
        </ButtonToolbar>
        <hr />
      </Form>
    )
  }
}

export default ToDoForm;