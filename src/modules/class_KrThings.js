
import { KrThing } from './class_KrThing.js';
import { KrListItem } from './class_KrListItem.js';


export class KrThings extends KrThing {
    /* Contains metadata to qualify a value

    attributes:
    
    - Items:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */


    constructor(record_type=null, record_id=null) {
        super(record_type, record_id);
        this.record_type = 'ItemList'

    }

    get items(){

        let results = [];
        let t = this.firstItem
        
        while(t && t != null){
            results.push(t)
            t = t.nextItem
        }
        
        return results
    }


    set items(values){

        values = ensureArray(values)

        // Sort values
        function compare(a, b) {
            if(a.position < b.position ){ return -1 };
            if(a.position > b.position ){ return 1 };
            return 0;
        };

        values.sort(compare);
        
        for(let value of values){
            this.add(value)
        }

        return
        
    }


    get record(){

        return super.record
    }
    
    set record(value){

         //super.record = value
        //return
        
        if(value.record_type){
            // Handle thing
            let properties = value.properties
            for(p in properties){
                if (p.propertyID != "itemListElement"){
                    this._properties.push(p)   
                }
            }
            this.items = value.getProperty('itemListElement')?.values
            
        } else {
            // Handle record
            for(let k of Object.keys(value)){
                if(k != "itemListElement"){
                    this.replaceProperty(k, null, value[k])
                }                
            }
            this.items = value?.itemListElement
        }
    }

    
    get itemRecords(){

        let items = this.getProperty('itemListElement').values

        let results = []

        for(let item of items){
            results.push(item.item.record); 
        }
        return results
    }
    
    get itemFullRecords(){

        let items = this.getProperty('itemListElement').values
        
        let results = []

        for(let item of items){
            results.push(item.item.fullRecord); 
        }   
        return results
    }

    get firstItem(){

        let items = this.getProperty('itemListElement').values
        
        if (items.length == 0){
            return null
        };

        for (let item of items){
            if(!item.previousItem || item.previousItem==null){
                return item
            }
        }
        
        return null;
        
    }
    
    get lastItem(){

        let items = this.getProperty('itemListElement').values
        
        if (items.length == 0){
            return null;
        };
        for (let item of items){
            if(item.nextItem === undefined || item.nextItem == null){
                return item
            }
        }
        return null;
        
    }
    
    add(listItem){

        if(Array.isArray(listItem)){
            for(let l of listItem){
                this.add(l)
            }
            return   
        }
        
        if(!(listItem instanceof KrListItem)){
            listItem = new KrListItem(listItem);
        };
        
        let lastItem = this.lastItem
        
        if (lastItem && lastItem != null){
            listItem.position = lastItem.position + 1
            listItem.previousItem = lastItem
            listItem.nextItem = null
            lastItem.nextItem = listItem
            
        } else {
            
            listItem.position = 0
            listItem.previousItem = null
            listItem.nextItem = null
            
        }

        // Add to list if not already in it.
        if (!this.get(listItem)){
            this.addProperty('itemListElement', listItem)
        }
        return listItem
    }

    reCalculatePosition(){

        return
        let t = this.firstItem;
        
        var position = 0;
        
        while(t && t != null){
            
            t.position = position;
            position = position + 1
            t = t.nextItem
           
        }
    }

