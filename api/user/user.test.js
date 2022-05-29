const controller = require('./controller');
const utils = require('./utils');
const mongoose = require('mongoose');

let req = {};
let res = {};

describe('User controller tests', () => {
    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn(),
        };

        jest.resetAllMocks();
    });

    it('should create a new user and return its email', async () => {
        req.body = {
            email: 'user@email.test',
            password: '1234'
        }
        // Stubing mongoose model, allows to run tests without using the db
        const spy = jest.spyOn(mongoose.Model.prototype, 'save');
        spy.mockImplementation(() => {
            return req.body
        });

        // Stubing mongoose model for findOne operation
        const spy1 = jest.spyOn(mongoose.Model, 'findOne');
        spy1.mockImplementation(() => {
            return null
        });


        await controller.createUser(req, res)

        expect(res.send).toHaveBeenCalledWith({email: 'user@email.test'});
    })

    it('should remove the user with id idFake', async () => {
        req.params = {
            id: 'idFake'
        };

        const spy = jest.spyOn(mongoose.Model, 'findByIdAndDelete');
        spy.mockImplementation(() => {
            return req.body
        });

        const spy1 = jest.spyOn(mongoose.Model, 'findById');
        spy1.mockImplementation(() => {
            return null
        });

        await controller.deleteUser(req, res);

        expect(res.send).toHaveBeenCalled();
    });

    it('should hash the password', async () => {
        const expectedValue = '73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=';

        const hashedPassword = utils.hashIt('12345678');

        expect(hashedPassword).toEqual(expectedValue);
    });

    it('should generate a new jwt', async () => {
        const expectedValue = 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.hJ8IXSEZgHNu8Ve7LuwBuH9UVRZ_I4AT1UyrwsVoJzg';

        const hashedPassword = utils.sign('12345678');

        expect(hashedPassword).toEqual(expectedValue);
    })
})