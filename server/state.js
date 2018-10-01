const utils = require('./utils');

// default start up state used to imitate database
const store = {
    rooms: [
        {
            id: utils.guid(),
            name: "Main room"
        },
        {
            id: utils.guid(),
            name: "General room"
        },
        {
            id: utils.guid(),
            name: "Room 3"
        }
    ],
    doctors: [
        {
            id: utils.guid(),
            name: "Vladimir Sokolov"
        },
        {
            id: utils.guid(),
            name: "Francine Chambers"
        },
        {
            id: utils.guid(),
            name: "John Andrews"
        }
    ],
    patients: [],
    studies: []
};


module.exports = {
    getStore() {
        return store;
    },

    addPatient(params) {
        let patient = Object.assign({}, params, {id: utils.guid()});
        store.patients.push(patient);
        return patient;
    },

    addStudy(params) {
        let study = Object.assign({}, params, {id: utils.guid()});
        store.studies.push(study);
        return study;
    },

    updateStudyStatus(id, status) {
        let study = store.studies.find(_study => _study.id === id);
        if(!study) {
            return `Study with id "${id}" was not found`;
        }
        study.status = status;
        return study;
    }
};