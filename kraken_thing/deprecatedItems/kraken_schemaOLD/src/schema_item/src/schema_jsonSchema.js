





export function get_jsonSchemaLight(item, depth=0) {
    return jsonSchemaBuilder(item, true, depth);
}

export function get_jsonSchema(item, depth=0) {
    //console.log('b', item.record_id);
    return jsonSchemaBuilder(item, false, depth);
}

    
export function jsonSchemaBuilder(item, isLight, depth=0) {

    // 

       
    //console.log('it', item.record_type);
    if (item.enumerationItems && item.enumerationItems.length > 0) {
        //console.log('aa');
        return getEnumeration(item, isLight, depth);
    } else if (item.record_id == "URL") {
        //console.log('bb');
        return getUrl(item, isLight, depth);
    } else if (item.record_type == "rdfs:Class") {
        //console.log('cc');
        if(depth >= 2) { return getId(item, isLight, depth)} else {
        return getClass(item, isLight, depth +1)};
    } else if (item.record_type == "rdf:Property") {
        //console.log('dd');
        return getProperty(item, isLight, depth);
    } else if (item.record_type == "schema:DataType") {
        //console.log('ee');
        return getDatatype(item, isLight, depth);
    } else{
        console.log('None', item);
    }
}





function getEnumeration(item, isLight, depth) {
    // Get enumeration
    var choices = [];
    for (let i = 0; i < item.enumerationItems.length; i++) {
        choices.push(item.enumerationItems[i].record_id);
    }

    var jsonRecord = {
        type: "string",
        choices: choices,
    };
    return jsonRecord;
}

function getUrl(item, isLight, depth) {
    return {
        type: 'string',
    };
}


function getId(item, isLight, depth) {
    return {
        title: item.record_id,
        type: "object",
        properties: {
            "@id": "string"
        }
    };
}


function getClass(item, isLight, depth) {

    console.log('isLight', isLight);
    if(isLight==true){
        var properties = item.propertiesLight;
    } else { 
        var properties = item.properties;
   };

    
    var jsonRecord = {
        title: item.record_id,
        type: "object",
        properties: {},
    };

    for (let i = 0; i < properties.length; i++) {
        var p = properties[i];
        if (p) {
            jsonRecord.properties[p.record_id] = p.get_jsonSchema_system(isLight, depth);
        }
    }

    return jsonRecord;
}

function getProperty(item, isLight, depth) {

        var jsonRecord = {
            type: "array",
            items: item.expectedType.get_jsonSchema_system(isLight, depth),
        };
        return jsonRecord;
  
}

function getDatatype(item, isLight, depth) {
    var jsonRecord = {
        type: item.jsonSchemaType,
        tags: [item.htmlType],
    };
    return jsonRecord;
}

