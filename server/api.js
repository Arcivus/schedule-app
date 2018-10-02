const utils = require('./utils');
const state = require('./state');


module.exports = function (router) {
    // get full app state
    router.get('/', (req, res) => {
        res.json(state.getStore());
    });

    // get list of all studies
    router.route('/studies').get((req, res) => {
        res.json(state.getStudies());
    });

    // Add patient
    router.route('/patients').post((req, res) => {
        let validation = utils.validate(req.body);
        if (typeof validation === "boolean") {
            let patient = state.addPatient(req.body);
            res.json(utils.successResponse(patient));
        } else {
            res.json(utils.errorResponse(validation));
        }
    });

    // Add study
    router.route('/study').post((req, res) => {
        let validation = utils.validate(req.body);
        if (typeof validation === "boolean") {
            let study = state.addStudy(req.body);
            res.json(utils.successResponse(study));
        } else {
            res.json(utils.errorResponse(validation));
        }
    });



    // Update study status
    router.route('/study/:id').put((req, res) => {
        let result = state.updateStudyStatus(req.params.id, req.body.status);
        if(typeof result === "object") {
            res.json(utils.successResponse(result))
        } else {
            res.json(utils.errorResponse(result));
        }
    });
};