# http-errors

This is a collection of subclassed JavaScript `Error` objects, so it can be used whenever a plain `Error` object is used. More specifically, pass an instance of this error to the app middleware whenever a HTTP error response needs to be surfaced.

In addition to the default `Error.name` and `Error.message` properties, it comes with:

- `Error.code`: The HTTP status code of the error response
- `Error.fields`: _Experimental_ This attaches the bad fields in REST API responses. Defaults to `{}`.

When using promises, you can `throw` these errors directly to have the error handled in the subsequent `then/catch/fail` handler.


## Usage:

``` js
// Some page controller middleware
var HttpErrors = require('http-errors');

module.exports = function (req, res, next) {
  api.findEventById(req.params.id, function (err, event) {
    // Next error middleware will output the error page with HTTP 404
    if (err) {
      return next(new HttpErrors.ResourceNotFound('Event not found'));
    }

    res.render(...);
  });
}

// Error middleware
function (req, res, next, err) {
  res.render('error', {
    title: 'Error Page',
    status: err.code, // This is how you use `Error.code`
    message: err.message // Or the error message if you want
    ...
  });
}
```


## Original inspiration (and ideas for improvements) from:

- http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
- http://mcavage.github.io/node-restify/#Error-handling
- http://dustinsenos.com/articles/customErrorsInNode
