
import { KrThing as KrThingRecord } from 'https://tactik8.github.io/krakenJsLibraryRecord/kraken_record/kraken_record.js';
import { KrakenSchemas } from '../kraken_schema/kraken_schema.js';

import {KrThing } from './class_KrThing.js';

export class KrAction extends KrThing {
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


    constructor(object, result, error) {
        super('Action', null);

        this.actionStatus = 'completedActionStatus';
        this.startTime = new Date();
        this.endTime = new Date();
        if(object){this.setProperty('object', object)};
        if(result){this.setProperty('result', result)};


        if(!this.object){ this.setProperty('object', new KrThing())};
        if(!this.instrument){ this.setProperty('instrument', new KrThing())};
        if(!this.agent){ this.setProperty('agent', new KrThing())};
        if(!this.result){ this.setProperty('result', new KrThing())};
        
        if(error){
            this.error = error;
            this.actionStatus = 'failedActionStatus';
        }        
    }
}