'use strict';

const jasmine = require('jasmine');
const fs = require('fs-extra');
const path = require('path');

const _reply = {
    error: function error (message) {
        return message;
    },
    success: (message) => {
        return message;
    }
}

describe('reset should remove tjm data from file', () => {

    afterAll(() => {
        fs.remove(path.join(process.cwd(), 'spec/fixtures/resetJobFile.json'));
    });

    it('tjm data should be pulled from file', () => {
        // copy fixture file
        const argv = {
            jobFile: 'spec/fixtures/resetJobFile.json'
        }

        const fakeJobData = require('./fixtures/test_job_file.json');
        const assetPath = path.join(process.cwd(), 'spec/fixtures/resetJobFile.json');
        return fs.writeJson(assetPath, fakeJobData, {spaces: 4})
            .then(() => require('../cmds/reset').handler(argv, _reply))
            .then((result) => {
                expect(result).toBe('TJM data was removed from spec/fixtures/resetJobFile.json');
            })
            .then(() => {
                const updatedJobData = require('./fixtures/resetJobFile.json');
                expect(updatedJobData.tjm).toBeUndefined();
            })
            .catch(fail);
    })
})