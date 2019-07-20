"use strict";

var validator = require("is-my-json-valid");

var errors = require("feathers-errors");

module.exports = function validateHook(schema, options) {
  options = Object.assign(
    {
      verbose: true,
      greedy: true
    },
    options
  );
  let obj = {
    required: true,
    type: "object",
    properties: {
      ...schema
    }
  };

  return hook => {
    var validate = validator(obj, options);
    var valid = validate(hook.data);

    if (!valid) {
      let respond = {
        errors: validate.errors.map(errorsMap)
      };
      throw new errors.BadRequest("Validation failed", respond);
    }
  };
};

function errorsMap(error) {
  error.path = error.field.replace(/^data\./, "");
  delete error.field;
  return error;
}
