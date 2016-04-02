import Ember from 'ember';

const {
  assert,
  computed,
  inject: {service},
  K: noop
} = Ember;

import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({

  // ----- Arguments -----
  appId: null,
  apiVersion: 'v1',



  // ----- Services -----
  session: service(),



  // ----- Overridden properties -----
  headers: Ember.computed('session.data.authenticated.authToken', function () {
    /* jshint ignore:start */
    const authToken = this.get('session.data.authenticated.authToken');

    return {
      ...(authToken && {'x-stamplay-jwt': authToken})
    };
    /* jshint ignore:end */
  }),



  // ----- Computed properties -----
  host: computed('appId', function () {
    const appId = this.get('appId');
    assert('ember-stamplay ajax service must be subclassed and `appId` property must be provided', appId);
    return `https://${appId}.stamplayapp.com`;
  }),

  userPath: computed('apiVersion', function () {
    const apiVersion = this.get('apiVersion');
    return `api/user/${apiVersion}/users`;
  }),

  userStatusPath: computed('apiVersion', function () {
    const apiVersion = this.get('apiVersion');
    return `api/user/${apiVersion}/getstatus`;
  }),

  objectPath: computed('apiVersion', function () {
    const apiVersion = this.get('apiVersion');
    return `api/cobject/${apiVersion}`;
  }),

  authPath: computed('apiVersion', function () {
    const apiVersion = this.get('apiVersion');
    return `auth/${apiVersion}`;
  }),

  loginPath: computed('authPath', function () {
    const authPath = this.get('authPath');
    return `${authPath}/local/login`;
  }),

  // userURL: computed('host', 'userPath', function () {
  //   const host = this.get('host');
  //   const userPath = this.get('userPath');
  //   return `${host}/${userPath}`;
  // }),
  //
  // objectURL: computed('host', 'objectPath', function () {
  //   const host   = this.get('host');
  //   const objectPath = this.get('objectPath');
  //   return `${host}/${objectPath}`;
  // }),
  //
  // authURL: computed('host', 'authPath', function () {
  //   const host   = this.get('host');
  //   const authPath = this.get('authPath');
  //   return `${host}/${authPath}`;
  // }),



  // ----- Methods -----
  parseRawResponse ({jqXHR, response: user}) {
    return {
      user,
      authToken: jqXHR.getResponseHeader('x-stamplay-jwt')
    };
  },

  applyAuthentication ({user, authToken, user: {id}}) {
    this
      .get('session')
      .authenticate('authenticator:stamplay', {mode: 'restore', id, authToken, user});
  },

  authenticate (data) { // email, password
    const loginPath  = this.get('loginPath');

    return this
      .raw(loginPath, {
         method: 'POST',
         data
      })
      .then(this.parseRawResponse);
  },

  restore (authToken) {
    const userStatusPath = this.get('userStatusPath');

    return this
      .raw(userStatusPath, {
        // Have to provide headers manually because the session is not
        // authenticated during this request.
        headers: {
          'x-stamplay-jwt': authToken
        }
      })
      .then(({response: {user}}) => ({user, authToken}));
  },

  invalidate () {
    const authPath   = this.get('authPath');
    const logoutPath = `${authPath}/logout`;

    return this
      .request(logoutPath)
      .catch(noop); // Remove once logout starts working
  },

  restoreAndAuthenticate (authToken) {
    return this
      .restore(authToken)
      .then(data => this.applyAuthentication(data));
  },

  createUserAndAuthenticate (data) { // email, password, displayName, profileImg...
    const userPath  = this.get('userPath');

    return this
      .raw(userPath, {
         method: 'POST',
         data
      })
      .then(this.parseRawResponse)
      .then(data => this.applyAuthentication(data));
  },
  
  socialURL (service) {
    const host     = this.get('host');
    const authPath = this.get('authPath');
    return `${host}/${authPath}/${service}/connect`;
  },
  
  socialAuth (service) {
    const socialURL = this.socialURL(service);
    window.location.replace(socialURL);
  }
});
