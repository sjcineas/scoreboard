const request = require('supertest');
const app = require('../../server/app');
const registerData = require('../../test-data/registerData.json');

const validUser = registerData[0];

describe('Register Routes', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(3001, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('POST /register/users', () => {
        it('should return 200 with successful registration', async () => {
            const response = await request(app)
                .post('/register/users')
                .send({
                    email: validUser.email,
                    username: 'newuser',
                    password: validUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 400 with missing required fields', async () => {
            const response = await request(app)
                .post('/register/users')
                .send({
                    username: validUser.username
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 with invalid email format', async () => {
            const response = await request(app)
                .post('/register/users')
                .send({
                    email: 'invalid-email',
                    username: validUser.username,
                    password: validUser.password
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 with duplicate username', async () => {
            const response = await request(app)
                .post('/register/users')
                .send({
                    email: 'new@example.com',
                    username: validUser.username,
                    password: validUser.password
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 500 with database error', async () => {
            // You might want to mock the database here
            const response = await request(app)
                .post('/register/users')
                .send({
                    email: 'error@example.com',
                    username: 'erroruser',
                    password: 'errorpass'
                });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });
    });
});
