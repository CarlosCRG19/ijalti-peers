import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form } from "react-bootstrap";

import { useClient } from "hooks";

const CreateCompany = () => {
  const { register, handleSubmit } = useForm();

  const client = useClient();

  const onSubmit = async (data) => {
    await client.companies.create(data.businessName, data.password);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create New Company</Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Business Name: </Form.Label>
            <Form.Control type="text" {...register("businessName")} />
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" {...register("password")} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateCompany;
