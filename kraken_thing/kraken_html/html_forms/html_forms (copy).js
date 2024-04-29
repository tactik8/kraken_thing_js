

import { KrakenSchemas } from '../../kraken_schema/kraken_schema.js';


export function get_html_form(record_types){
    
    
    record_types = ensureArray(record_types);
    
    let things = [];
    for(let i=0; i< record_types.length; i++){
        things.push(KrakenSchemas.get(record_types[i]));
    };

    let f = document.createElement('form');

    f.appendChild(get_inputs(things));

    return f;

}


function get_inputs(things, prefix=null){

    things = ensureArray(things);

    let form_group = document.createElement('div');

    for (let t=0; t< things.length; t++){

        let thing = things[t];

        for(let i=0; i< thing.propertiesLight.length; i++){

            let new_prefix = [prefix, thing.record_id + `[${t}]`].filter(Boolean).join('.');

            form_group.appendChild(get_input_group(thing.propertiesLight[i], new_prefix));

        };  
    };
    return form_group;

}


function get_input_group(property, prefix=null){

    var form_div = document.createElement('div');
    form_div.classList.add('mb-3');

    // Add label
    form_div.appendChild(get_input_label(property));

    // Add inputs

    // iterate through all possible types
    for(let t = 0; t < property._types.length; t++){

        var ptype = property._types[t];


        // if object
        console.log(property.record_id, ptype.type_html);
        if (ptype.type_html == 'object'){
            form_div.appendChild(get_input_object(ptype, prefix));
        }

        // if dropdown
        else if(ptype.type_html == 'select'){
            form_div.appendChild(get_input_dropdown(property, ptype, prefix));
        }

           // if not dropdown
        else {
            form_div.appendChild(get_input_standard(property, ptype, prefix));
        };

    

    };
    return form_div;
}



function get_input_label(property){

    var form_label = document.createElement('label');
    form_label.classList.add('form-label');
    form_label.textContent = property.record_id;
    return form_label;

}



function get_input_object(thing, prefix=null){


    var div_row = document.createElement('div');
    div_row.classList.add('row');

    var div_col1 = document.createElement('col');
    div_col1.classList.add('col');
    div_col1.classList.add('col-2');
    div_row.appendChild(div_col1);

    var div_col2 = document.createElement('col');
    div_col2.classList.add('col');
    div_col2.classList.add('col-10');
    div_col2.appendChild(get_inputs(thing, prefix));
    div_row.appendChild(div_col2);

    return div_row;

}

function get_input_standard(property, ptype, prefix=null){

    let element_id = [prefix, property.record_id].filter(Boolean).join('.');

    var form_input = document.createElement('input');
    form_input.classList.add('form-control');
    form_input.type = ptype.type_html;
    form_input.id = element_id;
    form_input.name = property.record_id;
    return form_input;

}

function get_input_dropdown(property, ptype, prefix=null){

    let element_id = [prefix, property.record_id].filter(Boolean).join('.');

    var form_input = document.createElement('select');
    form_input.classList.add('form-select');
    form_input.id = element_id;
    form_input.name = property.record_id;

    for(let u=0; u< ptype.value_options.length; u++){

        let option = ptype.value_options[u];

        var new_option_element = document.createElement('option');
        new_option_element.value = option.record_id;
        new_option_element.textContent = option.record_id;
        form_input.appendChild(new_option_element);

    };
    return form_input;
}



function ensureNotArray(value) {
    let new_value = ensureArray(value);
    if(new_value.length > 0){
        return new_value[0];
    } else {
        return null;
    }
}

function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}