/**
 * Need to validate data and data formats
    * corrupt or incomplete data
    * crashes or locks up server
    * display unhelpful errors
 * Why JSON schema
    * so data can fail fast: before bad data gets to your db
    * JSON schema - https://json-schema.org/
 * npm i jsonschema 
 * > const res = jsonschema.validate(123, {"type": "num"})
undefined
> res.valid
 * JSONschema.net 
 * validation can be very strict make sure you don't add too many constraints to limit things that should pass through
 * as you add new fields/ columns, make sure you update schema
 * AJV-errors is a useful package to create custom errors
 */