import { KrThing } from "./kraken_thing/kraken_thing.js";
import { KrThings } from "./kraken_thing/kraken_thing.js";
import { KrListItem } from "./kraken_thing/kraken_thing.js";
import { KrPropertyValueSpecification } from "./kraken_thing/kraken_thing.js";





function test1(){

    var t = new KrThings();


    let k1 = new KrThing('Thing', 'id1');
    let k2 = new KrThing('Thing', 'id2');
    let k3 = new KrThing('Thing', 'id3');
    let k4 = new KrThing('Thing', 'id4');

    var i1 = t.add(k1, 'id1');
    var i2 = t.add(k2, 'id2');
    var i3 = t.add(k3, 'id3');
    var i4 = t.add(k4, 'id4');

    var last = t.lastItem;

    console.log('pos', last.position)
    
}

test1()