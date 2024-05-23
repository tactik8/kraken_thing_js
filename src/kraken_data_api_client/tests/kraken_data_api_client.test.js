import { KrakenDataApiClient } from "../kraken_data_api_client.js";

// Run the test
test("KrakenDataApiClient init",  () => {
    let k = new KrakenDataApiClient();

    var record_type = "Thing";
    var record_id = "test_KrakenDataApiClient_01";
    let record = {
        "@type": record_type,
        "@id": record_id,
        name: record_id,
    };





    
    //console.log('post');
    
    return k.post(record).then((response) => {
        return k.get(record_type, record_id).then((new_record) => {
            expect(new_record['@id']).toStrictEqual(record_id);
            
        });
    });
});


test("Dummy init", function () {
    expect(true).toStrictEqual(true);
});
