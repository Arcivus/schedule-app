import $ from 'jquery';
import utils from "../utils";
import events from '../events';

let selectors = {
    container: '.studies__list',
    study: '.study__block',
    status_select: '.status__select',
};

export default {
    $elements: {},

    init() {
        this.$elements = utils.parseComponent($(selectors.container), selectors);
        this.listeners();
        this.loadStudies();
    },

    listeners() {
        let $body = $('body');
        $body.on('change', selectors.status_select, this.handleStatusChange.bind(this));
        $body.on(`${events.DATA_UPDATE}:study`, this.loadStudies.bind(this));
    },

    /**
     * Get all studies from server and render them
     */
    loadStudies() {
        this.$elements.container.addClass('preloader');
        $.ajax({
            type: "GET",
            url: '/api/studies',
            success: (data) => {
                let $result;
                if (data.length) {
                    $result = data.map(this.renderStudy);
                } else {
                    $result = '<div class="notfound">No studies planned yet.</div>';
                }

                this.$elements.container.html($result);
                this.$elements.container.removeClass('preloader')
            }
        });
    },

    handleStatusChange(e) {
        let $select = $(e.currentTarget);
        let $item = $select.closest(selectors.study);
        $item.addClass('preloader');
        let status = $select.val();
        let id = $item.data('id');
        $.ajax({
            type: "PUT",
            url: `/api/study/${id}`,
            data: {
                status
            },
            success: (data) => {
                $item.removeClass('preloader');
            }
        });
    },

    /**
     * put data in render template
     * @param study_data {Object}
     * @returns {*|jQuery|HTMLElement}
     */
    renderStudy(study_data) {
        let patient = study_data.patient;
        let patient_sex = patient.sex ? (patient.sex === "1" ? 'M' : 'F') : '';
        let patient_extra = `${patient_sex ? `(${patient_sex})` : ''}, ${patient.birthdate ? patient.birthdate : ''}`;
        return $(`
            <div class="col-md-4 study__block" data-id="${study_data.id}">
                <div class="card mb-4 box-shadow">
                   <div class="card-header">
                        <div><strong>Patient:</strong> ${patient.name}${patient_extra}</div>
                        <div><strong>Doctor:</strong> ${study_data.doctor.name}</div>
                   </div>
                   <div class="card-body">
                        <div class="card-text">
                            <div><strong>Room:</strong> ${study_data.room.name}</div>
                            <div><strong>Start time:</strong> ${study_data.start_time}</div>
                            ${study_data.end_time ? `<div><strong>End time:</strong> ${study_data.end_time}</div>` : ''}
                            <p><strong>Description:</strong> ${study_data.description}</p>
                            <div>
                                <label for="select-${study_data.id}"><strong>Status</strong></label>
                                <select class="status__select custom-select d-block w-100" id="select-${study_data.id}">
                                    <option ${study_data.status === "0" ? 'selected' : ''} value="0">New</option>
                                    <option ${study_data.status === "1" ? 'selected' : ''} value="1">Confirmed</option>
                                    <option ${study_data.status === "2" ? 'selected' : ''} value="2">In progress</option>
                                    <option ${study_data.status === "3" ? 'selected' : ''} value="3">Completed</option>
                                    <option ${study_data.status === "4" ? 'selected' : ''} value="4">Canceled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    },
}