



function getForm(jsonSchema, record){

    var formDivElement = document.createElement('div');
    var formElement = document.createElement('form');
    formDivElement.appendChild(formElement);

    formElement.appendChild(get_FormElement(jsonSchema, record, null));

    return formDivElement;

}


function get_FormElement(jsonSchema, record, prefix){

    console.log('entry', jsonSchema);


    if (jsonSchema && jsonSchema.choices){
        console.log('option 1');
        return get_selectFormInputElement(jsonSchema, record, prefix);
    };

    if (jsonSchema && jsonSchema.type == 'object'){
        console.log('option 2');
        return get_ObjectFormElement(jsonSchema, record, prefix);
    };

    if (jsonSchema && jsonSchema.type == 'array'){
        console.log('option 3');
        return get_ArrayFormElement(jsonSchema, record, prefix);
    };

    if (jsonSchema && jsonSchema.type == 'string'){
        console.log('option 4');
        return get_inputFormElement(jsonSchema, record, prefix);
    };
    console.log('no Option', jsonSchema);
}

function get_ObjectFormElement(jsonSchema, record, prefix){
    /**
     * 
     */

    let formObjectElement = document.createElement('div');


    var keys = Object.keys(jsonSchema.properties);
    for(let i=0; i< keys.length; i++){

        console.log('key', keys[i]);

        if(record && record[keys[i]]){ var new_record = record[keys[i]] } else { var new_record = null};

        let formObjectElementRow = document.createElement('div');
        formObjectElementRow.classList.add('row');
        formObjectElementRow.classList.add('m-3');
        formObjectElement.appendChild(formObjectElementRow);

        let formObjectElementCol1 = document.createElement('div');
        formObjectElementCol1.classList.add('col');
        formObjectElementCol1.classList.add('col-9');
        formObjectElementRow.appendChild(formObjectElementCol1);

        let formObjectElementCol2 = document.createElement('div');
        formObjectElementCol2.classList.add('col');
        formObjectElementCol2.classList.add('col-9');
        formObjectElementRow.appendChild(formObjectElementCol2);

        formObjectElementCol1.appendChild(get_inputLabel(jsonSchema.properties[keys[i]].title || keys[i]));
        formObjectElementCol2.appendChild(
            get_FormElement(
                jsonSchema.properties[keys[i]],
                new_record,
                [prefix, keys[i]].filter(Boolean).join('.')
            )
        )
    };
    console.log('zz', formObjectElement);
    return formObjectElement;

}

function get_ArrayFormElement(jsonSchema, record, prefix){

    console.log('fff', jsonSchema, record, prefix);
    var records = ensureArray(record);

    var formArrayElement = document.createElement('div');

    var formArrayElementControls = document.createElement('div');
    formArrayElementControls.classList.add('justify-content-end');
    formArrayElementControls.classList.add('text-end');
    formArrayElement.appendChild(formArrayElementControls);

    var formArrayElementControlsButton = document.createElement('a');
    formArrayElementControlsButton.appendChild(get_plus_button());
    formArrayElementControlsButton.setAttribute('type', 'button');
    formArrayElementControls.appendChild(formArrayElementControlsButton);

    // add click
    formArrayElementControlsButton.addEventListener("click", function(e) {
        var last_item = formArrayElement.lastChild;
         last_item.before(get_ArrayFormElementItem(jsonSchema, null, prefix, formArrayElement.children.length -1));
            });


    for(let i=0; i< records.length; i++){

        var last_item = formArrayElement.lastChild;

        last_item.before(get_ArrayFormElementItem(jsonSchema, records[i], prefix, i));

    return formArrayElement;

    }
}



function get_ArrayFormElementItem(jsonSchema, record, prefix, row_number){

    let formArrayElementRowItem = document.createElement('div');
    formArrayElementRowItem.classList.add('row');
    formArrayElementRowItem.classList.add('m-3');

    let formArrayElementCol1 = document.createElement('div');
    formArrayElementCol1.classList.add('col');
    formArrayElementCol1.classList.add('col-1');
    formArrayElementCol1.textContent = row_number;
    formArrayElementRowItem.appendChild(formArrayElementCol1);

    let formArrayElementCol2 = document.createElement('div');
    formArrayElementCol2.classList.add('col');
    formArrayElementCol2.classList.add('col-11');
    formArrayElementRowItem.appendChild(formArrayElementCol2);


    formArrayElementCol2.appendChild(
            get_FormElement(
                jsonSchema.items,
                record,
                [prefix, `[${row_number}]`].filter(Boolean).join('')
            )
        );



    return formArrayElementRowItem;

};


function get_plus_button(){

    var content = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    </svg>`
    let element = document.createElement('div');
    element.innerHTML = content;
    return element
}

function get_selectFormInputElement(jsonSchema, record, prefix){

    var form_input = document.createElement('select');
    form_input.classList.add('form-select');
    form_input.id = prefix;
    form_input.name = prefix;

    console.log(jsonSchema, jsonSchema.options);
    for(let i=0; i<jsonSchema.choices.length; i++){

        let option = jsonSchema.choices[i];
        var new_option_element = document.createElement('option');
        new_option_element.value = option;
        new_option_element.textContent = option;
        form_input.appendChild(new_option_element);
    };
    form_input.value = record; 
    return form_input;
}

function get_inputFormElement(jsonSchema, record, prefix){


    var form_input = document.createElement('input');
    form_input.classList.add('form-control');
    form_input.type = jsonSchema.tags[0];
    form_input.id = prefix;
    form_input.name = prefix;
    form_input.value = record;



    return form_input;
}


function get_inputLabel(content){


    var form_label = document.createElement('label');
    form_label.classList.add('form-label');
    form_label.textContent = content;
    return form_label;

}

function ensureNotArray(value) {
    let new_value = ensureArray(value);
    if (new_value.length > 0) {
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

var jsonSchema = JSON.parse(`{"title":"Action","type":"object","properties":{"name":{"type":"array","items":{"type":"string","tags":["text"]}},"url":{"title": "link", "type":"array","items":{"type":"string","tags":["url"]}},"alternateName":{"type":"array","items":{"type":"string","tags":["text"]}},"actionStatus":{"type":"array","items":{"type":"string","choices":["FailedActionStatus","ActiveActionStatus","PotentialActionStatus","CompletedActionStatus"]}},"startTime":{"type":"array","items":{"type":"string","tags":["time"]}},"endTime":{"type":"array","items":{"type":"string","tags":["time"]}},"object":{"type":"array","items":{"title":"Thing","type":"object","properties":{"name":{"type":"array","items":{"type":"string","tags":["text"]}},"url":{"type":"array","items":{"type":"string","tags":["url"]}}}}},"result":{"type":"array","items":{"title":"Thing","type":"object","properties":{"name":{"type":"array","items":{"type":"string","tags":["text"]}},"url":{"type":"array","items":{"type":"string","tags":["url"]}}}}},"error":{"type":"array","items":{"title":"Thing","type":"object","properties":{"name":{"type":"array","items":{"type":"string","tags":["text"]}},"url":{"type":"array","items":{"type":"string","tags":["url"]}}}}}}}`);

var record = {
    "@type": "Action",
    "@id": "Test",
    "name": "Action name",
    "actionStatus": "CompletedActionStatus"
};
// Call the function to generate the form with seed data
var formElement = getForm(jsonSchema, record);



var d = document.getElementById('test');
d.appendChild(formElement);