import { KrCache, KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";


import { krakenHelpers as k } from 'krakenhelper'

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){


    let cache = new KrCache();

    let record = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1",
        other: {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing2",
            name: "thing2",
        },
        other2: [
            {
                "@context": "https://schema.org/",
                "@type": "Thing",
                "@id": "thing3",
                name: "thing3",
            },
            {
                "@context": "https://schema.org/",
                "@type": "Thing",
                "@id": "thing4",
                name: "thing4",
            },
        ],
    };

    var t = new KrThing(record);

    cache.set(t);

    let t1 = cache.get("Thing", "thing1");
    console.log(t1.name)
    //expect(t1.name).toStrictEqual("thing1");

    let t2 = cache.get("Thing", "thing2");
    //expect(t2.name).toStrictEqual("thing2");
    console.log(t2.name)

    let t3 = cache.get("Thing", "thing3");
    //expect(t2.name).toStrictEqual("thing3");
    console.log(t3.name)

    let t4 = cache.get("Thing", "thing4");
    //expect(t2.name).toStrictEqual("thing4");
    console.log(t4.name)
    
}


test1()