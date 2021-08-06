"""
GET - Fetches info, remains in browser history, data sent in query string
POST - Doesn't remain in history, is not cached/ bookmarked, data sent in body of the request

When to use GET/ POST:
-Searching/ filtering = GET
-Sending e-mail = POST
-Updating a User = POST

PUT - update entire resource (every piece of data associtated with given resource)
PATCH - update part of resource (patch it up)
DELETE - Delete resource

Safety
-Safe operation - does not change the date requested
    -Only GET is 'safe'
-Idempotent operations can be performed many times (with the same data)
with the result of all calls being the same as if it was done once
    - GET, PUT / PATCH, DELETE are idempotent
- POST is neither of these
-These help build standards around how we define roles
-Build standards around how we define routes

Intro to REST
-Representational state transfer, architecture for creating web services
-RESTful APIs have base URL ex: http://api.site.com/
-Have a resource after the base URL ex: http://api.com/books
-Use standard HTTP verbs (GET, POST, PATCH, etc)
RESTful routes for resource called 'snacks':
GET /snacks means get all snacks
GET /snacks/[id] get snack
POST /snacks Create snack
PUT/ PATCH /snacks/[id] update snack
DELETE /snacks/[id] Delete snack
NOTE USE THESE NAMING CONVENTIONS

Limitations of JSON/ JSONIFY
-Only works w/ primitive data-types. SQLAlchemy objects ARE NOT primitive data-types
    -how do we account for this?
    -Serialize the query return
    ex: def list_all_desserts():
            'Return JSON {'desserts': [{id, name, calories}, ...]}'

            desserts = Dessert.query.all()
            serialized = [serialize_dessert(d) for d in desserts]

            return jsonify(desserts=serialized)

Can use 'Insomnia' to test API

Nested Routes (multiple resources in a hierarchy) - use logic to decide to display in route
ex: 
post/[post-id]/comment/[comment-id]

Testing
-Just testing JSON response, not HTML

"""