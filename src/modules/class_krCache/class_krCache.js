


export class KrCache {
    /**
     * Cache to store things
     */


    constructor(maxTime=null) {
        
        this._db = {}
        this._maxTime = maxTime
    }

    get(record_type, record_id){

        if(!record_type || record_type == null) { return null }
        if(!record_id || record_id == null) { return null }

        return this._db?.[record_type]?.[record_id]?.['item'] || null
        
    }

    add(thing){
        return this.set(thing)
    }
    
    set(thing){

        let record_type = thing.record_type
        let record_id = thing.record_id
        
        if(!record_type || record_type == null) { return null }
        if(!record_id || record_id == null) { return null }

        this._db[record_type] = this._db[record_type] || {}
        this._db[record_type][record_id] = this._db[record_type][record_id] || {}

        // Merge with current item if exists
        let currentElement = this._db[record_type][record_id]?.item
        if(currentElement && currentElement.record_type){
            currentElement.merge(thing)
        } else {
            this._db[record_type][record_id].item = thing
        }
        this._db[record_type][record_id].date = Date()
    }


    post(thing){
        return this.set(thing)
    }
    
    get things(){

        let things = []
        for(let record_type of Object.keys(this._db)){

            for(let record_id of Object.keys(this._db[record_type])){
                let thing = this.get(record_type, record_id)
                things.push(thing)
            }
        }
        return things
    }

}