    // -----------------------------------------------------
    //  CRUD for items 
    // -----------------------------------------------------

    
    remove(itemRef){

        var item = this.get(itemRef)
        if(!item){ 
            return null
        }

        var p = item.previousItem
        var n = item.nextItem

     
        // Ressign before and after links to one another
        if(p){ p.nextItem = n }
        if(n){ n.previousItem = p }

        // Remove from list
        this.deleteProperty('itemListElement', item)

        // Sets position
        item.position = null;

        // Sets position
        let position = 0
        if(n){ position = n.position - 1; n.position = position}
        
        let nextItem = n?.nextItem
        while(nextItem){
            nextItem.position = position + 1
            position = position + 1
            nextItem = nextItem.nextItem
        }
        
        //this.reCalculatePosition()

        // Remove links
        item.previousItem = null
        item.nextItem = null

       
        return
        
    }

    
    insertBefore(referenceItem, refItemtoInsert){

        let item 
        // Convert to ListItem if not one already
        if(!(refItemtoInsert instanceof KrListItem)){
            refItemtoInsert = new KrListItem(refItemtoInsert);
             item = refItemtoInsert
        } else {
             item = this.get(refItemtoInsert.ref)
        }

            
        // Retrieve latest ListItem record
  
        var n = this.get(referenceItem)
        var p = p.previousItem

        // Stop events
        this.blockEvents()
        if(item){ item.blockEvents() }
        if(p){ p.blockEvents() }
        if(n){ n.blockEvents() }
        
        // Remove previous links of items
        if((item.previousItem && item.previousItem != null) || (item.nextItem && item.nextItem != null)){
            this.remove(item.ref)
        }

        
        // Change allocation
        item.previousItem = p;
        item.nextItem = n;

        if(p){ p.nextItem = item;} else { p.nextItem = null };
        if(n){ n.previousItem = item; } else { n.previousItem = null};

        // Start events
        this.allowEvents()
        if(item){ item.allowEvents() }
        if(p){ p.allowEvents() }
        if(n){ n.allowEvents() }

        // Sets position
        let position = 0
        if(p){ position = p.position + 1}

        item.position = position
        let nextItem = item.nextItem
        while(nextItem){
            nextItem.position = position + 1
            position = position + 1
            nextItem = nextItem.nextItem
        }

        //  Add to list
        let t = this.get(refItemtoInsert.ref)
        if(!t || t== null){
            this.addProperty('itemListElement', refItemtoInsert)
        }
        
        return item
    }
    
    
    insertAfter(referenceItem, refItemtoInsert){
        /**
         * 
         */

       let item
        // Convert to ListItem if not one already
        if(!(refItemtoInsert instanceof KrListItem)){
            refItemtoInsert = new KrListItem(refItemtoInsert);
             item = refItemtoInsert
        } else {
             item = this.get(refItemtoInsert.ref)
        }


        // Stop events
        this.blockEvents()
        if(item){ item.blockEvents() }
        if(p){ p.blockEvents() }
        if(n){ n.blockEvents() }


        
        // Remove previous links of items
        if((item.previousItem && item.previousItem != null) || (item.nextItem && item.nextItem != null)){
            this.remove(item.ref)
        }
       

        var p = this.get(referenceItem)
        var n = p.nextItem
        
        // Change allocation
        item.previousItem = p;
        item.nextItem = n;

        if(p){ p.nextItem = item;} else { p.nextItem = null};
        if(n){ n.previousItem = item; } else { n.previousItem = null};


        // Start events
        this.allowEvents()
        if(item){ item.allowEvents() }
        if(p){ p.allowEvents() }
        if(n){ n.allowEvents() }
        
        // Change position
        let position = 0
        if(p){ position = p.position + 1}

        item.position = position
        let nextItem = item.nextItem
        while(nextItem){
            nextItem.position = position + 1
            position = position + 1
            nextItem = nextItem.nextItem
        }

        //  Add to list
        let t = this.get(refItemtoInsert.ref)
        if(!t || t== null){
            this.addProperty('itemListElement', refItemtoInsert)
        }

        
        return item
    }

    get(ref){

        if(!ref){ return null};
        
        if(ref && ref.ref){ ref = ref.ref};
        
        if (!ref || !ref['@type'] || ref['@type'] == null){ return null };

        if (ref['@type'] == 'ListItem'){
            return this.getByListItem(ref);
        } else {
            return this.getByItem(ref);
        };
        
    }

    getByListItem(ref){

        let items = this.getProperty('itemListElement').values

        for(let item of items){
            if(item.record_type == ref['@type'] && item.record_id == ref['@id']){
                return item
            }   
        }
        return null;
    }

    
    getByItem(ref){

        
        let items = this.getProperty('itemListElement').values
        for(let item of items){
            if(item.item.record_type == ref['@type'] && item.item.record_id == ref['@id']){
                return item
            }      
        }
        return null;
        
    }


    // -----------------------------------------------------
    //  Filters 
    // -----------------------------------------------------

    filter(propertyValueSpecifications){
        /**
         * Returns new Things with filtered items
         */


        let newThings = new KrThings()

        
        for(let item of this.items){
          
            let result = propertyValueSpecifications.map(pvs => pvs.test(item.item));
           
            if (result.every(Boolean) == true){
                newThings.add(item.item)
            }
        }

        return newThings
    }

    
    // -----------------------------------------------------
    //  HTML components 
    // -----------------------------------------------------

    
    // -----------------------------------------------------
    //  API 
    // -----------------------------------------------------

    
  
    
}



function ensureArray(value) {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}