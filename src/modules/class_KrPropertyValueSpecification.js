
import { KrThing as KrThingRecord } from 'krakenrecord';


import {KrThing } from './class_KrThing.js';

export class KrPropertyValueSpecification extends KrThing {
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



    // -----------------------------------------------------
    //  Methods 
    // -----------------------------------------------------

    test(thing){
        /**
         * Test if a given thing meets the condition 
         */

        let propertyID = this.propertyID
        let value = thing.getProperty(propertyID).value

        
        // Test min / max value
        if (this.minValue){
            if (value < this.minValue) { return false }
        }
        if (this.maxValue){
            if (value > this.maxValue) { return false }
        }

        // Test valueRequired
        if (this.valueRequired == true && (value === undefined || value === null )){
            return false
        }

        // Test valuePattern
        if(this.valuePattern){
            const re = new RegExp(this.valuePattern);
            const result = re.test(value)
            if(result == false){ return false }
        }

        // Default
        return true
    }


    // -----------------------------------------------------
    //  Helpers to build conditions 
    // -----------------------------------------------------

    setEqualTo(value){
        if(typeof value != "string"){
            this.minValue = value
            this.maxValue = value
        } else {
            this.valuePattern = `^${value}$`
        }
    }

    setContains(value){
        this.valuePattern = `${value}`
    }

    setContainsWord(value){
        this.valuePattern = `\\b${value}\\b`
    }

    setStartsWith(value){
        this.valuePattern = `^${value}`
    }

    setEndsWith(value){
        this.valuePattern = `${value}$`
    }
    
    setGE(value){
        this.minValue = value
    }

    setLE(value){
        this.maxValue = value
    }
    

    // -----------------------------------------------------
    // ---------------- Specific properties ----------------
    // -----------------------------------------------------
    
    get defaultValue(){
        return this.getProperty('defaultValue').value 
    }
    set defaultValue(value){
        this.setProperty('defaultValue', value)
    }

    get maxValue(){
        return this.getProperty('maxValue').value 
    }
    set maxValue(value){
        this.setProperty('maxValue', value)
    }

    get minValue(){
        return this.getProperty('minValue').value 
    }
    set minValue(value){
        this.setProperty('minValue', value)
    }

    get multipleValues(){
        return this.getProperty('multipleValues').value 
    }
    set multipleValues(value){
        this.setProperty('multipleValues', value)
    }

    get readonlyValue(){
        return this.getProperty('readonlyValue').value 
    }
    set readonlyValue(value){
        this.setProperty('readonlyValue', value)
    }

    get stepValue(){
        return this.getProperty('stepValue').value 
    }
    set stepValue(value){
        this.setProperty('stepValue', value)
    }

    get valueMaxLength(){
        return this.getProperty('valueMaxLength').value 
    }
    set valueMaxLength(value){
        this.setProperty('valueMaxLength', value)
    }


    get valueMinLength(){
        return this.getProperty('valueMinLength').value 
    }
    set valueMinLength(value){
        this.setProperty('valueMinLength', value)
    }

    get valueName(){
        return this.getProperty('valueName').value 
    }
    set valueName(value){
        this.setProperty('valueName', value)
    }

    get valuePattern(){
        return this.getProperty('valuePattern').value 
    }
    set valuePattern(value){
        this.setProperty('valuePattern', value)
    }

    get valueRequired(){
        return this.getProperty('valueRequired').value 
    }
    set valueRequired(value){
        this.setProperty('valueRequired', value)
    }

    get propertyID(){
        return this.getProperty('propertyID').value 
    }
    set propertyID(value){
        this.setProperty('propertyID', value)
    }
    
}