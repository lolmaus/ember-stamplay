import Ember from 'ember';

const {
  get,
  merge,
  String: {underscore}
} = Ember;

import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({

  // ----- Overridden methods -----
  extractRelationship(relationshipModelName, item) {
    if (item instanceof Array) {
      item = item.length ? item[0] : null;
    }

    return this._super(relationshipModelName, item);
  },

  keyForAttribute:    underscore,
  keyForRelationship: underscore,

  normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
    const arrayPayload = payload.data.slice();
    arrayPayload.meta  = payload.pagination;

    return this._super(store, primaryModelClass, arrayPayload, id, requestType);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    if (this.mustNotSerialize(relationship)) {
      return;
    }

    this._super(snapshot, json, relationship);

    if (relationship.type === 'user') {
      return;
    }

    const key = this.keyForRelationship(relationship.key);
    const id  = json[key];

    json[key] = id? [id]: [];
  },

  serializeHasMany (snapshot, json, relationship) {
    if (this.mustNotSerialize(relationship)) {
      return;
    }

    this._super(snapshot, json, relationship);
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    const serializedRecord = this.serialize(snapshot, options);
    merge(hash, serializedRecord);
  },



  // ----- Custom Methods -----
  mustNotSerialize(relationship) {
    const key   = relationship.key;
    const attrs = get(this, 'attrs');
    return attrs && attrs[key] && attrs[key].serialize === false;
  },

});
