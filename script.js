import { KrCache, KrThing } from "./src/index.js";
import { KrAction } from "./src/index.js";

import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";


import { krakenHelpers as k } from 'krakenhelper'

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){


    let t= new KrThing()
    let record = {
             "@type": "Person",
             "@id": "person_1",
             "givenName": "givenName_1",
             "familyName": "familyName_1",
             "email": "test@test.com",
             "telephone": "1-514-111-2222",
             "hasOccupation": {
                 "@type": "Occupation",
                 "@id": "occupation_1",
                 "name": "occupation_1"
                 },
             "worksfor": {
                 "@type": "Organization",
                 "@id": "organization_1",
                 "name": "test_org_1",
                 "url": "https://www.test.com"
                 }
         }

    t.record = record

    let p = t.getProperty('email')

    console.log(JSON.stringify(t, null, 4))





    
    
}


test1()