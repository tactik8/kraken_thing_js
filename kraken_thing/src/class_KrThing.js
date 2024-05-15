
//import { KrThing as KrThingRecord } from '../kraken_record/kraken_record.js';
import { KrThing as KrThingRecord } from 'https://tactik8.github.io/krakenJsLibraryRecord/kraken_record/kraken_record.js';


import { KrakenSchemas } from 'https://tactik8.github.io/krakenJsSchema/kraken_schema/kraken_schema.js'

import { KrSamples } from 'https://tactik8.github.io/krakenJsSchema/kraken_schema/kraken_schema.js'


import { KrakenDataApiClient } from "../kraken_data_api_client/kraken_data_api_client.js";
import { kraken_bootstrap } from 'https://tactik8.github.io/krakenJsBootstrap/kraken_bootstrap/kraken_bootstrap.js'



//import {get_html_form } from '../kraken_html/html_forms/html_forms.js';

export class KrThing extends KrThingRecord {
    /* Contains metadata to qualify a value

    attributes:
    - credibility or c:    
    - observationDate or d: 
    - record:         Returns all metadata in a dict
    - object:         The original source of the data
    - Instrument:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */


    constructor(record_type = null, record_id = null) {
        super(record_type, record_id);
        
    }


    get html_form(){
        //return get_html_form(this.record_type);
    }


    get schema(){
        return KrakenSchemas.get(this.record_type);
    }


    
    // -----------------------------------------------------
    //  Properties 
    // -----------------------------------------------------
    
    get actionStatus(){
        return this.getProperty('actionStatus').value;
    }
    set actionStatus(value){
        return this.setProperty('actionStatus',value);
    }
    
    get endTime(){
        return this.getProperty('endTime').value;
    }
    set endTime(value){
        return this.setProperty('endTime',value);
    }

    get error(){
        return this.getProperty('error').value;
    }
    set error(value){
        return this.setProperty('error',value);
    }
    
    get familyName(){
        return this.getProperty('familyName').value;
    }
    set familyName(value){
        return this.setProperty('familyName',value);
    }
    
    get givenName(){
        return this.getProperty('givenName').value;
    }
    set givenName(value){
        return this.setProperty('givenName',value);
    }
    
    get name(){
        if(this.getProperty('name')){
            return this.getProperty('name').value;
        };
        return null;
    }
    set name(value){
        return this.setProperty('name', value);
    }

    get startTime(){
        return this.getProperty('startTime').value;
    }
    set startTime(value){
        return this.setProperty('startTime',value);
    }

    get url(){
        return this.getProperty('url').value;
    }
    set url(value){
        return this.setProperty('url',value);
    }

    // ----------------
    
    get agent(){
        var property = this.getProperty('agent');
        if(property){
            return property.value;
        };
        return null;
    }

    set agent(value){
        return this.setProperty('agent', value);
    }
    get instrument(){
        var property = this.getProperty('instrument');
        if(property){
            return property.value;
        };
        return null;
    }
    
    set instrument(value){
        return this.setProperty('instrument',value);
    }
    get object(){
        var property = this.getProperty('object');
        if(property){
            return property.value;
        };
        return null;
    }
    set object(value){
        return this.setProperty('object', value);
    }
    
    get result(){
        var result = this.getProperty('result');
        if(!result){
            result = new KrThing();
            this.setProperty('result', result);
        };
        return result;
    }
    set result(value){
        return this.setProperty('result', value);
    }


    new(record_type, record_id){
        //super.method();
        return new KrThing(record_type, record_id);
    }

    // API

    async api_get() {
        var k = new KrakenDataApiClient();
        var fullRecord = await k.get(this.record_type, this.record_id)
        this.setSystemRecord(fullRecord);
        return;
        
    }
    async api_post() {
        var k = new KrakenDataApiClient();
        return await k.post(this.getSystemRecord());
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
    
    get_heading1(){
        
        return this.schema.get_heading1(this.getBestRecord());
    }
    get_heading2(){
        return this.schema.get_heading2(this.getBestRecord());
    }
    get_headingText(){
        return this.schema.get_heading_text(this.getBestRecord());
    }
    get_headingImage(){
        return this.schema.get_heading_image(this.getBestRecord());
    }
    




    
    // html

    html_form(){

        
    }

    html_cardVertical(){
        
        return kraken_bootstrap.library.main.card.card_vertical(this.get_headingImage(), this.get_heading1(), this.get_heading2(), this.get_headingText())
        
    }
    html_cardSmall(){

        return kraken_bootstrap.library.main.card.card_small(this.get_headingImage(), this.get_heading1(), this.get_heading2(), this.get_headingText())
    }
}