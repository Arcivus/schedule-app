import $ from "jquery";
import './scss/main.scss';
import events from './js/events';

import control_panel from './js/components/control-panel';
import studies_list from './js/components/studies-list';


let app = {
    init() {
        this.listeners();
        control_panel.init();
        studies_list.init();
    },
    listeners() {
        let $body = $('body');
        $body.on('submit', 'form', this.handleFormSubmit.bind(this));
    },

    handleFormSubmit(e) {
        e.preventDefault();
        let form = e.currentTarget;
        let $form = $(form);
        $form.addClass('was-validated');
        if (!form.checkValidity()) {
            return;
        }
        $form.addClass('preloader');
        let data = $form.serializeArray();
        $.ajax({
            type: "POST",
            url: $form.attr('action'),
            data: data,
            success: (response) => {
                $form.removeClass('preloader');
                if(response.status === "success") {
                    // Alarm components that data changed
                    $('body').trigger(`${events.DATA_UPDATE}:${$form.data('type')}`, response.payload);
                    this.clearForm($form);
                }

            }
        });
    },

    /**
     * Clear controls data and remove submit classes
     * @param $form
     */
    clearForm($form) {
        $form.find('input, select, textarea').val('');
        $form.removeClass('was-validated');
    },
};

app.init();

