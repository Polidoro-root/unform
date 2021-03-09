import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import Input from './components/Form/Input';
import * as Yup from 'yup';

const user = {
  name: 'Diego',
  address: {
    street: 'Rua teste',
    number: 123,
  },
};

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O email é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      const errorMessages = {};

      err.inner.forEach((error) => (errorMessages[error.path] = error.message));

      formRef.current.setErrors(errorMessages);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Diego',
        email: 'Diego@rocketseat.com.br',
        address: {
          city: 'Rio do sul',
        },
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email" />

        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
