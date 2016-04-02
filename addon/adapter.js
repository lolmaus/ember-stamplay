import Ember from 'ember';

const {
  computed: {alias},
  inject:   {service},
  String:   {underscore}
} = Ember;

import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({

  // ----- Services -----
  ajaxStamplay: service(),



  // ----- Overridden properties -----
  host: alias('ajaxStamplay.host'),

  pathForType (modelName) {
    const finalModelName = underscore(modelName);

    if (modelName === 'user') {
      return this.get('ajaxStamplay.userPath');
    }

    const objectPath = this.get('ajaxStamplay.objectPath');
    return `${objectPath}/${finalModelName}`;
  }
});
