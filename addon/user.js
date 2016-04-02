import Model from 'ember-data/model';
import attr  from 'ember-data/attr';

export default Model.extend({
  email:            attr('string'),
  password:         attr('string'),
  displayName:      attr('string'),
  givenRole:        attr('string'),
  dt_update:        attr('date'),
  dt_create:        attr('date'),
  emailVerified:    attr('boolean'),
  verificationCode: attr('string'),
  profileImg:       attr('string')
});
