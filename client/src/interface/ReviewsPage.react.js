// @flow

import * as React from "react";

import { Alert, Page, Grid, Button, Card, Table, Icon, Avatar, Form } from "tabler-react";
//import Autocomplete from 'react-autocomplete';
import Dotdotdot from 'react-dotdotdot';
import moment from 'moment';
import SiteWrapper from "../SiteWrapper.react";

const R = {
  "length": 5,
  "reviews": [
  {
  "source": "TripAdvisor",
  "author": "Edward-AA",
  "avatar": "https://media-cdn.tripadvisor.com/media/photo-s/01/2e/70/67/avatar045.jpg",
  "rating": "50",
  "date": "12 January 2019",
  "title": "Always excellent ",
  "url": "http://en.tripadvisor.com.hk/ShowUserReviews-g294217-d11772135-r645929965-Hilton_Garden_Inn_Hong_Kong_Mongkok-Hong_Kong.html",
  "description": "I stayed in this Hyatt Regency property in downtown Kowloon for one night. You cant beat the location as it is located in Tsim Sha Tsui and you can go anywhere from the hotel conveniently because the subway station is below the hotel. There is also a big shopping mall, K11, that is directly connected to the hotel.Being a Gloablist the hotel treats you great - upgrade to a better room or suites (subject to availability), access to the Regency Club at 23/F for complimentary hot breakfast and evening cocktail. Wi-Fi is free and upgraded to premium service.My suites at 17/F is nice. It is not facing the Victoria Harbor directly but I do appreciate the upgrade. The suites is big and well equipped with coffee machine and different bathroom amentities. There is also a standalone shower and a separate bathtub.The regency club at 23/F has a nice view of the city and the harbor. The food is great and the service is above par. There is also a PC and a printer for one to use.There is a fitness room at 10/F that opens 24/7. Majority of the equipments are caloric based (there are many) but there are only limited weight equipment, dumbballs and yoga balls. Cold bottles of waters are provided that are nice touch!There is a bar and a restaurant inside the hotel but food is always not a problem when you are in the central downtown area."
  },
  {
  "source": "TripAdvisor",
  "author": "57peerk",
  "avatar": "https://media-cdn.tripadvisor.com/media/photo-l/15/ea/ff/4d/caption.jpg",
  "rating": "50",
  "date": "31 December 2018",
  "title": "Your home to discover Hong Kong",
  "description": "We stayed there for 8 nights to discover HK over Xmas. We booked a club-room with harbor view and, each time we woke up, we were greeted by the fantastic & bustling scenic of the harbor. Simply breathtaking ! The Café restaurant offered delicious breakfast and dinner buffets with finest international and local dishes. Perfectly located in the heart of HK, major points of interest are located in walking distance and a subway station gate is just opposite this hotel. Last but not least, service and attention provided by the hotel staff were both excellent. Thank you.Dear Peer K, it was a pleasure to learn that you enjoyed the harbor view from the room. Thank you for the positive review, we were delighted to receive such recognition. Thank you for choosing to stay with us for Christmas. Please come again on your next visit to Hong Kong, we look forward to your return soon. Best regards, Per Kredner - General Manager"
  },
  {
  "source": "TripAdvisor",
  "author": "cindyxxly97",
  "avatar": "https://media-cdn.tripadvisor.com/media/photo-s/01/2e/70/57/avatar030.jpg",
  "rating": "10",
  "date": "10 January 2019",
  "title": "Worst service ever",
  "description": "For my mother’s birthday, I chose to stay at Hyatt. I requested room decoration for my mom to surprise her and wrote it clearly in the reservation. When we arrive, the hotel didn’t only fail to decorate, but also gave us a room on the smoking floor without asking or informing us ahead of time. We asked to switch to nonsmoking room since the room was simply filled with cigarette smell. The front desk never apologized and refused our request. After we requested the fifth time, the hotel finally agreed to switch room but at the same time degrading our room from ocean view to normal (150$ difference) room and again, without apologizing. Hyatt definitely let us down and made my mom very sad on her birthday. This was the worst five star hotel experience ever. Will NOT come back in the futureDear cindyxxly97, thank you very much for the review following your recent stay. I was concerned to learn of your disappointment with our service and room arrangement. I wish to take this opportunity to extend my apology and seek your patience. Your valuable feedback will be shared with our management team as we strive for consistent high standards on every future occasion. I understand we have fallen short on this recent stay, I do hope you may re-consider to return in the future. Best regards, Per Kredner - General Manager"
  },
  {
  "source": "TripAdvisor",
  "author": "Travel767268",
  "avatar": "https://media-cdn.tripadvisor.com/media/photo-s/01/2e/70/93/avatar019.jpg",
  "rating": "50",
  "date": "8 January 2019",
  "title": "休暇で利用",
  "description": "立地も良く、素晴らしい施設。ホテル周辺にはレストランやバーも多く不自由なく滞在できました。香港には年に数回訪れるので次回も利用したいです。"
  },
  {
  "source": "TripAdvisor",
  "author": "Chetan_V",
  "avatar": "https://media-cdn.tripadvisor.com/media/photo-l/16/01/8a/02/chetan-v.jpg",
  "rating": "40",
  "date": "7 January 2019",
  "title": "Great hotel with good customer service, ideal location",
  "description": "We stayed at Hyatt Regency from 28-Dec to 30-Dec-2018. We had nice experience at the time of checkin. Room is good and house keeping is very helpful. Great welcome message on TV.Club lounge (23rd floor) experience is good. Concierge team is outstanding.Hotel is located near Tsim Sha Tsui MTR station, which helps.They certainly deserve 5 star but when I compare them to my recent Grand Hyatt Singapore stay, they certainly run short of 5 star.Overall best of all my stays at Hong Kong hotels. I'll consider them in future."
  }
  ]
  };

  const post =  async ({body, endpoint}) => fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

