
export var data = {
    heading1: heading1,
    heading2: heading2,
    heading3: heading3,
    image: image,
    text: text,
    tableKeys: tableKeys
}



export function heading1(record){

    if(!record || !record['@type']){
        return '';
    }
    if (record['@type'] == 'person' && (record.givenName || record.familyName)){
        return [record.givenName, record.familyName].join(' ');
    };

    if (record['@type'] == 'postalAddress' && record.addressLocality){
        return [address.streetAddress, record.addressLocality, record.addressRegion].join(', ');
    };

    if (record['@type'] == 'listItem' && (record.item)){
        return heading1(record.item);
    };

    if(record.headline){
        return record.headline;
    }
    if(record.name){
        return record.name;
    }
    if (record.url){
        return record.url;
    }
    return record['@id'];

}


export function heading2(record){

    if(!record || !record['@type']){
        return '';
    }

    if (record['@type'] == 'person' && record.email){
        return [record.email].join(' ');
    };

    if (record['@type'] == 'action'){
        return [record.actionStatus].join(' ');
    };
    if (record['@type'] == 'listItem' && (record.item)){
        return heading2(record.item);
    };

    if (record.url && heading1(record) != record.url){
        return record.url;
    };

    if (record.email && heading1(record) != record.email){
        return record.email;
    };

    return '';


}


export function heading3(record){

    if(!record || !record['@type']){
        return '';
    }

    if (record['@type'] == 'person' && (record.jobTitle || record.worksFor)){
        return [record.jobTitle, heading1(record.worksFor)].join(', ');
    };

    if (record['@type'] == 'action' && record.agent){
        return [heading1(record.agent)].join(' ');
    };

    if (record.url && heading1(record) != record.url){
        return record.url;
    };

    return '';


}

export function text(record){


    if(record.reviewBody){
        return record.reviewBody;
    };
    
    if (record.text){
        return record.text;
    };
    if (record.description){
        return record.description;
    };

    
    
}


export function image(record){

    if(!record || !record['@type']){
        return '';
    }

    if (record['@type'] == 'listItem' && record.item){
        return image(record.item);
    };

    if (record['@type'] == 'action' && record.agent){
        return [heading1(record.agent)].join(' ');
    };

    if (record.contentUrl){
        return record.contentUrl;
    };

    if (record.thumbnailUrl){
        return record.thumbnailUrl;
    };
    if (record.image){

        if (record.image['@type']){
            return image(record.image);
        } else {
            return record.image;
        }
    };

    if (record.logo){

        if (record.logo['@type']){
            return image(record.logo);
        } else {
            return record.logo;
        }
    };

    return '';


}


function tableKeys(record){

    if(Array.isArray(record)){
        record = record[0];
    };

    if(record['@type'] == 'person'){
        return ['givenName', 'familyName', 'email', 'worksFor'];
    };

    if(record['@type'] == 'action'){
        return ['name', 'startTime', 'endTime', 'actionStatus'];
    };

    if(record['@type'] == 'person'){
        return ['givenName', 'familyName', 'email', 'worksFor'];
    };
    
}