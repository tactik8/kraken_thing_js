import { KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){


    let element = document.getElementById('test1')


    let things = new KrThings()

    let records = []
    for(let i=0; i< 150; i++){
        records.push({
                        "@context": "https://schema.org/",
                        "@type": "Thing",
                        "@id": "thing1",
                        "name": "thing1"
                    }
                )
    }

    things.add(records)
    
    things.limit =20
    things.offset = 140
    things.orderBy = 'name'
    things.orderDirection = -1
    things.basePath = '/test0/test1/test2'

    things.params = {'a': 'aa', 'b': 'bb'}

    element.innerHTML = things.htmlTable()


    
    
}


test1()