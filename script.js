import { KrThing } from "./kraken_thing/kraken_thing.js";
import { KrThings } from "./kraken_thing/kraken_thing.js";
import { KrListItem } from "./kraken_thing/kraken_thing.js";
import { KrPropertyValueSpecification } from "./kraken_thing/kraken_thing.js";

function test2() {
    console.log("ok1");

    let t = new KrThing();

    let t2 = new KrThings();
    console.log("ok");
    t2.register(test2);
}

function test3() {
   
    let things = new KrThings()


    let thing1 = new KrThing();
    thing1.setProperty('name', 'bob1s')
    var i = things.add(thing1, 'id1')

    
    let thing2 = new KrThing();
    thing2.setProperty('name', 'bob2s')
    var i = things.add(thing2, 'id2')


  
    let thing3 = new KrThing();
    thing3.setProperty('name', 'bob3s')
    var i = things.add(thing3, 'id3')



    console.log('pvs')
    let t = new KrPropertyValueSpecification();
    t.propertyID = 'name'
    t.setEndsWith('3s')

    console.log('tf')
    let thingsFiltered = things.filter([t])

    console.log(thingsFiltered.items.length)
    
}

test3();
