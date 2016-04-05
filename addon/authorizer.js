import Ember from 'ember';

const {
  isEmpty
} = Ember;

import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

export default BaseAuthorizer.extend({

  // ----- Overridden methods -----
  authorize({authToken}, block) {
    if (!isEmpty(authToken)) {
      block('x-stamplay-jwt', authToken);
    }
  }
});
