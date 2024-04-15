import { KrProperty } from "../class_property/class_property.js";

import { KrMetadata } from "../class_metadata/class_metadata.js";
//import { KrListItem } from "../../../kraken_thing.js";

let MAX_DEPTH = 6;


export class KrThing {
    /*

    attributes:
    - record_type:
    - record_id: 
    - record: 
    - ref:            returns dict with @type and @id
    - fullRecord:     returns native records from class objects (nested)
    - properties:     returns list of KrProperties
    - json:           returns this.record as json

    Methods
    - getProperty: 
    - setProperty:
    - get (same as getProperty):
    - set (same as setProperty):

    */

    constructor(record_type = null, record_id = null) {
        this._properties = [];

        this._callbacks=[];
        // metadata
        this.metadata = new KrMetadata();

        // if record_type is a dict, treat as record instead
        if (record_type && record_type["@type"]) this.setFullRecord(record_type);

        //
        if (record_type && !(record_type["@type"])) {
            this.setProperty("@type", record_type);
        }
        if (record_id) {
            this.setProperty("@id", record_id);
        }

        if (!this.record_id) {
            record_id = String(crypto.randomUUID());
        }
    }




    // ----------------------------------------------------
    // Events
    // ----------------------------------------------------


    register(callback){
        this._callbacks.push(callback);
    }

    dispatchEvent(event){

        for(let c of this._callbacks){
            c(event);
        }
    }
    
    
    // ----------------------------------------------------
    // Attributes
    // ----------------------------------------------------

    get record_type() {
        return this.getProperty("@type").value;
    }
    set record_type(value) {
        if (!value) {
            return;
        }
        return this.setProperty("@type", value);
    }
    get record_id() {
        return this.getProperty("@id").value;
    }
    set record_id(value) {
        if (!value) {
            return;
        }
        return this.setProperty("@id", value);
    }
    get ref() {
        return { "@type": this.record_type, "@id": this.record_id };
    }

    get properties() {
        /**
         * Returns list of KrProperty object in alphabetical order
         */

        //function compare(a, b) { return a.lt(b) }
        //return this._properties.toSorted(compare);
        return this._properties.toSorted((a, b) => {
            return a.lt(b);
        });
    }

    // ----------------------------------------------------
    // Records
    // ----------------------------------------------------

    get record() {
        return this.getFullRecord(0);
    }
    set record(value) {
        this.setFullRecord(value);
    }
    get fullRecord() {
        return this.getFullRecord(0);
    }
    set fullRecord(value) {
        this.setFullRecord(value);
    }
    get bestRecord() {
        return this.getBestRecord(0);
    }
    set bestRecord(value) {
        this.setBestRecord(value);
    }
    get refRecord() {
        return this.getRefRecord(0);
    }
    set refRecord(value) {
        this.setRefRecord(value);
    }
    
    
    getFullRecord(depth=0) {

        if(depth && depth > MAX_DEPTH){  return this.ref};
        
        let record = {};
        let properties = this.properties;
        for (let i = 0; i < properties.length; i++) {
            record[properties[i].propertyID] = properties[i].getFullRecord(depth ++);
        }
        record["@type"] = this.record_type;
        record["@id"] = this.record_id;
        return record;
    }

    setFullRecord(value) {
        this._properties = [];
        Object.keys(value).forEach((key) => {
            this.addProperty(key, value[key]);
        });
    }

    getRefRecord(depth=0) {
        let record = {};

        for (let i = 0; i < this.properties.length; i++) {
            record[this.properties[i].propertyID] =
                this.properties[i].getRefRecord(depth);
        }
        record["@type"] = this.record_type;
        record["@id"] = this.record_id;
        return record;
    }

    getBestRecord(depth=0) {
        if(depth > MAX_DEPTH){ return this.ref};
        
        let record = {};

        for (let i = 0; i < this.properties.length; i++) {
            record[this.properties[i].propertyID] =
                this.properties[i].getBestRecord(depth ++);
        }
        record["@type"] = this.record_type;
        record["@id"] = this.record_id;
        return record;
    }

    // ----------------------------------------------------
    // System records
    // ----------------------------------------------------

    get systemRecord() {
        return this.getSystemRecord(0);
    }
    set systemRecord(value) {
        this.setSystemRecord(value);
    }
    get rawRecord() {
        return this.getSystemRecord(0);
    }
    set rawRecord(value) {
        this.setSystemRecord(value);
    }
    
    getSystemRecord(depth) {

        if(depth > MAX_DEPTH){ return this.ref};

        
        let record = {};

        for (let i = 0; i < this.properties.length; i++) {
            record.properties[this.properties[i].propertyID] =
                this.properties[i].getSystemRecord(depth);
        }
        record["@type"] = this.record_type;
        record["@id"] = this.record_id;
        return record;
    }

