
import { KrThing } from './kraken_thing/kraken_thing.js'
import { KrThings } from './kraken_thing/kraken_thing.js'
import { KrListItem } from './kraken_thing/kraken_thing.js'



function test2(){

    console.log('ok1')

    let t = new KrThing();

    let t2 = new KrThings();
    console.log('ok')
    t2.register(test2)
    
}


test2();