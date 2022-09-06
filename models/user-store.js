'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  updateName(user, firstName, lastName) {
    user.firstName = firstName;
    user.lastName = lastName;
    this.store.save();
  },

  updateEmail(user, email) {
    user.email = email;
    this.store.save();
  },

  updatePassword(user, email) {
    user.password = password;
    this.store.save();
  },

  removeUser(id) {
    const user = this.getUserById(id);
    this.store.remove(this.collection, user);
    this.store.save();
  }
};

module.exports = userStore;