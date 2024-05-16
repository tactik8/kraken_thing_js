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

function test4(){


    let thing = new KrThing('Person', 'abc2')
    thing.setProperty('name', 'bob')

    console.log('bb')
    console.log('cc', thing.getSystemRecord())
    console.log('dd')
    
    thing.api_post()

    let t = new KrThing('Person', 'abc2')
    t.api_get().then(result => console.log('aa', t.getSystemRecord())

        
    )
    console.log('a', t.getSystemRecord())
    
}

//test4();




function test12() {


    // Generate list portion
    let record = {
        "@type": "ItemList",
        "@id": "ItemListTest13",
        "name": "ItemListTest13",
        "itemListElement": {
            "@type": "Thing",
            "@id": "abc123",
            "name": "test"
        }

    }

    let things = new KrThings("ItemList", "ItemListTest13")
    things.record = record

    things.api_post().then(result => {

        let things2 = new KrThings("ItemList", "ItemListTest13")
        things2.api_get().then( result =>

            console.log('vv', things2.record)
        )
    }
    )
    return

}

test12()