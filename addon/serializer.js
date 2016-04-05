import Ember from 'ember';

const {
  merge,
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
  extractRelationship(relationshipModelName, item) {
    if (item instanceof Array) {
      item = item.length ? item[0] : null;
    }

    return this._super(relationshipModelName, item);
  },

  normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
    const arrayPayload = payload.data.slice();
    arrayPayload.meta  = payload.pagination;

    return this._super(store, primaryModelClass, arrayPayload, id, requestType);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    if (relationship.options.serialize === false) {
      return;
    }

    this._super(snapshot, json, relationship);

    if (relationship.type === 'user') {
      return;
    }

    const key        = relationship.key;
    const id         = json[key];

    json[key] = id? [id]: [];
  },

  serializeHasMany (snapshot, json, relationship) {
    if (relationship.options.serialize === false) {
      return;
    }

    return this._super(snapshot, json, relationship);
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    const serializedRecord = this.serialize(snapshot, options);
    merge(hash, serializedRecord);
  }

});
