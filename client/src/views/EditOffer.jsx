import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useClient } from "hooks";

const counties = [
  "Guadalajara",
  "Tlajomulco",
  "Tlaquepaque",
  "Tonalá",
  "Zapopan",
];

const EditOffer = () => {
  const [companies, setCompanies] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const client = useClient();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { position, salary, location } = data;
    await client.offers.update(params.offerId, position, salary, location);

    navigate("/");
  };

  useEffect(() => {
    const getInitialOffer = async () => {
      const offer = await client.offers.getById(params.offerId);
      reset({ ...offer });
    };

    const getCompanies = async () => {
      const companies = await client.companies.getAll();
      setCompanies(companies);
    };

    getInitialOffer();
    getCompanies();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Update Offer</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Company: </Form.Label>
            <Form.Select {...register("companyId")} disabled>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.businessName}
                </option>
              ))}
            </Form.Select>
            <Form.Label>Position: </Form.Label>
            <Form.Control type="text" {...register("position")} />
            <Form.Label>Salary: </Form.Label>
            <Form.Control type="number" {...register("salary")} />
            <Form.Label>Location: </Form.Label>
            <Form.Select {...register("location")}>
              {counties.map((county, index) => (
                <option key={index} value={county}>
                  {county}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditOffer;
