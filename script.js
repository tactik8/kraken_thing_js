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
    console.log(things.record)

    let newItem = {
         "@type": "person",
         "@id": "person_5",
         "givenName": "givenName_5",
         "familyName": "familyName_5",
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

    console.log('zz', things.getProperty('itemListElement'))
    let refItem = things.getProperty('itemListElement').values[1]
    

    console.log('ddd', refItem)
    
    things.insertAfter(refItem, newItem)

    console.log(things.getProperty('itemListElement').values)

    let items = things.getProperty('itemListElement').values
    for(let item of items){
        console.log(item.position, item.item.record_id)
    }
    
}

test1()