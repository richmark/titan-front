import React, { Fragment, useState, useEffect } from "react";
import { Card, Container, Col, Row, Button, Image } from "react-bootstrap";
import { getReviewsByProductIdClient } from "../../../../src/core/admin/reviews/reviewsApi";
import _ from "lodash";

const CommentCard = sProductId => {
  const [reviews, setReviews] = useState([]);
  const [bLoadButton, setLoadButton] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const init = () => {
    getReviews();
  };

  const getReviews = () => {
    getReviewsByProductIdClient(sProductId, true, limit, offset).then(oData => {
      if (oData.error) {
        console.log(oData.error);
        return;
      }

      setOffset(limit + offset);
      if (oData.data.length % limit > 0 || oData.data.length === 0) {
        setLoadButton(false);
      }
      setReviews(reviews.concat(oData.data));
    });
  };

  const getRating = (iRate) => {
    const iCount = 5 - iRate;
    let sCheckedStar = [];
    _.times(iRate, (iIndex) => {
        sCheckedStar.push(<span key={iIndex} className="fa fa-star checked" style={{ color: "orange" }} />);
    });
    
    let sStar = [];
    _.times(iCount, (iIndex) => {
        sStar.push(<span key={iIndex} className="fa fa-star" />);
    });

    return (
        <Fragment>
            {sCheckedStar}
            {sStar}
        </Fragment>
    );
  };

  useEffect(() => {
    init();
  }, []);

  const showLoadMoreButton = () => {
    if (bLoadButton === true) {
      return (
        <Fragment>
          <Container>
            <Row>
              <Col className="text-center">
                <Button variant="warning" onClick={getReviews}>Load More</Button>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  };

  const showReviews = () => {
    if (reviews.length > 0) {
      return (
        <Container className="border border-black rounded p-5 my-4">
          <h5 className="mb-4">Comment</h5>
          {reviews.map((oReview, iIndex) => {
            return (
              <Card className='mb-3' key={iIndex}>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted product-detail-comment">
                    {oReview.user.first_name} {oReview.user.last_name} - Verified Purchase
                    <span className="ml-2">
                        {
                          getRating(oReview.rate)
                        }
                    </span>
                  </Card.Subtitle>
                  <Card.Text>
                    {oReview.comment}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
          {showLoadMoreButton()}
        </Container>
      );
    }
  };

  return <Fragment>{showReviews()}</Fragment>;
};

export default CommentCard;
