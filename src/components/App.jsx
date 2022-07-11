import { Component } from 'react';
import { Box } from './Box';
import { nanoid } from 'nanoid';
import { Title } from './App.styled';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    contacts: [],
    filtr: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const errorName = this.state.contacts.find(
      contact => contact.name === name
    );
    if (errorName) {
      toast.error('This contact is already added');
      return;
    }

    const contacts = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contacts, ...prevState.contacts],
    }));
  };

  deleteContacts = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContact = () => {
    const { contacts, filtr } = this.state;

    const normalizedFilter = filtr.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filtr } = this.state;

    const visibleTodos = this.getVisibleContact();

    return (
      <Box as={'main'} width="1024px" mx="auto" bg="#63c6c6" p="20px">
        <ContactForm onSubmit={this.addContacts} />
        <Title>Contacts</Title>
        <Filter value={filtr} onChange={this.changeFilter} />
        {visibleTodos.length > 0 && (
          <ContactList
            contacts={visibleTodos}
            onDeleteContact={this.deleteContacts}
          />
        )}
        <ToastContainer theme="colored" autoClose={3000} />
      </Box>
    );
  }
}
