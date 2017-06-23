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

import jsonpatch from 'fast-json-patch';
import Hotel from './hotel.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
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
          "type": "NAME",
          "title": "NAME"
        }, {
          "type": "PRICE_RANGE",
          "from": 896.59,
          "to": 20792.2,
          "title": "PRICE_RANGE"
        }, {
          "type": "STAR",
          "values": [{
            "code": "all_STAR",
            "count": 236,
            "description": "all_STAR"
          }, {
            "code": "5",
            "count": 22,
            "description": "5"
          }, {
            "code": "4",
            "count": 123,
            "description": "4"
          }, {
            "code": "3",
            "count": 62,
            "description": "3"
          }, {
            "code": "2",
            "count": 22,
            "description": "2"
          }, {
            "code": "1",
            "count": 7,
            "description": "1"
          }],
          "title": "STAR"
        }, {
          "type": "MEAL",
          "values": [{
            "code": "all_MEAL",
            "count": 236,
            "description": "all_MEAL"
          }, {
            "code": "BED_AND_BREAKFAST",
            "count": 1,
            "description": "cama y desayuno"
          }, {
            "code": "ROOM_ONLY",
            "count": 226,
            "description": "solo la habitación"
          }, {
            "code": "BREAKFAST",
            "count": 9,
            "description": "desayuno"
          }],
          "title": "MEAL"
        }, {
          "type": "PAYMENT_METHOD",
          "values": [{
            "code": "all_PAYMENT_METHOD",
            "count": 397,
            "description": "all_PAYMENT_METHOD"
          }, {
            "code": "PAY_AT_DESTINATION",
            "count": 191,
            "description": "Paga en destino"
          }, {
            "code": "PREPAID",
            "count": 206,
            "description": "Paga en cuotas"
          }],
          "title": "PAYMENT_METHOD"
        }, {
          "type": "AMENITY",
          "values": [{
            "code": "all_AMENITY",
            "count": 2390,
            "description": "all_AMENITY"
          }, {
            "code": "parking",
            "count": 146,
            "description": "estacionamiento"
          }, {
            "code": "kitchen-facilities",
            "count": 2,
            "description": "cocina "
          }, {
            "code": "internet",
            "count": 233,
            "description": "internet"
          }, {
            "code": "pool",
            "count": 34,
            "description": "piscina"
          }, {
            "code": "beach-pool-facilities",
            "count": 8,
            "description": "instalaciones en playa/piscina"
          }, {
            "code": "air-condition",
            "count": 3,
            "description": "aire Acondicionado"
          }, {
            "code": "spa",
            "count": 34,
            "description": "spa"
          }, {
            "code": "transportation",
            "count": 39,
            "description": "traslados"
          }, {
            "code": "check-in",
            "count": 213,
            "description": "check-in 24hs"
          }, {
            "code": "fire-place",
            "count": 3,
            "description": "chimenea"
          }, {
            "code": "coffee-shop",
            "count": 106,
            "description": "tienda de café"
          }, {
            "code": "safety-box",
            "count": 127,
            "description": "caja de seguridad"
          }, {
            "code": "game-room",
            "count": 4,
            "description": "sala de juegos"
          }, {
            "code": "connecting-room",
            "count": 3,
            "description": "habitaciones contiguas"
          }, {
            "code": "bathtub",
            "count": 1,
            "description": "bañera"
          }, {
            "code": "pool-bar",
            "count": 18,
            "description": "bar en la piscina"
          }, {
            "code": "pets",
            "count": 41,
            "description": "mascotas"
          }, {
            "code": "laundry-facilities",
            "count": 194,
            "description": "lavanderia"
          }, {
            "code": "smoking-areas",
            "count": 29,
            "description": "áreas fumadores"
          }, {
            "code": "separate-living-room",
            "count": 2,
            "description": "sala de estar separada"
          }, {
            "code": "tennis",
            "count": 1,
            "description": "tennis"
          }, {
            "code": "grocery-shooping-service",
            "count": 4,
            "description": "tienda de comestibles"
          }, {
            "code": "newspaper",
            "count": 3,
            "description": "periódico"
          }, {
            "code": "wheelchair-accessible",
            "count": 3,
            "description": "acceso a sillas de ruedas"
          }, {
            "code": "laundry",
            "count": 2,
            "description": "lavanderia"
          }, {
            "code": "hair-dryer",
            "count": 3,
            "description": "secador de pelo"
          }, {
            "code": "wedding-services",
            "count": 71,
            "description": "servicios de boda"
          }, {
            "code": "sheets",
            "count": 59,
            "description": "sábanas"
          }, {
            "code": "balcony",
            "count": 1,
            "description": "balcón"
          }, {
            "code": "television",
            "count": 40,
            "description": "televisión"
          }, {
            "code": "fitness-center",
            "count": 78,
            "description": "gimnasio"
          }, {
            "code": "shower",
            "count": 1,
            "description": "ducha"
          }, {
            "code": "garden",
            "count": 28,
            "description": "jardin"
          }, {
            "code": "hair-salon",
            "count": 11,
            "description": "peluqueria"
          }, {
            "code": "restaurant",
            "count": 108,
            "description": "restaurante"
          }, {
            "code": "tours-ticket-assistance",
            "count": 164,
            "description": "asistencia turística"
          }, {
            "code": "housekeeping",
            "count": 194,
            "description": "servicio de limpieza"
          }, {
            "code": "bar",
            "count": 142,
            "description": "bar"
          }, {
            "code": "children-club",
            "count": 31,
            "description": "guarderia"
          }, {
            "code": "business-center",
            "count": 70,
            "description": "centro de negocios"
          }, {
            "code": "meeting-rooms",
            "count": 136,
            "description": "sala de reuniones"
          }],
          "title": "AMENITY"
        }]
      }
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
  if (req.body._id) {
    delete req.body._id;
  }
  return Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

  .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Hotel in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Hotel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
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
