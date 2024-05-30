
import { KrThing } from './class_KrThing.js';


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
        this.setProperty('item', item);
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

