import { kraken_api_post_async } from './kraken_data_api_client_methods.js';
import { kraken_api_get_async } from './kraken_data_api_client_methods.js';

export class KrakenDataApiClient {
    constructor(apiBaseUrl = null, apiPath = null) {

        this.apiBaseUrl = apiBaseUrl;
        this.apiPath = apiPath;
        this.headers = null;
        this.init_KrakenApi();

    }

    init_KrakenApi() {

        //this.apiBaseUrl = this.apiBaseUrl || 'https://5a37e52f-2a27-47ff-b754-2a573636cb5a-00-ayio2unothdd.spock.replit.dev';

        if(!this.apiBaseUrl){this.apiBaseUrl = this.apiBaseUrl || 'https://data.krknapi.com'};

        if(!this.apiPath){this.apiPath = this.apiPath || '/api/test_container'};

        this.headers = this.headers || {
            "Content-Type": "application/json",
            "Authorization": "bob"
        };

    }

    get(record_type, record_id) {

        return kraken_api_get_async(this.apiBaseUrl, this.apiPath, this.headers, record_type, record_id);
    }
    post(record) {

        return kraken_api_post_async(this.apiBaseUrl, this.apiPath, this.headers, record, this.headers);


    }

}



