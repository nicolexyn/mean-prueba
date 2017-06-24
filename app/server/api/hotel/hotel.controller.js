/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hotels              ->  index
 * POST    /api/hotels              ->  create
 * GET     /api/hotels/:id          ->  show
 * PUT     /api/hotels/:id          ->  upsert
 * PATCH   /api/hotels/:id          ->  patch
 * DELETE  /api/hotels/:id          ->  destroy
 */

'use strict';

import Hotel from './hotel.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Hotels
export function index(req, res) {
  return Hotel.find().exec()
    .then(hotels => {
      let result = {
        hotels: hotels,
        filters: [{
          type: 'NAME',
          title: 'NAME'
        }, {
          type: 'PRICE_RANGE',
          from: 1387,
          to: 4094,
          title: 'PRICE_RANGE'
        }, {
          type: 'STAR',
          values: [{
            code: 'all_STAR',
            count: 20,
            description: 'all_STAR'
          }, {
            code: '5',
            count: 2,
            description: '5'
          }, {
            code: '4',
            count: 13,
            description: '4'
          }, {
            code: '3',
            count: 2,
            description: '3'
          }, {
            code: '2',
            count: 3,
            description: '2'
          }, {
            code: '1',
            count: 0,
            description: '1'
          }],
          title: 'STAR'
        }]
      };
      return res.status(200).json(result);
    })
    .catch(handleError(res));
}

// Gets a single Hotel from the DB
export function show(req, res) {
  return Hotel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Hotel in the DB
export function create(req, res) {
  return Hotel.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Hotel in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

  .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Hotel in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Hotel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Hotel from the DB
export function destroy(req, res) {
  return Hotel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