    setSystemRecord(value) {
        // Load data into object

        if (!value || !value.properties) {
            return;
        }

        // Reset current properties
        this._properties = [];

        // convert sub things to KrThing
        var keys = Object.keys(value.properties);
        for (let i = 0; i < keys.length; i++) {
            var properties = value.properties[keys[i]];
            for (let t = 0; t < properties.length; t++) {
                var propertyValue = properties[t];
                if (propertyValue.value && propertyValue.value["@type"]) {
                    var thing = this.new(
                        propertyValue.value["@type"],
                        propertyValue.value["@id"],
                    );
                    thing.fullRecord = propertyValue.value;
                    propertyValue.value = thing;
                }
            }
        }

        // load data
        var keys = Object.keys(value.properties);
        for (let i = 0; i < keys.length; i++) {
            var property = new KrProperty(keys[i]);
            property.setSystemRecord(value.properties[keys[i]]);
            this._properties.push(property);
        }
    }

    // ----------------------------------------------------
    // Methods
    // ----------------------------------------------------

    getProperty(propertyID) {
        /**
         * Returns property of
         */
        // Returns property of
        for (let i = 0; i < this._properties.length; i++) {
            if (this._properties[i].propertyID == propertyID) {
                return this._properties[i];
            }
        }

        // create new property if missing
        var property = new KrProperty(propertyID);
        this._properties.push(property);
        return property;
    }

    addProperty(propertyID, value, credibility, observationDate) {
        return this._updateProperty(
            propertyID,
            value,
            credibility,
            observationDate,
            "addAction",
        );
    }

    deleteProperty(propertyID, value, credibility, observationDate) {
        return this._updateProperty(
            propertyID,
            value,
            credibility,
            observationDate,
            "deleteAction",
        );
    }

    replaceProperty(
        propertyID,
        previousValue,
        newValue,
        credibility,
        observationDate,
    ) {
        return this._updateProperty(
            propertyID,
            newValue,
            credibility,
            observationDate,
            "replaceAction",
            previousValue,
        );
    }

    setProperty(propertyID, value, credibility, observationDate) {
        return this.replaceProperty(
            propertyID,
            null, 
            value,
            credibility,
            observationDate,
        );
    }

    _updateProperty(
        propertyID,
        value,
        credibility,
        observationDate,
        actionType,
        previousValue
    ) {

        // Get olf value
        let oldValue = this.getProperty(propertyID)?.value;
       
        // get or create property object
        let property = this.getProperty(propertyID);
        if (!property) {
            property = new KrProperty(propertyID);
            this._properties.push(property);
        }

        // Iterate through values and convert to KrThing if required
        let values = ensureArray(value);
        for (let i = 0; i < values.length; i++) {
            if (values[i] && values[i]["@type"]) {
                values[i] = this.new(values[i]);
            }
        }

        // Set metadata
        var metadataRecord = this.metadata.record;
        if (credibility) {
            metadataRecord.credibility = credibility;
        }
        if (observationDate) {
            metadataRecord.observationDate = observationDate;
        }

        // set property value
        var newValues = property.setValues(
            values,
            metadataRecord,
            actionType,
            previousValue,
        );

        // dispatch event
        let event = {'type': change, 'propertyID': propertyID, 'oldValue': oldValue, 'newValue': value};
        this.dispatchEvent(event);
        
        return newValues;
    }

    get(propertyID) {
        return this.getProperty(propertyID);
    }
    set(propertyID, value) {
        return this.setProperty(propertyID, value);
    }

    new(record_type, record_id) {
        return new KrThing(record_type, record_id);
    }



    // ----------------------------------------------------
    // Dot notation
    // ----------------------------------------------------


    dotGet(path){        
        
    }

    dotSet(path, value){

    }
    
    
    // ----------------------------------------------------
    // Comparisons
    // ----------------------------------------------------

    lt(other) {
        if (this.record_type < other.record_type) {
            return true;
        }
        if (this.record_type > other.record_type) {
            return false;
        }

        if (this.record_id < other.record_id) {
            return true;
        }
        if (this.record_id > other.record_id) {
            return false;
        }

        return false;
    }

    gt(other) {
        if (this.record_type > other.record_type) {
            return true;
        }
        if (this.record_type < other.record_type) {
            return false;
        }

        if (this.record_id > other.record_id) {
            return true;
        }
        if (this.record_id < other.record_id) {
            return false;
        }
        return false;
    }

    eq(other) {
        if (this.record_type != other.record_type) {
            return false;
        }
        if (this.record_id != other.record_id) {
            return false;
        }

        return true;
    }
    
    printScreen() {
        console.log("----------------------------------");
        console.log(this.properties.length);
        console.log("thing:", this.record_type, this.record_id);
        this.properties.map((property) => {

            property.printScreen('    ');

        });
    }
}

function ensureNotArray(value) {
    let new_value = ensureArray(value);
    if (new_value.length > 0) {
        return new_value[0];
    } else {
        return null;
    }
}

function ensureArray(value) {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}
