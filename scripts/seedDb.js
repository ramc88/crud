const { faker } = require('@faker-js/faker');

const videoModel = require('../api/video/model');

const run = async () => {
    console.log('running seeding')
    const forceSeed = process.argv[2] == 'forceSeed' || false;

    const videoCount = await videoModel.countDocuments();
    console.log('videoCount: ', videoCount)

    if(forceSeed && videoCount > 0) {
        videoModel.collection.drop();
    };

    if(forceSeed || videoCount === 0) {
        const seedVideoArray = [...Array(1000)].map(value => ({
            name: faker.random.words(),
            url: require('../data/videoList').videoArray[Math.floor(Math.random() * 13)].video,
            thumbnailUrl: require('../data/videoList').videoArray[Math.floor(Math.random() * 13)].thumbnail,
            isPrivate: faker.datatype.boolean(),
            timesViewed: Math.floor(Math.random() * 100)
        }));

        // Batch insert of videos
        const inserted = await videoModel.insertMany(seedVideoArray);
        console.log('Seeding end');
    };
    
}

module.exports = {
    run
}