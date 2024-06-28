




export async function kraken_api_get_async(apiBaseUrl, apiPath, headers, record_type, record_id) {

    const requestOptions = {
        method: 'GET',
        headers: headers,

    };

    console.log('get', record_type, record_id)
    let params = { "@type": record_type, "@id": record_id };

    let new_url = new URL(apiPath, apiBaseUrl);
    new_url.search = new URLSearchParams(params);


    const response = await fetch(new_url, requestOptions)
    
    let record =  await response.json()
    console.log(response.body)
    console.log('get', record)
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

    
    let result = await response.json();

    console.log('res', response.status)
    return result
}