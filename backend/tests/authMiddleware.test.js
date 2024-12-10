// tests/authMiddleware.test.js
require('dotenv').config({ path: '.env.test' }); // Load environment variables from .env.test
const { authenticateToken } = require('../middlewares/authMiddleware');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

describe('authenticateToken Middleware', () => {
    it('should call next() if token is valid', () => {
        const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET); // Use the same secret
        const req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        authenticateToken(req, res, next);

        expect(next).toHaveBeenCalled(); // Check if next() was called
        expect(res.locals.user).toEqual(expect.objectContaining({ userId: 1 })); // Check if user is set
    });

    it('should return 401 if no token is provided', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        authenticateToken(req, res, next);

        expect(res.statusCode).toBe(401); // Check if status is 401
        expect(next).not.toHaveBeenCalled(); // Check if next() was not called
    });

    it('should return 403 if token is invalid', () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer invalidtoken'
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        authenticateToken(req, res, next);

        expect(res.statusCode).toBe(403); // Check if status is 403
        expect(next).not.toHaveBeenCalled(); // Check if next() was not called
    });
});