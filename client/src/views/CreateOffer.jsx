import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form } from "react-bootstrap";

import { useClient } from "hooks";

const counties = [
  "Guadalajara",
  "Tlajomulco",
  "Tlaquepaque",
  "Tonalá",
  "Zapopan",
];

const CreateOffer = () => {
  const [companies, setCompanies] = useState([]);

  const { register, handleSubmit } = useForm();

  const client = useClient();

  const onSubmit = async (data) => {
    const { companyId, position, salary, location } = data;
    await client.offers.create(position, salary, location, companyId);
  };

  useEffect(() => {
    const getCompanies = async () => {
      const companies = await client.companies.getAll();
      setCompanies(companies);
    };

    getCompanies();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create New Offer</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Company: </Form.Label>
            <Form.Select {...register("companyId")}>
              <option>Select a company</option>
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
              <option>Select a county</option>
              {counties.map((county, index) => (
                <option key={index} value={county}>
                  {county}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateOffer;
