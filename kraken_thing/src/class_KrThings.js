




import { KrThing } from './class_KrThing.js';
import { KrakenDataApiClient } from "../kraken_data_api_client/kraken_data_api_client.js";

import { kraken_bootstrap } from 'https://tactik8.github.io/krakenJsBootstrap/kraken_bootstrap/kraken_bootstrap.js'





export class KrListItem extends KrThing {
    /* Contains metadata to qualify a value

    attributes:

    - Items:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */


    constructor(item, record_id) {
        super('ListItem', record_id);
        this.item = item;
        if(!record_id){this.setProperty('@id', String(crypto.randomUUID()))}
    }


    get item(){
        if(this.getProperty('item')){
            return this.getProperty('item').value;
        };
        return null;
    }
    set item(value){
        this.setProperty('item', value);
    }

    get previousItem(){
        if(this.getProperty('previousItem')){
            return this.getProperty('previousItem')?.value || null;
        };
        return null;
    }
    set previousItem(value){
        //if(value && value.ref){ value = value.ref};
        this.setProperty('previousItem', value);
    }
    get nextItem(){
        if(this.getProperty('nextItem')){
            return this.getProperty('nextItem')?.value || null;
        };
        return null;
       
    }
    set nextItem(value){

        //if(value && value.ref){ value = value.ref};
        this.setProperty('nextItem', value);
    }

    get position(){
        if(this.getProperty('position')){
            return this.getProperty('position')?.value || null;
        };
        return null;
    }
    set position(value){
        this.setProperty('position', value);
    }
  
}



export class KrThings extends KrThing {
    /* Contains metadata to qualify a value

    attributes:
    
    - Items:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */


    constructor(record_type = null, record_id = null) {
        super('ItemList', record_id);

        this._items = [];
    }

    get items(){

        let results = [];
        let t = this.firstItem;
        
        while(t){
            results.push(t);
            t = this.get(t.nextItem);
        };
        return results;
    }

    get itemRecords(){
        let results = [];
        for(let i=0; i< items.length; i++){
            results.push(this.items[i].item.record);
        };
        return results;
    };
    
    get itemFullRecords(){
        let results = [];
        for(let i=0; i< items.length; i++){
            results.push(this.items[i].item.fullRecord);
        };
        return results;
    };

    get firstItem(){

        if (this._items.length == 0){
            return null;
        };

        for (let item of this._items){
            if(!item.previousItem || item.previousItem==null){
                return item
            }
        }
        
        return null;
        
    }
    
    get lastItem(){
        if (this._items.length == 0){
            return null;
        };
        for (let item of this._items){
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
        listItem.position = this._items.length;

        let lastItem = this.get(this.lastItem);
        
        
        if (lastItem){
            listItem.position = lastItem.position + 1;
            listItem.previousItem = lastItem;
            lastItem.nextItem = listItem;
            
        } else {
            listItem.position = 0;
        }

        // Add to list if not already in it.
        if (!this.get(listItem)){
            this._items.push(listItem);
        };

        return listItem;
        
    }

    reCalculatePosition(){

        let t = this.firstItem;
        var position = 0;
        
        while(t){
            t.position = position;
            position = position + 1
            t = this.get(t.nextItem);
        }
    }

    // -----------------------------------------------------
    //  CRUD for items 
    // -----------------------------------------------------

    
    remove(itemRef){

        var item = this.get(itemRef);
        
        if(!item){ 
            return null;
        };

        var p = this.get(item.previousItem);
        var n = this.get(item.nextItem);

     
        // Ressign before and after links to one another
        if(p){ p.nextItem = n;};
        if(n){ n.previousItem = p; };

        // Sets position
        item.position = null;
        this.reCalculatePosition();

        // Remove links
        item.previousItem = null;
        item.nextItem = null;

        // Remove from list
        for (let i=0; i< this._items.length; i++){
            if (this._items[i].ref == item.ref){
                this._items.splice(i, 1);
            };
        };

        return; 
        
    }


   
    
    insertBefore(ref, itemRef){

        var p = null;
        var item = this.get(itemRef);
        if(!item){ return null};
        
        var n = this.get(ref);
        
        if(n){
            var p = this.get(n.previousItem);
        }
        
        item.previousItem = p;
        item.nextItem = n;

        if(p){ p.nextItem = item;};
        if(n){ n.previousItem = item; };

        // Sets position
        this.reCalculatePosition();
        
        // Add to list if not already in it.
        if (!this.get(item.ref)){
            this._items.push(item);
        };
        
        return; 
    }
    
    
    insertAfter(ref, itemRef){

        // Retrieve all elements

        var item = this.get(itemRef)
        var p = this.get(item.previousItem);
        var n = null;
        
        if(p){
            n = this.get(p.nextItem);
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
            this._items.push(item);
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

        
        for (let i=0; i< this._items.length; i++){

            if(this._items[i].record_type == ref['@type'] && this._items[i].record_id == ref['@id']){
                return this._items[i];
            }
        };
        return null;
    }

    
    getByItem(ref){

        
        for (let i=0; i< this._items.length; i++){

            if(this._items[i].item.record_type == ref['@type'] && this._items[i].item.record_id == ref['@id']){
                return this._items[i];
            }
        };
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

    

    html_cardGrid(parentElement){


        var cards = [];
        for (let i=0; i< this.items.length; i++){

            cards.push(this.items[i].html_cardVertical());
        };
        
        var cardGrid = kraken_bootstrap.library.main.cardGrid(cards);

      
        if (parentElement){
          
            parentElement.appendChild(cardGrid);
        };
        
        return cardGrid;
        
    }
    
}