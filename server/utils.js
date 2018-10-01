function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

const required_fields = {
    patient: ['name'],
    study: ['patient', 'description', 'status', 'start_time']
};

module.exports = {
    /**
     * Generate pseudo id
     * @returns {string}
     */
    guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    /**
     * Check if required data was provided, generate error text
     * @param data {Object} validated object
     * @param type {String} object type for comparison
     * @returns {boolean/string} successful validation or error message
     */
    validate(data, type) {
        const invalid_fields = [];
        const comparison = required_fields[type];

        if(!comparison) {
            return true;
        }

        Object.keys(data).forEach((value, field_name) => {
            if (!comparison.contains(field_name)) {
                return;
            }
            let _value = value;
            if (typeof _value === "string") {
                _value = _value.trim();
            }
            if (!_value) {
                invalid_fields.push(field_name);
            }
        });
        if (invalid_fields.length) {
            // return error text
            let qty = invalid_fields.length;
            return `${qty > 1 ? 'Fields' : 'Field'} ${invalid_fields.split(', ')} ${qty > 1 ? 'were': 'was'} not provided.`;
        }

        return true;
    },

    successResponse: function(payload) {
        return {
            status: "success",
            payload
        }
    },

    errorResponse: function(message) {
        return {
            status: "error",
            message
        }
    }
};