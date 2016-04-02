import Ember from 'ember';

const {
  merge
} = Ember;

import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({

  // ----- Overridden methods -----  
  serializeIntoHash(hash, typeClass, snapshot, options) {
    const serializedRecord = this.serialize(snapshot, options);
    merge(hash, serializedRecord);
  }

});
