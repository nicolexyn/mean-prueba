'use strict';

var express = require('express');
var controller = require('./hotel.controller');

var router = express.Router();


/**
 * @swagger
 * definition:
 *   Thing:
 *     properties:
 *       name:
 *         type: string
 *       info:
 *         type: string
 *       active:
 *         type: Boolean
 */

/**
 * @swagger
 * /api/things:
 *   get:
 *     tags:
 *       - Things
 *     description: Returns all things
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of things
 *         schema:
 *           $ref: '#/definitions/Thing'
 */
router.get('/', controller.index);

/**
 * @swagger
 * /api/things/{id}:
 *   get:
 *     tags:
 *       - Things
 *     description: Returns a single thing
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Thing's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single thing
 *         schema:
 *           $ref: '#/definitions/Thing'
 */
router.get('/:id', controller.show);

/**
 * @swagger
 * /api/things:
 *   post:
 *     tags:
 *       - Things
 *     description: Creates a new thing
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: thing
 *         description: Thing object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Thing'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/things/{id}:
 *   put:
 *     tags:
 *       - Things
 *     description: Updates a single thing
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: id
 *         description: Id of the Thing resource
 *         dataType: string
 *       - name: thing
 *         in: body
 *         description: Fields for the Thing resource
 *         schema:
 *           type: Object
 *           $ref: '#/definitions/Thing'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
