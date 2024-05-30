import { KrThing } from "./src/index.js"
import { KrThings } from "./src/index.js"
import { KrListItem } from "./src/index.js"
import { KrPropertyValueSpecification } from "./src/index.js"






function test1(){


    let record = {
        "@type": "ItemList",
        "@id": "Itemlist1",
        name: "Itemlist1",
        itemListElement: [
            {
                 "@type": "person",
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
             },
            {
                 "@type": "person",
                 "@id": "person_2",
                 "givenName": "givenName_2",
                 "familyName": "familyName_2",
                 "email": "test@test.com",
                 "telephone": "1-514-111-2222",
                 "hasOccupation": {
                     "@type": "Occupation",
                     "name": "occupation_2"
                     },
                 "worksfor": {
                     "@type": "organization",
                     "name": "test_org_2",
                     "url": "https://www.test.com"
                     }
             }
            
            
        ]
    }

    let things = new KrThings()
    things.record = record

    console.log(things.getFullRecord())
    console.log('a', JSON.stringify(things.record, null, 4))



    let thing = new KrThing()
    thing.record = record
    //console.log(JSON.stringify(thing.record, null, 4))


    let ii = new KrThing()
    ii.record = {
             "@type": "person",
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
    

    let i = new KrListItem(ii)
    console.log(i.record)
    
}

//test1()