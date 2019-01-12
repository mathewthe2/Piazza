// @flow

import * as React from "react";

import { Page, Grid, Card, Table, Icon, Avatar } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";

const TEST_REVIEWS = [
  {
    author: 'Becky',
    source: 'Facebook',
    stars: 4,
    date: new Date(),
    description: 'Good location. Nice hosts. This is going to asdfasdfasdfasdfasdfasdf2 asdfasdfasdf asdfasdf asdf asdf asdf asdf asdf 14f1f 4f  wef1 ef12ef '
  },
  {
    author: 'Arthur',
    source: 'Google',
    stars: 5,
    date: new Date(),
    description: 'Really nice experience.'
  }
]

const Review = (review) => (
  <React.Fragment>
    <div style={{float: 'left', display: 'block', paddingRight: 10}}>
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
   
      <div style={{fontWeight: 700}}>
        {review.author}
      </div>
      <p style={{marginLeft: 42}}>
        {review.description}
      </p>
    </React.Fragment>
  </React.Fragment>
)

function AnalyticsPage(): React.Node {
  return (
    <SiteWrapper>
      <Page.Content title="Analytics">
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
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default AnalyticsPage;