// const menuStyle={
//   position: 'absolute', 
//   top: 52, 
//   left: -90,  
//   width: 'calc(100% - 48px)',
//   transform: 'translate3d(114px, 38px, 0px)', 
//   willChange: 'transform',
//   overflow: 'auto',
//   maxHeight: '50%',
//   };
const parseSocial = ({source, url}) => {
  let src = null;
  console.log('url?', url);
  switch (source) {
    case 'Google': {
      src = require("../data/social/googleg_48dp.png");
      break;
    }
    case 'TripAdvisor': {
      src = require("../data/social/tripadvisor.png");
      break;
    }
    case 'Facebook': {
      src = require("../data/social/facebook.png");
      break;
    }
    case 'Dianping': {
      src = require("../data/social/dianping.png");
      break;
    }
    default:
    break;
  }
  return (
    <React.Fragment>
      <img src={src} height={14} alt="icon" width={14} style={{marginBottom: 4, marginRight: 4}} /> 
      {url ? 
        <a href={url} target="_blank" rel="noopener">{source}</a>
        : 
        <span>{source}</span> 
      }
    </React.Fragment>
  )
}

const data = [
  {displayValue: 'a'},
  {displayValue: 'b'}
]

const Review = (review) => (
  <React.Fragment>
    <div style={{float: 'left', display: 'block', paddingRight: 10, paddingTop: 5}}>
      <Avatar size="l" imageURL={review.avatar} />
    </div>
    <React.Fragment>
      <div>
        {[...Array(review.stars)].map((a, index)=>
        <span style={{paddingRight: 3}}>
          <Icon key={index} prefix="fa" name="star" />
        </span>)}
        {[...Array(5-review.stars)].map((a, index)=>
        <span style={{paddingRight: 3}}>
          <Icon key={index} prefix="fa" name="star-o" />
        </span>)}
        {/* <span style={{marginLeft: 12}}>{review.title && review.title}</span> */}
      </div>
   
      <div>
        <span style={{fontWeight: 700, marginRight: 12}}>
          {review.author}
        </span>
        <span style={{marginRight: 12}}>
          on {parseSocial({source:review.source, url: review.url})}
        </span>
        {moment(review.date).fromNow()}
      </div>
      {review.title && 
        <p style={{marginLeft: 42, marginTop: 12, fontStyle:'italic'}}>
          {review.title}
        </p>
      }
      <Dotdotdot clamp={4}>
        <p style={{marginLeft: 42, marginBottom: 0}}>
          {review.description}
        </p>
			</Dotdotdot>
      {review.translation && 
        <div style={{marginLeft: 42}}>
          <Button color="secondary" size="sm" outline >Google Translate</Button>
        </div>} 
      {review.response &&
        <div style={{marginLeft: 42, marginTop: 12}}>
          <Alert  type="secondary">
            {review.response.description}
          </Alert>
        </div>
      }
    </React.Fragment>
  </React.Fragment>
)

