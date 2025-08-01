const request = require('supertest');
const app = require('../../server/app');
const registerData = require('../../test-data/registerData.json');

const validUser = registerData[0];

describe('Login Routes', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(3001, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('POST /login/auth/login', () => {
        it('should return 200 with valid credentials', async () => {
            const response = await request(app)
                .post('/login/auth/login')
                .send({
                    username: validUser.username,
                    password: validUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('message', 'Login successful');
            expect(response.body).toHaveProperty('token');
        });

        it('should return 404 with invalid credentials', async () => {
            const response = await request(app)
                .post('/login/auth/login')
                .send({
                    username: 'nonexistent',
                    password: 'wrongpass'
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Invalid username and password combination');
        });

        it('should return 400 with missing fields', async () => {
            const response = await request(app)
                .post('/login/auth/login')
                .send({
                    username: validUser.username
                });

            expect(response.status).toBe(400);
        });

        it('should return 500 with database error', async () => {
            // You might want to mock the database here
            const response = await request(app)
                .post('/login/auth/login')
                .send({
                    username: 'erroruser',
                    password: 'errorpass'
                });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Database query error');
        });
    });
});
