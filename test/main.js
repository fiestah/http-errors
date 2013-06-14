var assert = require('assert');
var HttpErrors = require('../errors');

describe('When instantiating a ResourceNotFound error', function () {
  it('should create an instance it', function () {
    var msg = 'Thingy not found';
    var err = new HttpErrors.ResourceNotFound(msg);

    assert.equal(err.name, 'ResourceNotFound');
    assert.equal(err.code, 404);
    assert.equal(err.message, msg);
  });
});
