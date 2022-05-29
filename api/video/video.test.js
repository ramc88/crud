const controller = require('./controller');
const mongoose = require('mongoose');

let req = {};
let res = {};

describe('Video controller tests', () => {
    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn(),
        };

        jest.resetAllMocks();
    });

    it('should create a new video', async () => {
        req.body = {
            _id: 'idFake',
            name: 'videoTest',
            url: 'https://video.youtube.com',
            thumbnailUrl: 'https://thumbnail.youtube.com',
            isPrivate: true
        };

        // Stubing mongoose model, allows to run tests without using the db
        const spy = jest.spyOn(mongoose.Model.prototype, 'save');
        spy.mockImplementation(() => {
            return req.body
        });

        await controller.createVideo(req, res);

        expect(res.send).toHaveBeenCalledWith(req.body);
    });

    it('should get the video with _id idFake', async () => {
        req.body = {
            _id: 'idFake',
            name: 'videoTest',
            url: 'https://video.youtube.com',
            thumbnailUrl: 'https://thumbnail.youtube.com',
            isPrivate: true
        };
        req.params = {
            id: 'idFake'
        };

        const spy = jest.spyOn(mongoose.Model, 'findById');
        spy.mockImplementation(() => {
            return req.body
        });

        await controller.getVideo(req, res);

        expect(res.send).toHaveBeenCalledWith(req.body);
    });

    it('should remove the video with id idFake', async () => {
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

        await controller.deleteVideo(req, res);

        expect(res.send).toHaveBeenCalled();
    });

    it('should update video with id idFake', async () => {
        req.body = {
            _id: 'idFake',
            name: 'video testing change the name',
            url: 'https://video.youtube.com',
            thumbnailUrl: 'https://thumbnail.youtube.com',
            isPrivate: true,
            timesViewed: 800
        };
        req.params = {
            id: 'idFake'
        };

        const spy = jest.spyOn(mongoose.Model, 'findByIdAndUpdate');
        spy.mockImplementation(() => {
            return req.body
        });

        const expected = req.body;
        delete expected.timesViewed;

        // timesViewed can't be updated
        await controller.updateVideo(req, res);

        expect(res.send).toHaveBeenCalledWith(expected);
    });
})