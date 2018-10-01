import $ from 'jquery';
import utils from '../utils';
import events from '../events';

let selectors = {
    container: '.control__panel',
    patient_form: '.patient__form',
    study_form: '.study__form',
    patient_select: '#patient',
    room_select: '#room',
    doctor_select: '#doctor'
};

export default {
    $elements: {},

    init() {
        this.$elements = utils.parseComponent($(selectors.container), selectors);
        this.listeners();
        this.loadState();
    },

    listeners() {
        let $body = $('body');
        $body.on(`${events.DATA_UPDATE}:patient`, (e, payload) => this.updateSelectData([payload], this.$elements.patient_select));
    },

    loadState() {
        $.ajax({
            type: "GET",
            url: '/api',
            success: (data) => {
                this.updateSelectData(data.patients, this.$elements.patient_select);
                this.updateSelectData(data.rooms, this.$elements.room_select);
                this.updateSelectData(data.doctors, this.$elements.doctor_select);
            }
        });
    },

    /**
     * Append options to select
     * @param options_data {Array} options in format [{id: xxx, name: xxx}, ...]
     * @param $select {jQuery}
     */
    updateSelectData(options_data, $select) {
        let $options = options_data.map(option_data => `<option value="${option_data.id}">${option_data.name}</option>`);
        $select.append($options);
    },
};