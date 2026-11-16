import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router: Router = Router();

/**
 * @openapi
 * 
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Product ID
 *                      example: 1
 *                  name:
 *                      type: String
 *                      description: Product name
 *                      example: Computador portatil HP 
 *                  price:
 *                      type: float
 *                      description: Product price
 *                      example: 2500000
 *                  availability:
 *                      type: booleam
 *                      description: Product availability
 *                      example: true 
 *              example:
 *                  id: 1
 *                  name: Monitor de prueba
 *                  price: 200
 *                  availability: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'  
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid Id
 */

router.get("/:id",

    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    getProductsById
);


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product 
 *          tags:
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 50 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201: 
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - invalid input data
 */
router.post("/",

    // validation
    body('name')
        .notEmpty()
        .withMessage('El campo no debe estar vacio'),

    body('price')
        .notEmpty().withMessage('El precio no debe estar vacio')
        .isNumeric().withMessage('Valor no valido')
        .custom(value => value > 0).withMessage('Precio no valido'),

    // si pasa la validación se crea el producto en la base de datos
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with the Id 
 *          tags:
 *              - Products
 *          description: Return an updated product in the database
 *          parameters:
 *             - in: path
 *               name: id
 *               description: The ID of product to update
 *               required: true
 *               schema: 
 *                   type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 50 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true 
 *          responses:
 *              200: 
 *                  description: Product updated successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad request - invalid ID or invalid input data
 *              404:
 *                  description: Product Not found         
 */

router.put("/:id",

    param('id').isInt().withMessage('Id no valido'),
    body('name')
        .notEmpty()
        .withMessage('El campo no debe estar vacio'),

    body('price')
        .notEmpty().withMessage('El precio no debe estar vacio')
        .isNumeric().withMessage('Valor no valido')
        .custom(value => value > 0).withMessage('Precio no valido'),

    body('availability')
        .notEmpty().withMessage('Valor para disponibilidad no valido')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),

    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of product to update
 *            required: true
 *            schema: 
 *                type: integer
 *      responses:
 *          200:
 *              description: Update the product availability
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid ID
 *          404:
 *              description: Product Not found
 */

router.patch("/:id",

    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product of database
 *      tags:
 *          - Products
 *      description: Return a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of product to delete
 *            required: true
 *            schema: 
 *                type: integer
 *      responses:
 *          200:
 *              description: Product deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *               description: Invalid ID
 *          404:
 *               description: Product Not found       
 */

router.delete("/:id",

    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    deleteProduct)

export default router;

// parameters:
//  *              -in: path
//  *              name: id
//  *                description: The ID of product to delete
//  *                required: true
//  *                schema:
//  *                    type: integer
