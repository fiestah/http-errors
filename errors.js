var http = require('http');

var errors = {
  // @TODO: This is a hack, take it out when fixed in models/business-model.js
  MultipleChoices   : 300,
  
  BadRequest        : 400,
  InvalidArgument   : 400,
  InvalidCredentials: 401,
  ResourceNotFound  : 404,
  NotSupported      : 405,
  Forbidden         : 403,
  Conflict          : 409,

  Internal          : 500,
  BadGateway        : 502,
  ServiceUnavailable: 503
};

Object.keys(errors).forEach(function (name) {
  var code = errors[name];
  module.exports[name] = function (message) {
    this.constructor.prototype.__proto__ = Error.prototype
    Error.captureStackTrace(this, this.constructor);

    this.name = name;
    this.code = code;
    this.message = message;
    this.fields = {};

    Error.call(message);
  };
});
