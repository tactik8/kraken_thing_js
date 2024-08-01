import { KrCache, KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){

    let date0 = new Date()
    let date0s = date0.toISOString()
    console.log('t0', date0s)
    let t = new KrThings()

    let t1 = new KrThing()
    t1.record = {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing1",
            "name": "thing1",
            "other": {
                    "@context": "https://schema.org/",
                    "@type": "Thing",
                    "@id": "thing2",
                    "name": "thing2",
                    "other": {
                        "@context": "https://schema.org/",
                        "@type": "Thing",
                        "@id": "thing3",
                        "name": "thing3",
                        "other": {
                            "@context": "https://schema.org/",
                            "@type": "Thing",
                            "@id": "thing4",
                            "name": "thing4"
                        }
                    }
                }


        
        }
    let date11 = new Date()
    let date11s = date11.toISOString()
    console.log('t11', date11s)
    let records = []

    for(let i =0; i < 100; i++){
        records.push(t1)
    }

    let date1 = new Date()
    let date1s = date1.toISOString()
    console.log('t1', date1s)
    t.add(records)
    let date2 = new Date()
    let date2s = date2.toISOString()
    console.log('t2', date2s)

    //console.log(JSON.stringify(t.record, null, 4))

    let content = t.getSystemRecord(2)
    let date3 = new Date()
    let date3s = date3.toISOString()
    console.log('t2', date3s)
    
    let tt = new KrThings()
    tt.setSystemRecord(content)
    let date4 = new Date()
    let date4s = date4.toISOString()
    console.log('t2', date4s, date4-date3)

    //console.log(JSON.stringify(tt.record, null, 4))
    
}


test1()