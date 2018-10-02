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

/**
 * @param id {String}
 * @param type {String}
 */
function getEntityById(id, type) {
    return store[type].find(entity => entity.id === id);
}

module.exports = {
    getStore() {
        return store;
    },

    /**
     * Return list of studies also replacing ids with referred entries
     * @returns {array}
     */
    getStudies() {
        return store.studies.map(study => this.getStudy(study.id));
    },

    /**
     * return study while also replasing ids with referred entries
     * @param id {String} study id
     * @returns {*}
     */
    getStudy(id) {
        let study = Object.assign({}, store.studies.find(_study => _study.id === id));
        if(!study){
            return null;
        }
        study.doctor = getEntityById(study.doctor, 'doctors');
        study.patient = getEntityById(study.patient, 'patients');
        study.room = getEntityById(study.room, 'rooms');
        return study;
    },

    addPatient(params) {
        let patient = Object.assign({}, params, {id: utils.guid()});
        store.patients.push(patient);
        return patient;
    },

    addStudy(params) {
        let study = Object.assign({}, params, {id: utils.guid(), status: '0'});
        store.studies.push(study);
        return this.getStudy(study.id);
    },

    updateStudyStatus(id, status) {
        let study = store.studies.find(_study => _study.id === id);
        if(!study) {
            return `Study with id "${id}" was not found`;
        }
        study.status = status;
        return this.getStudy(study.id);
    }
};