class ReviewsPage extends React.PureComponent<Props, State> {
  state = {
    value: '',
    reviews: R.reviews, // TODO: set to ''
  };
  componentDidMount() {
    //this.getReviews().then(res=>this.setState({reviews:res.reviews}, ()=>this.setTranslation()));
    this.setTranslation();
  }
  setTranslation = () => {
    let {reviews} = this.state;
    let translatedReviews = [];
    let counter = 0;
    reviews.forEach((r, index)=>this.getTranslation(r.description).then(t=>{
      if (t.from.language.iso !== 'en') {
        r.translation = t.text;
      }
      translatedReviews[index] = r;
      counter += 1;
      if (counter === reviews.length) {
        this.setState({reviews:translatedReviews});
      }
    }));
  }
  getTranslation = async (text) => {
    const response = await post({endpoint: '/util/translate', body:{text: text}});
    const body = await response.json();
    await console.log(body);
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }
  getReviews = async () => {
    const response = await fetch('/review');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  render() {
    const mappedReviews = this.state.reviews.map(r=>{
      return {
        author: r.author,
        avatar: r.avatar,
        source: r.source,
        stars: parseInt(r.rating.charAt(0), 10),
        date: moment(r.date).toDate(),
        description: r.description,
        title: r.title,
        translation: r.translation,
        response: r.response,
        url: r.url
      }
    })
    return (
      <SiteWrapper>
      <Page.Content title="Reviews" subTitle="1 - 5 of 70 reviews" >
        <Grid.Row>
          <Grid.Col md={9}>
          <Card>
            <Table className="card-table table-vcenter">
              <Table.Body>
                {mappedReviews.map(review=>(
                  <Table.Row style={{marginBottom:12}}>
                    <Table.Col>
                      {Review(review)}
                    </Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
          </Grid.Col>
          {/* <Grid.Col sm={6} lg={6}>
          <Card>
            <Card.Header>
              <Card.Title children="Review Invitation" />
            </Card.Header>
            <Card.Body>
              
            <Autocomplete
                getItemValue={(item) => item.label}
              items={[
                { label: 'apple' },
                { label: 'banana' },
                { label: 'pear' }
              ]}
              wrapperStyle={{}}
              renderMenu={(items, value, style) =>
                <div style={menuStyle} className="dropdown-menu show" data-placement="bottom"children={items}/>
              }
              renderItem={(item, isHighlighted) =>
                <a className="dropdown-item" style={{background: isHighlighted ? '#f8f9fa' : '#ffff'}}>         
                {item.label}
                </a>
              }
              renderInput={props=> (
                <Form.Group label="Name">
                  <input {...props} style={{width: '100%'}}className="form-control" type="text" />
                </Form.Group>
              )
            }
              value={this.state.value}
              onChange={(e) => this.setState({value: e.target.value})}
              onSelect={(val) => this.setState({value:val})}
            />
              <Form.Group label="Phone or email">
                <Form.Input name="Phone" placeholder="(212) 312-7821" />
              </Form.Group>
              <Form.Group
                  label={<Form.Label children="Start Message With..." />}
                >
                  <Form.Textarea
                    name="example-textarea"
                    rows={6}
                    placeholder="Content.."
                    defaultValue=" Hey Aaron,
                    Thanks again for coming in. Here's the link I was
                    talking about to leave a review. Have a great day!"
                  />
              </Form.Group>
            </Card.Body>
          </Card>
          </Grid.Col> */}
          <Grid.Col md={3}>
              <Card>
                <Card.Body>
                  <Form.Group label="Time Period">
                  <Form.Select>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group label="Review Source">
                <Form.Checkbox
                  checked
                  name="example-radios"
                  label={<span>{parseSocial({source: 'Google'})}</span>}
                  value="option1"
                />
                <Form.Checkbox
                name="example-radios"
                label={<span>{parseSocial({source: 'TripAdvisor'})}</span>}
                value="option1"
                />      
                <Form.Checkbox
                  name="example-radios"
                  label={<span>{parseSocial({source: 'Dianping'})}</span>}
                  value="option1"
                />
                
              </Form.Group>
                </Card.Body>
              </Card>
            </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
  }
}

export default ReviewsPage;
