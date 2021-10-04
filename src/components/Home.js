import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Col,
  Card,
  Button
} from 'react-bootstrap'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fruitData: [],

    }
  }
  componentDidMount = async () => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND}/fruit`
    }
    await axios(config).then(res => {
      this.setState({
        fruitData: res.data.drinks
      })
    })
  }
  handleAddToFav = async (title, url, num) => {
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND}/createFav`,
      data: {
        strDrink: title,
        strDrinkThumb: url,
        idDrink: num
      }
    }
    await axios(config)
  }
  render() {
    return (
      <>
        <h1>API Fruits</h1>
        <div className="row">
          {
            this.state.fruitData.map(item => {
              return (<>
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.strDrinkThumb} />
                    <Card.Body>
                      <Card.Title>{item.strDrink}</Card.Title>
                      <Card.Text>
                        {item.idDrink}
                      </Card.Text>
                      <Button variant="primary" onClick={() => this.handleAddToFav(item.strDrink, item.strDrinkThumb, item.idDrink)} >Add to Favs</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>)
            })
          }

        </div>

      </>
    )
  }
}

export default Home;
