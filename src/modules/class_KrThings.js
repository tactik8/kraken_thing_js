
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


    constructor(record_id = null) {
        super('ItemList', record_id);

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

    get itemRecords(){

        let items = this.getProperty('listItemElement').values

        let results = []

        for(let item of items){
            results.push(item.item.record); 
        }
        return results
    }
    
    get itemFullRecords(){

        let items = this.getProperty('listItemElement').values
        
        let results = []

        for(let item of items){
            results.push(item.item.fullRecord); 
        }   
        return results
    }

    get firstItem(){

        let items = this.getProperty('listItemElement').values
        
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

        let items = this.getProperty('listItemElement').values
        
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
    
    add(listItem, itemId){

        if(Array.isArray(listItem)){
            for(let l of listItem){
                this.add(l)
            }
            return   
        }
        
        if(!(listItem instanceof KrListItem)){
            listItem = new KrListItem(listItem, itemId);
        };
        
        let lastItem = this.lastItem
        
        if (lastItem){
            listItem.position = lastItem.position + 1
            listItem.previousItem = lastItem
            lastItem.nextItem = listItem
            
        } else {
            listItem.position = 0
        }

        // Add to list if not already in it.
        if (!this.get(listItem)){
            this.addProperty('listItemElement', listItem)
        }
        return listItem
    }

    reCalculatePosition(){

        let t = this.firstItem;
        var position = 0;
        
        while(t){
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

        console.log('item', p, n)
     
        // Ressign before and after links to one another
        if(p){ p.nextItem = n }
        if(n){ n.previousItem = p }

        // Remove from list
        this.deleteProperty('listItemElement', item)

        // Sets position
        item.position = null;
        this.reCalculatePosition()

        // Remove links
        item.previousItem = null
        item.nextItem = null

        
       
        return
        
    }

    
    insertBefore(ref, itemRef){

        var p = null
        var item = this.get(itemRef)
        if(!item){ return null}
        
        var n = this.get(ref)
        
        if(n){
            var p = n.previousItem
        }
        
        item.previousItem = p
        item.nextItem = n

        if(p){ p.nextItem = item }
        if(n){ n.previousItem = item }

        // Sets position
        this.reCalculatePosition();
        
        // Add to list if not already in it.
        if (!this.get(item.ref)){
            this.addProperty('listItemElement', item)
        }
        
        return
    }
    
    
    insertAfter(ref, itemRef){

        // Retrieve all elements

        var item = this.get(itemRef)
        var p = item.previousItem
        var n = null;
        
        if(p){
            n = p.nextItem
        }
        
        // Change allocation
        item.previousItem = p;
        item.nextItem = n;

        if(p){ p.nextItem = item;};
        if(n){ n.previousItem = item; };

        // Sets position
        this.reCalculatePosition();
        
        // Add to list if not already in it.
        if (!this.get(item.ref)){
            this.addProperty('listItemElement', item)
        };
        return; 
    }

    get(ref){

        if(!ref){ return null};
        
        if(ref && ref.ref){ ref = ref.ref};
        
        if (!ref || !ref['@type']){ return null};

        if (ref['@type'] == 'listItem'){
            return this.getByListItem(ref);
        } else {
            return this.getByItem(ref);
        };
        
    }

    getByListItem(ref){

        let items = this.getProperty('listItemElement').values

        for(let item of items){

            if(item.record_type == ref['@type'] && item.record_id == ref['@id']){
                return item
            }   
        }
        return null;
    }

    
    getByItem(ref){

        let items = this.getProperty('listItemElement').values

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

    

  
    
}