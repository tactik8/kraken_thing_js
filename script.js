import { KrCache, KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){


    let element = document.getElementById('test1')


   

    //element.innerHTML = things.html.table()


    let record1 = {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing1",
            "name": "thing1"
        }
    let record2 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        "name": "thing1",
        "test": "test1"
    }


    let t1 = new KrThing()
    t1.record = record1

   
    let t2 = new KrThing()
    t2.record = record2


    let cache = new KrCache()

    cache.add(t1)

    cache.add(t2)

    let t3 = cache.get(t1.record_type, t1.record_id)

    

    console.log(t3._properties.length)
    console.log(t3.record)


    
    
}


test1()