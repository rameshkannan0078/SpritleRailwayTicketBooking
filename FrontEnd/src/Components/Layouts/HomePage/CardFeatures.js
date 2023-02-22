import { Card, Row, Col } from 'react-bootstrap';
import   Services  from '../../Assets/Services.png';
import   Food  from '../../Assets/food.png';
import   Wifi  from '../../Assets/wifi.png';
import   Women  from '../../Assets/womenandoldman.png';
import   IndoorTOurist from '../../Assets/indoorTourist.png';
import   AllOverTheWorld from '../../Assets/allovertheworld.png';

function CardFeatures(){

  const cardsData = [
    {
      title: "24 Services",
      text: "We will provide 24/hr services. You can call using this number 138.The services will be include cleaning and water in the compartment.",
      img:Services
    },
    {
      title: "Food and Beverage",
      text: "The food will be provided for every compartment. You can call our assistance for helping with food. The food will be given to our seat. ",
      img:Food
    },
    {
      title: "Internet",
      text: "Sometimes the network wouldn't load on the areas because of train moving. We are providing the wifi facilities for all the compartment. So, you can work hassle free.",
      img:Wifi
    },
    {
      title: "Connecting All Areas",
      text: "We are connecting all over the world with International railways. So, that peoples will enjoy the ride without moving from train to train.we value our customers.",
      img:AllOverTheWorld
    },
    {
      title: "Senior Citizen",
      text: "We will provide the highest priority for all the senior citizens, girls and women. If there is problem you can call the railway police using number 182",
      img:Women
    },
    {
      title: "Tourist Package",
      text: "The tourist package will be provide extra features. It will cover all the tourist places with low cost for travelling and booking hostels.",
      img:IndoorTOurist
    },
  ];

  return(

      <Row xs={1} md={3} className="g-4" style={{ padding:'40px' }}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Col key={idx}>
          <Card style={{ height:'100%',width:'90%',margin:'auto' }}> 
            <Card.Img variant="top" src={cardsData[idx].img}   style={{ height:'70%',width:'100%' }}/>
            <Card.Body>
              <Card.Title style={{ textAlign:'center' }}><h3>{cardsData[idx].title}</h3></Card.Title>
              <Card.Text style={{ textAlign:'justify',fontFamily:'sans-serif' }}>
              {cardsData[idx].text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardFeatures;
