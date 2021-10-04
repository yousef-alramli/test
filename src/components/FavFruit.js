import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Col,
  Card,
  Button,
  Modal,
  Form
} from 'react-bootstrap'
import { set } from 'mongoose';

class FavFruit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favData: [],
      id: '',
      showForm: false,
      img: '',
    }
  };

  componentDidMount = () => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND}/fav`
    };

    axios(config).then(res => {
      this.setState({
        favData: res.data
      })
    })
  };

  handleDeleteFav = (id) => {
    const config = {
      method: "DELETE",
      url: `${process.env.REACT_APP_BACKEND}/deleteFav/${id}`
    }
    axios(config).then(res => {
      this.setState({
        favData: res.data
      })
    })
  };

  handleEditForm = (id, img) => {
    this.setState({
      id: id,
      showForm: true,
      img: img
    })
  }
  handleUpdateFav = (e) => {
    e.preventDefault();
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND}/updateFav/${this.state.id}`,
      data: {
        strDrink: e.target.name.value,
        strDrinkThumb: this.state.img,
        idDrink: e.target.num.value
      }
    }
    axios(config).then(res => {
      this.setState({
        favData: res.data,
        showForm: false
      })
    })
  }
  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        <div className="row">
          {
            this.state.favData.map(item => {
              return (<>
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.strDrinkThumb} />
                    <Card.Body>
                      <Card.Title>{item.strDrink}</Card.Title>
                      <Card.Text>
                        {item.idDrink}
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.handleDeleteFav(item._id)} >Delete</Button>
                      <Button variant="primary" onClick={() => this.handleEditForm(item._id, item.strDrinkThumb)} >Edit</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>)
            })
          }

        </div>
        <Modal show={this.state.showForm} onHide={() => {
          this.setState({
            showForm: false
          })
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Updating</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={(e) => this.handleUpdateFav(e)}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Number</Form.Label>
                <Form.Control type="number" placeholder="Number" name="num" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({
                  showForm: false
                })
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default FavFruit;
