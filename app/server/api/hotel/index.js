'use strict';

var express = require('express');
var controller = require('./hotel.controller');

var router = express.Router();


 // *       images:
 // *         type: array
 // *				 items: string
 // *				 default: ['url']
 // *			 amenities:
 // *         type: array
 // *				 items: string
 // *				 default: ['amenitie']
 // *			 recommended:
 // *				 type: boolean
 // *			 checkin_time:
 // *				 type: string
 // *			 checkout_time:
 // *				 type: string
 // *			 hotel_chain:
 // *				 type: string
 // *			 rating_summary:
 // *				 type: object
 // *			 rate:
 // *				 type: object
 // *			 payment_methods:
 // *			 	 type: array
 // *				 items: string
 // *			 slug:
 // *				 type: string
 // *			 defaultPaymentMethod:
 // *			 	 type: string

/**
 * @swagger
 * definition:
 *   Hotel:
 *     properties:
 *       id:
 *         type: number
 *       description:
 *         type: string
 *       name:
 *         type: string
 *       geo_position:
 *         type: object
 */

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     tags:
 *       - Hotels
 *     description: Returns all hotels
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of hotels
 *         schema:
 *           $ref: '#/definitions/Hotel'
 */
router.get('/', controller.index);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     tags:
 *       - Hotels
 *     description: Returns a single hotel
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Hotel's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single hotel
 *         schema:
 *           $ref: '#/definitions/Hotel'
 */
router.get('/:id', controller.show);

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     tags:
 *       - Hotels
 *     description: Creates a new hotel
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotel
 *         description: Hotel object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     tags:
 *       - Hotels
 *     description: Updates a single hotel
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: id
 *         description: Id of the Hotel resource
 *         dataType: string
 *       - name: hotel
 *         in: body
 *         description: Fields for the Hotel resource
 *         schema:
 *           type: Object
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id', controller.upsert);
router.delete('/:id', controller.destroy);

module.exports = router;
