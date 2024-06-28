
import {KrThing} from '../class_KrThing.js'

import { KrCache } from '../class_krCache/class_krCache.js'



//const API_URL = 'https://data.krknapi.com/api/test7'

const API_URL ='https://2d432316-7c15-4f0f-9214-d4f6fba60627-00-1b1hmvrd8c12s.spock.replit.dev/api/test7'

export class KrDb {
    /**
     * Database to store things and access API
     *
     * Attributes:
     * - _api_url: the url for the api
     * - things: Lis tof all things in db cache local
     *
     * Methods:
     * - get: get thing from local cache
     * - set: set thing in local cache
     * - getFromApi: get from api
     * - postToApi: post to Api
     * - postAll: post all things to api
     * - refreshAll: refresh all things from api
     * 
     */


    constructor(api_url=null) {
        this._localCache = new KrCache()
        this._apiCache = new KrCache()        
        this._api_url = api_url || API_URL        
    }

    get things(){
        return this._localCache.things
    }

    get(record_type, record_id){
        /**
         * Returns thing from local cache.
         * If not present, creates one and calls api to refresh data
         */
        let localThing =  this._localCache.get(record_type, record_id)
        if(localThing && localThing != null){
            return localThing
            
        } else {

            let thing = new KrThing(record_type, record_id)
            this._localCache.set(thing)
            this.getFromApi(record_type, record_id)
        }
        
    }
    
    set(thing){
        this._localCache.set(thing)

        for(let t of thing.things){
            let localT = this._localCache.get(t.record_type, t.record_id)
            if(!localT || localT == null){
                this._localCache.set(t)
            }
        }        
    }

    async postAll(){
        /**
         * Posts all thing to API if they have changed
         */
        let records = []
        for(let t of this._localCache.things){
            console.log('t',t.record_type, t.record_id)
            if(this._testIsInSync(t.record_type, t.record_id)== false){ 
                records.push(t.getSystemRecord())
                
            }
        }
        let result = await postRecordToApi(this._api_url, records)
        return result
    }

    async refreshAll(){
        /**
         * Retrieve latest value from api
         */
        let results = []
        for(let thing of this._apiCache.things){
            let result = await this.getFromApi(thing.record_type, thing.record_id)
            results.push(result)
        }
        return results
    }

    _testIsInSync(record_type, record_id){
        /**
         * Returns true if api cache is equal to local cache
         */

        let local = this._localCache.get(record_type, record_id)
        let api = this._apiCache.get(record_type, record_id)

        let localRecord = JSON.stringify(local)
        let apiRecord = JSON.stringify(api)

        return localRecord == apiRecord
        
    }


    async getFromApi(record_type, record_id){
        /**
         * Updates local thing with value from API
         */


        // Retrieve record from api
        let systemRecord = await getRecordFromApi(this._api_url, record_type, record_id)
        if(!systemRecord || systemRecord == null) { return }

        // Store api thing in cache
        let apiThing = new KrThing()
        apiThing.setSystemRecord(systemRecord)
        this._apiCache.set(apiThing)
        
        // Retrieve corresponding thing from local cache
        let thing = this._localCache.get(record_type, record_id)

        // Create new thing if not exist
        if(! thing || thing == null){
            thing = new KrThing()
            this._localCache.set(thing)
        }

        // Load record to thing
        thing.setSystemRecord(systemRecord)
        
        return thing
    
    }


    async postToApi(thing){

        // Skip if already in sync
        if(this._testIsInSync(thing.record_type, thing.record_id)){ return true }

        let result = await postRecordToApi(this._api_url, thing.getSystemRecord())
        return result
    }
}



async function getRecordFromApi(api_url, record_type, record_id){

    let url = `${api_url}?record_type=${record_type}&record_id=${record_id}` 
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      });


    let text = await response.text()

    let systemRecord = null
    if(text){
        systemRecord = JSON.stringify(text)
    } else { return false }

    return systemRecord
    
}


async function postRecordToApi(api_url, record){

    let url = api_url 

    const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify(record), 
    });


    let result = await response.json()

    return result
}