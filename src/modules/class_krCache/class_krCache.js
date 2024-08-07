
import { KrThing } from '../class_KrThing.js'


export class KrCache {
    /**
     * Cache to store thing objects
     */
    constructor(maxTime=null) {
        
        this._db = {}
        this._maxTime = maxTime
    }

    
    get(record_type, record_id){
        // Get single thing object

        // Handle if provided a thing object instead of record_type
        if(record_type.record_type){
            record_id = record_type.record_id
            record_type = record_type.record_type
        }

        // Return undefined if missing info
        if(!record_type || record_type == null) { return undefined }
        if(!record_id || record_id == null) { return undefined }

        return this._db?.[record_type]?.[record_id]?.['item'] || undefined
        
    }

    get things(){
        // Retrieves all things from cache
        let things = []
        for(let record_type of Object.keys(this._db)){
            for(let record_id of Object.keys(this._db[record_type])){
                if(record_type && record_type != null){
                    if(record_id && record_id != null){
                        let thing = this.get(record_type, record_id)
                        things.push(thing)
                    }
                }
            }
        }
        return things
    }


    
    set(thing){

        // Handle if provided array
        if(Array.isArray(thing)){
            let results = thing.map(x => this.set(x))
            return results
        }

        // Handle if provided record instead of thing
        if(!thing.record_type && thing['@type']){
            thing = new KrThing(thing)
        }
        
        //
        let record_type = thing?.record_type || undefined
        let record_id = thing?.record_id || undefined

        // Return if missing info
        if(!record_type || record_type == null) { return undefined }
        if(!record_id || record_id == null) { return undefined }

        // Creates path in _db if doesn't exist
        this._db[record_type] = this._db[record_type] || {}
        this._db[record_type][record_id] = this._db[record_type][record_id] || {}

        // Merge with current item if exists (including callbacks)
        let currentElement = this._db[record_type][record_id]?.item
        if(currentElement && currentElement.record_type){
            currentElement.merge(thing)
        } else {
            this._db[record_type][record_id].item = thing
        }

        // Set date in cache
        this._db[record_type][record_id].date = Date()

        // Replace thing with thing from cache for all propertyValues 
        for(let p of thing._properties){
            for(let pv of p._propertyValues){
                if(pv.value.record_type){
                    if(pv.value != this.get(pv.value.record_type, pv.value.record_id)){
                        pv.value = this.set(pv.value)
                    }
                }
            }
        }

        // returns the thing in cache
        return this.get(record_type, record_id)
    }


    
    get length(){
        return this.things.length
    }


    remove(record_type, record_id){
        // Remoe individual thing
        if(this.get(record_type, record_id)){
            this._db[record_type][record_id] = {}
        }
    }
    
    clear(){
        // Removes all values form cache
        this._db = {}
    }
    
    // -----------------------------------------------------
    //  Shortcuts 
    // -----------------------------------------------------

    push(thing){
        return this.set(thing)
    }

    add(thing){
        return this.set(thing)
    }

    post(thing){
        return this.set(thing)
    }
    
    

}

