
import {KrThing} from '../class_KrThing.js'

//const API_URL = 'https://data.krknapi.com/api/test7'

const API_URL ='https://2d432316-7c15-4f0f-9214-d4f6fba60627-00-1b1hmvrd8c12s.spock.replit.dev/api/test7'

export class KrDb {


    constructor(api_url=null) {
        this._things = {}

        this._api_url = api_url || API_URL
        
    }

    getFromCache(record_type, record_id){

        return this._things?.[record_type]?.[record_id] || null

    }

    postToCache(thing){

        if(!thing.record_type){
            let t = new KrThing()
            t.record = thing
            thing = t
        }
        
        let record_type = thing.record_type
        let record_id = thing.record_id

        if(!this._things[record_type]){
            this._things[record_type] = {}
        }
        this._things[record_type][record_id] = thing

    }

    get things(){

        let things = []
        for(let record_type of Object.keys(this._things)){
            for(let record_id of Object.keys(this._things?.[record_type])){
                if(this._things?.[record_type]?.[record_id]){
                    things.push(this._things?.[record_type]?.[record_id])
                }
            }
        }
    }

    async getFromApi(record_type, record_id){

        let url = `${this._api_url}?record_type=${record_type}&record_id=${record_id}` 
         
       
        console.log(url)
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            //body: JSON.stringify(data), 
          });


        let text = await response.text()

        let systemRecord = null
        if(text){
            systemRecord = JSON.stringify(text)
        } else { return false }

        
        let thing = this.getFromCache(record_type, record_id)

        if(! thing || thing == null){
            thing = new KrThing()
        }
        thing.setSystemRecord(systemRecord)
        this.postToCache(thing)

        return thing
    
    }



    async postToApi(thing){

        let url = this._api_url 

        let record = thing.getSystemRecord()
        
        const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
            body: JSON.stringify(record), 
        });


        let result = await response.json()
        console.log('result', result)

        return thing

    }



}