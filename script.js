import { KrThing } from "./src/index.js";
import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){


    let record = {
             "@type": "Person",
             "@id": "person_1",
             "givenName": "givenName_1",
             "familyName": "familyName_1",
             "email": "test@test.com",
             "telephone": "1-514-111-2222",
             "hasOccupation": {
                 "@type": "Occupation",
                 "name": "occupation_1"
                 },
             "worksfor": {
                 "@type": "organization",
                 "name": "test_org_1",
                 "url": "https://www.test.com"
                 }
         }

    let t = new KrThing()
    t.record = record

    let db = new KrDb()

    db.postToApi(t).then(result => {

        db.getFromApi('Person', 'person_1').then(t2 => {
            console.log(t2.record)
            
        })
        
        
    })

    
    
}

test1()