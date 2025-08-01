const request = require('supertest');
const app = require('../../server/app');
const membershipData = require('../../test-data/membershipData.json');

const validMember = membershipData[0];

describe('Membership Routes', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(3001, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('GET /data/membership', () => {
        it('should return 200 with membership data', async () => {
            const response = await request(app)
                .get('/data/membership');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should return 500 with database error', async () => {
            // You might want to mock the database here
            const response = await request(app)
                .get('/data/membership');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Database error');
        });
    });

    describe('POST /membershipform', () => {
        it('should return 201 with valid form data', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName,
                    lastName: validMember.lastName,
                    major: validMember.major,
                    pantherId: validMember.pantherId,
                    fiuEmail: validMember.fiuEmail,
                    personalEmail: validMember.personalEmail,
                    gradSession: validMember.gradSession,
                    gradYear: validMember.gradYear,
                    phoneNumber: '123-456-7890',
                    schoolStatus: 'Full-time'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Membership form submitted successfully!');
        });

        it('should return 400 with missing required fields', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'All fields are required');
        });

        it('should return 400 with invalid email format', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName,
                    lastName: validMember.lastName,
                    major: validMember.major,
                    pantherId: validMember.pantherId,
                    fiuEmail: validMember.fiuEmail,
                    personalEmail: 'invalid-email',
                    gradSession: validMember.gradSession,
                    gradYear: validMember.gradYear,
                    phoneNumber: '123-456-7890',
                    schoolStatus: 'Full-time'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid personal email');
        });

        it('should return 400 with invalid FIU email', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName,
                    lastName: validMember.lastName,
                    major: validMember.major,
                    pantherId: validMember.pantherId,
                    fiuEmail: 'john.doe@example.com',
                    personalEmail: validMember.personalEmail,
                    gradSession: validMember.gradSession,
                    gradYear: validMember.gradYear,
                    phoneNumber: '123-456-7890',
                    schoolStatus: 'Full-time'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid FIU email');
        });

        it('should return 400 with invalid graduation session', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName,
                    lastName: validMember.lastName,
                    major: validMember.major,
                    pantherId: validMember.pantherId,
                    fiuEmail: validMember.fiuEmail,
                    personalEmail: validMember.personalEmail,
                    gradSession: 'INVALID',
                    gradYear: validMember.gradYear,
                    phoneNumber: '123-456-7890',
                    schoolStatus: 'Full-time'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid graduation session');
        });

        it('should return 400 with invalid graduation year', async () => {
            const response = await request(app)
                .post('/membershipform')
                .send({
                    firstName: validMember.firstName,
                    lastName: validMember.lastName,
                    major: validMember.major,
                    pantherId: validMember.pantherId,
                    fiuEmail: validMember.fiuEmail,
                    personalEmail: validMember.personalEmail,
                    gradSession: validMember.gradSession,
                    gradYear: '1900',
                    phoneNumber: '123-456-7890',
                    schoolStatus: 'Full-time'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid graduation year');
        });
    });
});
