import request from 'supertest'
import server from "../../server";

describe('POST api/products', () => {

    test('should display validation errors', async () => {

        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);

        expect(response.status).not.toBe(404);
    });

    test('should validate that the new product contain the price', async () => {

        const response = await request(server).post('/api/products').send({
            name: "monitor - testing"
        })

        expect(response.status).toBe(400);
        expect(response).toHaveProperty('error');

        expect(response.status).not.toBe(404);
    });

    test('should validate that the price is greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            "name": "nuevo testing",
            "price": 0
        });

        expect(response.status).toBe(400);
    });

    test('should validate that the price is a number', async () => {

        const response = await request(server).post('/api/products').send({
            "name": "nuevo testing",
            "price": "hola"
        });

        expect(response.status).toBe(400);
    });


    test('should create a  new product', async () => {

        const response = await request(server).post('/api/products').send({
            name: "probando testing",
            price: 350000
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    });
});


describe('GET api/products', () => {

    test('Should check if api/products url exist', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).not.toBe(400);
    });

    test('GET a Json response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.data).toHaveLength(1);
    });
});

describe('GET api/products/:id', () => {

    test('Should return a 404 response for a non-existing product', async () => {

        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');

    });

    test('should check a valid ID in te URL', async () => {

        const response = await request(server).get('/api/products/invalid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Id no valido');
    });

    test('Should return a json response for a single product', async () => {

        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('PUT api/products/:id', () => {

    test('should return a 404 response for a non-existent product', async () => {
        const response = await request(server).put('/api/products/200').send({
            name: "Monitor curvo",
            price: 350000,
            availability: true
        })

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');

    });

    test('Should display validacion error message when updating a product', async () => {

        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(6);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');

    });

    test('should validate that the price is greater than 0 ', async () => {

        const response = await request(server).put('/api/products/1').send(
            {
                name: "Monitor curvo",
                price: -350000,
                availability: true
            }
        )

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no valido');
        expect(response.status).not.toBe(200);
    });

    test('should update an existing product with valid data', async () => {

        const response = await request(server).put('/api/products/1').send({
            name: "Monitor curvo",
            price: 350000,
            availability: true
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeTruthy();
        expect(response.status).not.toBe(400);
    });
});

describe('PATCH api/products/:id', () => {

    test('should return a 404 response for a non-existing product', async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toBe('data');
    });

    test('should update the product availability', async () => {
        const response = await request(server).patch(`/api/products/1`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
    });
});

describe('DELETE api/products/:id', () => {

    test('should cheack a valid ID ', async () => {

        const response = await request(server).delete('/api/products/2000')
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
        expect(response.status).not.toBe(200);
        expect(response.body.msg).not.toBe('Producto eliminado');
    });

    test('should return a 404 response for a non-existent product', async () => {

        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Id no valido');
        expect(response.status).not.toBe(200);
        expect(response.body.msg).not.toBe('Producto eliminado');
    });

    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Producto eliminado');
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('error');
    });


});