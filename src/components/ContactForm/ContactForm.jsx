import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import {
  Title,
  Text,
  Btn,
  FormContact,
  FormInput,
  ErrorForm,
} from './ContactForm.styled';
import * as yup from 'yup';

import { Box } from 'components/Box';
import { Component } from 'react';

const values = { name: '', number: '' };

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
});

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    const contactValue = values;
    this.props.onSubmit(contactValue);
    resetForm();
  };

  render() {
    return (
      <Box
        as="section"
        mb="20px"
        mx="auto"
        width="400px"
        border="1px solid"
        p="20px"
      >
        <Title>Phonebook</Title>
        <Formik
          initialValues={values}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          <FormContact>
            <label>
              <Text>Name</Text>
              <FormInput type="text" name="name" />
              <ErrorMessage name="name" component={ErrorForm} />
            </label>
            <label>
              <Text>Number</Text>
              <FormInput type="tel" name="number" />
              <ErrorMessage name="number" component={ErrorForm} />
            </label>
            <Btn type="submit">Add contact</Btn>
          </FormContact>
        </Formik>
      </Box>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
