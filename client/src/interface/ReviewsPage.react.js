// @flow

import * as React from "react";

import { Page, Grid, Button, Card, Table, Icon, Avatar, Form, DropDown } from "tabler-react";
import Autocomplete from 'react-autocomplete';
import moment from 'moment';
import SiteWrapper from "../SiteWrapper.react";
const menuStyle={
  position: 'absolute', 
  top: 52, 
  left: -90,  
  width: 'calc(100% - 48px)',
  transform: 'translate3d(114px, 38px, 0px)', 
  willChange: 'transform',
  overflow: 'auto',
  maxHeight: '50%',
  };
const parseSocial = source => {
  let src = null;
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
      on <img src={src} height={14} width={14} style={{marginBottom: 4}} /> {source}
    </React.Fragment>
  )
}

const TEST_REVIEWS = [
  {
    author: 'Becky',
    source: 'Dianping',
    stars: 4,
    date: new Date(),
    description: 'Good location. Nice hosts. This is going to asdfasdfasdfasdfasdfasdf2 asdfasdfasdf asdfasdf asdf asdf asdf asdf asdf 14f1f 4f  wef1 ef12ef '
  },
  {
    author: 'Arthur',
    source: 'TripAdvisor',
    stars: 5,
    date: new Date(),
    description: 'Really nice experience.'
  }
]

const data = [
  {displayValue: 'a'},
  {displayValue: 'b'}
]

const Review = (review) => (
  <React.Fragment>
    <div style={{float: 'left', display: 'block', paddingRight: 10, paddingTop: 5}}>
      <Avatar size="l" imageURL="/demo/faces/female/29.jpg" />
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
      </div>
   
      <div>
        <span style={{fontWeight: 700, marginRight: 12}}>
          {review.author}
        </span>
        <span style={{marginRight: 12}}>
          {parseSocial(review.source)}
        </span>
        {moment(review.date).fromNow()}
      </div>
      <p style={{marginLeft: 42}}>
        {review.description}
      </p>
    </React.Fragment>
  </React.Fragment>
)

class ReviewsPage extends React.PureComponent<Props, State> {
  state = {
    value: '',
  };
  render() {
    return (
      <SiteWrapper>
      <Page.Content title="Reviews">
        <Grid.Row>
          <Grid.Col sm={6} lg={6}>
          <Card>
            <Table className="card-table table-vcenter">
              <Table.Body>
                {TEST_REVIEWS.map(review=>(
                  <Table.Row>
                    <Table.Col>
                      {Review(review)}
                    </Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
          </Grid.Col>
          <Grid.Col sm={6} lg={6}>
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
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
  }
}

export default ReviewsPage;
