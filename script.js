import { KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){



    let a = new KrAction()

    a.name = 'bob'
    console.log(a.toString())
    console.log(a.startTime)
    console.log(a.actionStatus)
   

    console.log(a.textContent)
    
}


test1()