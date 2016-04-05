/* jshint ignore:start */
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const {
  computed: {alias},
  copy,
  inject:   {service},
  RSVP,
  String:   {underscore}
} = Ember;

import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend(DataAdapterMixin, {

  // ----- Arguments -----
  PER_PAGE: 20,



  // ----- Services -----
  ajaxStamplay: service(),



  // ----- Overridden properties -----
  host: alias('ajaxStamplay.host'),
  
  
  
  // ----- Static properties -----
  authorizer: 'authorizer:stamplay',



  // ----- Overridden methods -----
  findAll(store, ModelClass/*, sinceToken, snapshotRecordArray*/) {
    const per_page = this.get('PER_PAGE');

    return this
      .query(store, ModelClass, {per_page})
      .then(response => this.loadAllPages({response, ModelClass, store, requestType: 'findAll'}));
  },

  pathForType (modelName) {
    const finalModelName = underscore(modelName);

    if (modelName === 'user') {
      return this.get('ajaxStamplay.userPath');
    }

    const objectPath = this.get('ajaxStamplay.objectPath');
    return `${objectPath}/${finalModelName}`;
  },

  query(store, ModelClass, query = {}) {
    query = copy(query);

    const allPages = query.allPages;
    delete query.allPages;

    if (!query.per_page) {
      query.per_page = this.get('PER_PAGE');
    }

    const firstPagePromise = this._super(store, ModelClass, query);

    if (!allPages) {
      return firstPagePromise;
    }

    return firstPagePromise
      .then(response => this.loadAllPages({response, ModelClass, store, requestType: 'query'}));
  },



  // ----- Custom methods -----
  loadAllPages ({response: firstPage, ModelClass, store, query = {}, requestType}) {
    const totalPages =
      firstPage
      && firstPage.pagination
      && firstPage.pagination.total_pages;

    if (!totalPages || totalPages < 2) {
      return firstPage;
    }

    const otherPageRequests = this.produceOtherPageReqeusts({totalPages, ModelClass, store, query});

    return RSVP
      .all([firstPage, ...otherPageRequests])
      .then(responses => this.reducePaginatedResponses(responses));
  },

  produceOtherPageReqeusts ({totalPages, ModelClass, store, query = {}}) {
    query = copy(query);

    if (!query.per_page) {
      query.per_page = this.get('PER_PAGE');
    }

    return Array
      .apply(null, Array(totalPages - 1)) // We start with the second page
      .map((_, i) => {
        const page = i + 2; // Stamplay pages are one-indexed
        return this.query(store, ModelClass, {...query, page});
      });
  },

  reducePaginatedResponses (responses) {
    const data =
      responses
        .map(response => response.data)
        .reduce((result, response) => result.concat(response), []);

    return {data};
  }
});
