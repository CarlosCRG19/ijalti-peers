import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { useClient } from "hooks";

const renderOffer = ({ offer, deleteOffer }) => (
  <Col lg={6} key={offer.id}>
    <Card>
      <Card.Header>
        <Card.Title>{offer.position}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {offer.company?.businessName}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Location: </strong>
          {offer.location}
        </Card.Text>
        <Card.Text>
          <strong>Salary: </strong>
          {offer.salary}
        </Card.Text>
        <Button
          variant="danger"
          className="mt-3"
          onClick={() => deleteOffer(offer.id)}
        >
          Delete
        </Button>
        <Button
          className="mx-2 mt-3"
          variant="warning"
          href={`/edit/${offer.id}`}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  const client = useClient();

  const deleteOffer = async (id) => {
    await client.offers.delete(id);

    const newOffers = offers.filter((offer) => offer.id !== id);
    setOffers(newOffers);
  };

  useEffect(() => {
    const getOffers = async () => {
      const offers = await client.offers.getAll();
      setOffers(offers);
    };

    getOffers();
  }, []);

  return (
    <>
      <h3 className="mb-3">Offer List</h3>
      <Row>{offers.map((offer) => renderOffer({ offer, deleteOffer }))}</Row>
    </>
  );
};

export default OfferList;
