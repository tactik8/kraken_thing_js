




export async function kraken_api_get_async(apiBaseUrl, apiPath, headers, record_type, record_id) {

    const requestOptions = {
        method: 'GET',
        headers: headers,

    };

    let params = { "@type": record_type, "@id": record_id };

    let new_url = new URL(apiPath, apiBaseUrl);
    new_url.search = new URLSearchParams(params);


    const response = await fetch(new_url, requestOptions)
    
    let record = await response.json();
    console.log('vv', record)
    return record

}





export async function kraken_api_post_async(apiBaseUrl, apiPath, headers, record) {

    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(record)
    };
    
    let new_url = new URL(apiPath, apiBaseUrl);
    
    const response = await fetch(new_url, requestOptions)

    return response.json();

}