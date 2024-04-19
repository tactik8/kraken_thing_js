
import { KrMetadata } from '../class_metadata/class_metadata.js';

export class KrPropertyValue {
    /*

    attributes:
    - proeprtyID:
    - value: 
    - c: 
    - d:

    */
    constructor(propertyID, value, actionType="replaceAction", previousValue) {

        this._record = {
            "@type": actionType,
            "@id": String(crypto.randomUUID()),
            "object": {
                "@type": "propertyValue",
                propertyID: propertyID,
                value: value,
            },
            actionStatus: 'completedActionStatus',
            replacee: previousValue,
            replacer: value
        };

        this.metadata = new KrMetadata();
    
        }

    // ----------------------------------------------------
    // Attributes - action
    // ----------------------------------------------------

    get record_type(){
        return this._record["@type"];
    }
    set record_type(value){
        this._record["@type"] = value;
    }
    get record_id(){
        return this._record["@id"];
    }
    set record_id(value){
        this._record["@id"] = value;
    }
    get object(){
        return this._record.object;
    }
    set object(value){
        this._record.object =value;
    }
    get replacer(){
        return this._record.replacer;
    }
    set replacer(value){
        this._record.object.value = ensureNotArray(value);
        this._record.replacer = ensureNotArray(value);
        }
    
    // ----------------------------------------------------
    // Attributes - object
    // ----------------------------------------------------
    
    get propertyID(){
        return this._record.object.propertyID;
    }
    set propertyID(value){
        this._record.object.object.propertyID = value;
    }
    get value(){
        return this._record.object.value;
    }
    set value(value){
        this._record.object.value = ensureNotArray(value);
        this._record.replacer = ensureNotArray(value);
        }

    // ----------------------------------------------------
    // Attributes - metadata
    // ----------------------------------------------------

    get t(){
        return this._record.t;
    }
    set t(value){
         this._record.t = value;
    }
    get value(){
        return this._record.object.value;
    }
    set value(value){
        this._record.object.value = ensureNotArray(value);
        this._record.replacer = ensureNotArray(value);
        }
    get agent(){
        return this.metadata.agent;
    }
    set agent(value){
        this.metadata.agent = value;
    }
    get instrument(){
        return this.metadata.instrument;
    }
    set instrument(value){
        this.metadata.instrument = value;
    }
    get credibility(){
        this.metadata.credibility;
    }
    set credibility(value){
        this.metadata.credibility = value;
    }
    get observationDate(){
        return this.metadata.observationDate;
    }
    set observationDate(value){
        this.metadata.observationDate = value;
    }
    get c(){
        return this.metadata.credibility;
    }
    set c(value){
        this.metadata.credibility = value;
    }
    get d(){
        return this.metadata.observationDate;
    }
    set d(value){
        this.metadata.observationDate = value;
    }

    // ----------------------------------------------------
    // Records 
    // ----------------------------------------------------
    
    getFullRecord(depth=0){
        if (this.value && this.value.constructor.name == 'KrThing' ){ 
            return this.value.getFullRecord(depth);
        };
        return this.value;
    }

    getRefRecord(depth=0){

        let record = JSON.parse(JSON.stringify(this._record));
        record.metadata = this.metadata.getRefRecord(depth);

        if (this.value && this.value.record_type){
            record['value'] = this.value.ref;
        };
        return record;        
    }

    getBestRecord(depth=0){

        let value = this.value;
        if (this.value && this.value.record_type){
            value = this.value.getBestRecord(depth);
        };
        return value;        
    }


    // ----------------------------------------------------
    // Raw records 
    // ----------------------------------------------------

    getSystemRecord(depth=0){

        let record = JSON.parse(JSON.stringify(this._record));
        record.metadata = this.metadata.getSystemRecord();
        if (this.value && this.value.record_type){
            record['value'] = this.value.getSystemRecord(depth);
        };
        return record;        
    }

    setSystemRecord(value){

        this.metadata.setSystemRecord(value.metadata);
        delete value.metadata;
        this._record = JSON.parse(JSON.stringify(value));
        this._record = value;
    }

    
    // ----------------------------------------------------
    // Methods 
    // ----------------------------------------------------

    setValue(value, metadataRecord){
        this.value = value;
        this.metadata.inheritMetadata(metadataRecord);
    }

    equal(other){
        return this.eq(other);
    }
    
    eq(other){
        // returns true if equal
        if (this.value == other.value){
            return true
        };
        return false;
    }
    
    gt(other){
        return this.metadata.gt(other.metadata);
    };
    
    lt(other){
        return this.metadata.lt(other.metadata);
    };

    printScreen(suffix = ''){

        var v = this.value;
        if (this.value && this.value.record_type) {
            v = this.value.record_type + "/" + this.value.record_id;
        };
        var t_string = this.record_type.replace('Action', '').padEnd(10);
        var c_string = String(this.metadata.c || 0).padStart(5);
        var p_string = String(this.metadata.position).padStart(5);
        
        
        console.log(suffix, " - ", c_string, p_string, t_string, v);
        
    }
};

