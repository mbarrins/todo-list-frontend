import React from 'react';
import ToDo from './components/ToDo'
import ToDoForm from './components/ToDoForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import API from './adapters/API'

class App extends React.Component {
  state = {
    items: [],
    loading: false,
    showAddForm: false,
    editIds: [],
    page: 1
  }

  componentDidMount() {
    this.setState({ loading: true })

    API.getItems()
      .then(data => this.setState({ items: data.sort((a, b) => a._id < b._id ? 1 : -1), loading: false }))
  }

  toggleForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm })
  }

  addItem = item => {
    return API.postItem(item)
      .then(item => this.setState({ items: [item, ...this.state.items] }))
  }

  deleteItem = item => {
    API.deleteItem(item)
      .then(this.setState({ items: this.state.items.filter(each => each._id !== item._id) }))
  }

  editItem = item => {
    return API.patchItem(item)
      .then(item => this.setState({ items: this.state.items.map(each => each._id === item._id ? item : each) }))
  }

  toggleEdit = item => {
    const { editIds } = this.state
    this.setState({ editIds: editIds.includes(item._id) ? editIds.filter(id => id !== item._id) : [...editIds, item._id] })
  }

  render() {
    const { items, editIds, showAddForm, page } = this.state
    const displayNumber = 5
    const startNumber = displayNumber * (page - 1)
    const displayItems = items.slice(startNumber, startNumber + displayNumber)

    if (this.state.loading) return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )

    return (
      <Container className='App'>
        <Row>
          <Col xs={8} className='text-center'>
            <h1>
              To Do List
              {!showAddForm && <Button variant='secondary' className='float-right' onClick={this.toggleForm}>Add New Item</Button>}
            </h1>
            {showAddForm && <ToDoForm toggleForm={this.toggleForm} handleSubmit={this.addItem} />}
            {displayItems.map(item => (
              editIds.includes(item._id) ?
                <ToDoForm key={item._id} {...item} deleteItem={e => this.deleteItem(item)} toggleForm={() => this.toggleEdit(item)} handleSubmit={this.editItem} />
                :
                <ToDo key={item._id} {...item} toggleEdit={() => this.toggleEdit(item)} editItem={this.editItem} />
            ))}
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs={8} className='text-center'>
            {page > 1 && <Button className='float-left' onClick={() => this.setState({ page: page - 1 })}>Previous</Button>}
            {items.length > startNumber + displayNumber && <Button className='float-right' onClick={() => this.setState({ page: page + 1 })}>Next</Button>}
          </Col>
        </Row>
      </Container >
    )
  }
}

export default App;
