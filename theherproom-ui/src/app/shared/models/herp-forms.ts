import {Validators} from "@angular/forms";

const DATA_STEP_1 = {
    herp: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

};

const DATA_STEP_2 = {
    sex: { label: ['male', 'female'], type: 'radio', validations: {}, errors: {}, placeholder: '' },
    weight: { type: 'textarea', validations: {}, errors: {}, placeholder: '' },
    length: { type: 'textarea', validations: {}, errors: {}, placeholder: '' },
    breeder: {type: 'radio', validations: {}, errors: {}, placeholder: ''}
};


const ADD_HERP_FORM = [
    { data: DATA_STEP_1 },
    { data: DATA_STEP_2 }
];

export { ADD_HERP_FORM }
