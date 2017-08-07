import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {
  Container,
  Content,
  Form,
  List,
  ListItem,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text
} from 'native-base';

import { StyleSheet, Alert } from 'react-native';

export default class FormRegister extends ValidationComponent {

  render() {
    return (
      <Form>
        <ListItem itemDivider>
          <Text style={styles.labelText}>ROLE</Text>
        </ListItem>
        <Picker
          style={styles.picker}
          placeholder="Role"
          mode="dropdown"
          selectedValue={this.state.role}
          onValueChange={this.onValueChange.bind(this)}
        >
          {role.map(component => (
            <Item key={component.value} label={component.label} value={component.label} />
          ))}
        </Picker>
        <ListItem itemDivider>
          <Text style={styles.labelText}>FORM</Text>
        </ListItem>
        <Item floatingLabel>
          <Label>First Name</Label>
          <Input onChangeText={text => this.setState({ firstName: text })} value={this.state.firstName} />
        </Item>
        <Item floatingLabel>
          <Label>Last Name</Label>
          <Input onChangeText={text => this.setState({ lastName: text })} value={this.state.lastName} />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input onChangeText={text => this.setState({ email: text })} value={this.state.email} />
        </Item>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input onChangeText={text => this.setState({ username: text })} value={this.state.username} />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input secureTextEntry onChangeText={text => this.setState({ password: text })} value={this.state.password} />
        </Item>
      </Form>
    );
  }
}
