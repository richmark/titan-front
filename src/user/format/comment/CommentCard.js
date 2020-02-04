import React, { Fragment, useState, useEffect } from "react";
import { Card, Container, Col, Row, Button, Image } from "react-bootstrap";
import { getReviewsByProductId } from "../../../../src/core/admin/reviews/reviewsApi";
import _ from "lodash";

const CommentCard = sProductId => {
  const [reviews, setReviews] = useState(false);

  const init = () => {
    getReviewsByProductId(sProductId, true).then(oData => {
      if (oData.error) {
        console.log(oData.error);
        return;
      }
      setReviews(oData.data);
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

  const showReviews = () => {
    if (reviews && reviews.length > 0) {
      return (
        <Container className="border border-black rounded p-5 mt-4">
          <h5 className="mb-4">Comments</h5>
          {reviews.map((oReview, iIndex) => {
            return (
              <Card className='mb-3' key={iIndex}>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
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
        </Container>
      );
    }
  };

  return <Fragment>{showReviews()}</Fragment>;
};

export default CommentCard;
