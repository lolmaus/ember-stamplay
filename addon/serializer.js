import Ember from 'ember';

const {
  merge
} = Ember;

import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({

  // ----- Overridden methods -----
  // extractMeta: function(store, typeClass, payload) {
  //   if (payload && payload.pagination) {
  //     store.setMetadataFor(typeClass, payload.pagination);
  //     delete payload.pagination;
  //   }
  // },

  normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
    const arrayPayload = payload.data.slice();
    arrayPayload.meta  = payload.pagination;

    return this._super(store, primaryModelClass, arrayPayload, id, requestType);
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    const serializedRecord = this.serialize(snapshot, options);
    merge(hash, serializedRecord);
  }

});
