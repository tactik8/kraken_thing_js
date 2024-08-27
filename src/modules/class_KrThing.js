

//import { KrThing as KrThingRecord } from '../../node_modules/krakenrecordjs/kraken_record/kraken_record.js';

import { KrThing as KrThingRecord } from 'krakenrecord';


import { KrakenSchemas, KrSchemaItem } from 'krakenschema'

import { KrSamples } from 'krakenschema'

import { KrakenDataApiClient } from "../kraken_data_api_client/kraken_data_api_client.js";

import {krakenHtml} from 'krakenhtml'



//import { kraken_bootstrap } from 'https://tactik8.github.io/krakenJsBootstrap/kraken_bootstrap/kraken_bootstrap.js'



export class KrThing extends KrThingRecord {
    
    /**
     * Constructor Provide record_type/record_id or record
     * Attributes:
     *
     * - Base: (inherited from krakenRecord)
     *     - record:     Returns json record
     *     - property:
     *     - getProperty:
     *     - setProperty:
     *
     * - Metadata:
     *     - credibility or c:    
     *         - observationDate or d:
     *     - record:     Returns json record
     * - schema:         Schema object for thing
     * - html:     (inherited from krakenHtml )
     * - 
     *
     */
    constructor(record_type = null, record_id = null) {
        super(record_type, record_id);
        this.basePath = null
        this._urlOptions = {}

        this._schema = null
        this._html = null
        
    }

    toString(){
        return `${this.record_type}/${this.record_id}`
    }

    toJSON(){
        return this.record
    }



    // -----------------------------------------------------
    //  Set imported libraries 
    // -----------------------------------------------------

    
    //schema
    /**
     * schemas for thing
     * @returns {KrSchemaItem}  KrSchemaItem Object  
     */

    #setLibraries(){

        this._schema = KrakenSchemas.get(this.record_type);
        this._schema.thing = this

        this._html = new krakenHtml.KrakenHtmlClass(this.record, this.urlOptions)
        
    }
    
    get schema(){
        this._schema = KrakenSchemas.get(this.record_type);
        this._schema.thing = this
        return this._schema
    }

    get html(){
        this._html = new krakenHtml.KrakenHtmlClass(this.record, this.urlOptions)
        return this._html
    }

    

    // -----------------------------------------------------
    //  Methods overwrite 
    // -----------------------------------------------------

    getProperty(propertyID){
        let property = super.getProperty(propertyID)
        let schema = KrakenSchemas.getItem(propertyID)
        property.schema = schema
        for(let pv of property._propertyValues){
            pv.schema = schema
        }
        
        return property
    }

    
    
    // -----------------------------------------------------
    //  Properties 
    // -----------------------------------------------------
    
    


    new(record_type, record_id){
        //super.method();
        return new KrThing(record_type, record_id);
    }



    // -----------------------------------------------------
    //  api
    // -----------------------------------------------------


    

    
    // API

    async api_get() {

        let previousRecord = this.getSystemRecord()
        var k = new KrakenDataApiClient();
        var fullRecord = await k.get(this.record_type, this.record_id)
        
        this.setSystemRecord(fullRecord);

        if(this.getSystemRecord() != previousRecord){

            let eventRecord = {
                "@type": "updateAction",
                "@id": String(crypto.randomUUID()),
                "targetCollection": this.record_ref,
                "object": this.record,
                "actionStatus": "completedActionStatus",
                "timeStart": new Date(),
                "timeEnd": new Date()
            }


            const newEvent = new CustomEvent("kr-updateAction", { detail: eventRecord });
            this.dispatchEvent(newEvent)
            
        }
       
        return;
        
    }
    async api_post() {
        
        var k = new KrakenDataApiClient();

        let records = []
        records.push(this.getSystemRecord())
        
        for(let t of this.things){
            records.push(t.getSystemRecord())
        }
        
        return await k.post(records);
    }


    // -----------------------------------------------------
    //  Headings  
    // -----------------------------------------------------


    get_sample(record_id){
        let r = KrSamples(this.record_type, record_id);
        return r;
    }

    set_sample(record_id){

        this.setFullRecord(KrSamples(this.record_type, record_id));
    }



    // -----------------------------------------------------
    //  HTML 
    // -----------------------------------------------------

    get urlOptions(){
        let options = this._urlOptions
        options.basePath = this.basePath || this._urlOptions?.basePath 
        options.record_type = this.record_type
        options.record_id = this.record_id
        return options
    }

    set urlOptions(value){
        this._urlOptions = value
    }

    
    
}




function ensureArray(value) {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}