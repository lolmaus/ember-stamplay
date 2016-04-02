import Ember from 'ember';

const {
  inject: {service},
  RSVP: {resolve: resolvedPromise}
} = Ember;

import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({

  // ----- Arguments -----



  // ----- Services -----
  ajaxStamplay: service(),
  store:        service(),
  session:      service(),



  // ----- Overridden methods -----
  authenticate ({mode, email, password, id, authToken, user}) {
    if (mode === 'restore') {
      this.populateUser(user);
      return resolvedPromise({authToken, id});
    }

    return this
      .get('ajaxStamplay')
      .authenticate(email, password)
      .then(({user, authToken, user: {id}}) => {
        this.populateUser(user);
        return {authToken, id};
      });
  },

  restore (data) {
    return this
      .get('ajaxStamplay')
      .restore(data)
      .then(({user}) => {
        this.populateUser(user);
        return data;
      });
  },

  invalidate () {
    return this
      .get('ajaxStamplay')
      .invalidate()
      .then(() => {
        this.removeUser();
      });
  },



  // ----- Custom methods -----
  populateUser (payload) {
    const store             = this.get('store');
    const normalizedPayload = store.normalize('user', payload);
    const currentUser       = store.push(normalizedPayload);
    const session           = this.get('session');
    session.setProperties({currentUser});
    return currentUser;
  },

  removeUser () {
    const session = this.get('session');
    session.set('currentUser', null);
  }
});
