import { Component } from 'react';
import { Box } from './Box';
import { nanoid } from 'nanoid';
import { Title } from './App.styled';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const errorName = this.state.contacts.find(
      contact => contact.name === name
    );
    if (errorName) {
      alert('This contact is already added');
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
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleTodos = this.getVisibleContact();

    return (
      <Box as={'main'} width="1024px" mx="auto" bg="#63c6c6" p="20px">
        <ContactForm onSubmit={this.addContacts} />
        <Title>Contacts</Title>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleTodos}
          onDeleteContact={this.deleteContacts}
        />
      </Box>
    );
  }
}
