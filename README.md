# ember-stamplay

[Stamplay](https://stamplay.com/) is a new JavaScript-centric BaaS (backend as a service), ideal for Ember developers.

`ember-stamplay` is a work-in-progress Ember addon aiming at providing first-class support for Stamplay.

We rely on [Ember Data](https://github.com/emberjs/data), [Ember Simple Auth](https://www.npmjs.com/ember-simple-auth) and Stamplay's REST API. We do not use Stamplay's JS SDK.

## Roadmap

> #### Legend
>
> :white_circle: -- not implemented yet, planned  
> :white_circle::grey_question: -- WTF is that even? Not counted as a missing feature  
> :radio_button: -- in progress (leaf) or partially implemented (branch)  
> :black_circle: -- implemented  
> :black_circle::grey_question: -- implemented but some edge cases might be missing  
> :no_entry: -- won't implement, not counted as a missing feature  

#### Documentation

* :radio_button: Basic documentation in this readme
  * :black_circle: Intro
  * :black_circle: Roadmap
  * :white_circle: Changelog
  * :white_circle: Installation and setup
  * :white_circle: Working with one-way relationships
* :white_circle: Document code using YUIDoc
* :white_circle: Build YUIDoc API website

#### Stamplay feature parity

* :radio_button: Auth
  * :black_circle: Email/password authentication
  * :black_circle: Email/password signup
  * :black_circle: Social OAuth authentication/signup
  * :black_circle: Ember Data authorization
  * :black_circle: AJAX authorization
  * :black_circle: Logout
  * :white_circle: Password editing
  * :white_circle: Password recovery
* :radio_button: Working with models
  * :black_circle: CRUD for object models
    * :black_circle:                GET objects
    * :black_circle:                GET object
    * :white_circle::grey_question: GET User's Objects
    * :white_circle::grey_question: GET Object Activity
    * :black_circle:                POST object (create)
    * :black_circle:                PUT object (update)
    * :no_entry:                    PATCH object (partial update) -- not implementing due to how Ember Data is designed
    * :black_circle:                DELETE object
  * :radio_button: CRUD for user model
    * :black_circle: GET users
    * :black_circle: GET user
    * :black_circle: GET user status (checks session, returns user model for JWT token)
    * :white_circle: GET following
    * :white_circle: GET followed_by
    * :black_circle: POST user
    * :white_circle: PATCH role
    * :black_circle: PUT user
    * :white_circle: PUT follow
    * :white_circle: PUT unfollow
    * :black_circle: DELETE user
  * :white_circle: Roles
    * :white_circle: GET roles
    * :white_circle: GET role
  * Stripe
    * :white_circle: Subscription
      * :white_circle: GET subscriptions
      * :white_circle: GET subscription
      * :white_circle: POST subscription (create)
      * :white_circle: PUT subscription (update)
      * :white_circle: DELETE subscription
    * :white_circle: Card
      * :white_circle: GET card
      * :white_circle: POST card
    * :white_circle: Customer
      * :white_circle: POST customer
    * :white_circle: Charge
      * :white_circle: POST charge
  * :black_circle::grey_question: One-way relationships
  * :black_circle:                Depagination for `findAll()` and `query()`
  * :black_circle::grey_question: Filtering and sorting via `query()`, advanced queries with `?where=`
  * :no_entry:                    Selecting attributes for lighter responses (might work out of the box, though)
  * :white_circle:                Social actions
* :white_circle: POST email
* :white_circle: POST code block (run)
* :white_circle: Social actions
  * :white_circle: Mixin for POST methods
  * :white_circle: Figure out where to perform GETting soical actions & where to store


#### Testing

* :white_circle: A dummy app with the most basic use cases
* :white_circle: Set up Mocha and Chai
* :white_circle: Set up Mirage
* :white_circle: Set up Travis CI build
* :white_circle: Acceptance tests
  * :white_circle: Auth
    * :white_circle: Email/password authentication
    * :white_circle: Email/password signup
    * :white_circle: Social OAuth authentication/signup
    * :white_circle: Ember Data authorization
    * :white_circle: AJAX authorization
    * :white_circle: Logout
    * :white_circle: Password editing
    * :white_circle: Password recovery
  * :white_circle: Dummy app CRUD
* :white_circle: Integration tests
  * :white_circle: CRUD for object models
    * :white_circle:                GET objects
    * :white_circle:                GET object
    * :white_circle::grey_question: GET User's Objects
    * :white_circle::grey_question: GET Object Activity
    * :white_circle:                POST object (create)
    * :white_circle:                PUT object (update)
    * :white_circle:                DELETE object
  * :white_circle: CRUD for user model
    * :white_circle: GET users
    * :white_circle: GET user
    * :white_circle: GET user status (checks session, returns user model for JWT token)
    * :white_circle: GET following
    * :white_circle: GET followed_by
    * :white_circle: POST user
    * :white_circle: PATCH role
    * :white_circle: PUT user
    * :white_circle: PUT follow
    * :white_circle: PUT unfollow
    * :white_circle: DELETE user
  * :white_circle: Roles
    * :white_circle: GET roles
    * :white_circle: GET role
  * Stripe
    * :white_circle: Subscription
      * :white_circle: GET subscriptions
      * :white_circle: GET subscription
      * :white_circle: POST subscription (create)
      * :white_circle: PUT subscription (update)
      * :white_circle: DELETE subscription
    * :white_circle: Card
      * :white_circle: GET card
      * :white_circle: POST card
    * :white_circle: Customer
      * :white_circle: POST customer
    * :white_circle: Charge
      * :white_circle: POST charge
  * :white_circle::grey_question: One-way relationships
  * :white_circle:                Depagination for `findAll()` and `query()`
  * :white_circle::grey_question: Filtering and sorting via `query()`, advanced queries with `?where=`
  * :white_circle:                Social actions
  * :white_circle: POST email
  * :white_circle: POST code block (run)
  * :white_circle: Social actions
    * :white_circle: Mixin for POST methods
    * :white_circle: Figure out where to perform GETting soical actions & where to store

#### Features that we wish to support but Stamplay does not provide

For features you wish to see implemented, please visit linked issues and upvote!

* [WebSocket](https://github.com/Stamplay/stamplay-product-development/issues/11)
* [Transactions](https://github.com/Stamplay/stamplay-product-development/issues/9)
* [Fetch API](https://github.com/Stamplay/stamplay-product-development/issues/10)
* [Two-way relationships with bookkeeping](https://github.com/Stamplay/stamplay-product-development/issues/22)
* [VK.com auth](https://github.com/Stamplay/stamplay-product-development/issues/12)
* [Settings API](https://github.com/Stamplay/stamplay-product-development/issues/7)
