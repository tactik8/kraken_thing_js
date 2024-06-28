import { KrThing } from "./src/index.js";
import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

import {KrDb} from './src/modules/class_krDb/class_krDb.js'

function test1(){

    let record_type = "Person"
    let record_id = "person_1"
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
                 "@id": "test_org_1",
                 "name": "test_org_1",
                 "url": "https://www.test.com"
                 }
         }

    
    let t
    let t2
    let db
    let cacheThing
    let result
    let testNumber = 0

    // Test 1
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    cacheThing = db._localCache.get(record_type, record_id)
    result = cacheThing == null
    console.log(testNumber, result)

    // Test 2 store in local cache
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    db.set(t)
    cacheThing = db._localCache.get(record_type, record_id)
    result = cacheThing.record_type == record_type
    console.log(testNumber, result)

    // Test 3 store in local cache
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    db.set(t)
    cacheThing = db._localCache.get("Organization", "test_org_1")
    result = cacheThing.name == "test_org_1"
    console.log(testNumber, result)
    
    // Test 4 store in local cache
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    db.set(t)
    cacheThing = db._localCache.get(record_type, record_id)
    result = JSON.stringify(cacheThing.record) == JSON.stringify(t.record)
    console.log(testNumber, result)
    
    
    // Test 5 post to api
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    t2 = new KrThing()
    t2.record = record
    t2.name = 'bob4'
    db.set(t)
    cacheThing = db._localCache.get(record_type, record_id)

    db.postToApi(t2).then(result => {
        db.getFromApi(t.record_type, t.record_id).then(t3 => {
            result = t3.name == t.name
            console.log(testNumber, result)
        })
    }
        
    )
   

    // Test 6 post to api
    testNumber = testNumber + 1
    db = new KrDb()
    t = new KrThing()
    t.record = record
    t2 = new KrThing()
    t2.record = record
    t2.name = 'bob4'
    db.set(t)

    for(let c of db.things){
        console.log('c', c.record_type)
    }
    
    cacheThing = db._localCache.get(record_type, record_id)

    db.postAll().then(result => {
        db.getFromApi("Organization", "test_org_1").then(t3 => {
            result = t3.name == "test_org_1"
            console.log(testNumber, result)
        })
    })
    
    
    
}

//test1()


async function test2(){


    let record = {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing1",
            "name": "thing1"
        }

    let t = new KrThing(record)

    let r1 = await t.api_post()

    let t2 = new KrThing("Thing", "thing1")

    let r2 = await t2.api_get()

    t2.printScreen()
    
}
async function test3(){


    let record = {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing2",
            "name": "thing2",
            "image": {
                    "@context": "https://schema.org/",
                    "@type": "ImageObject",
                    "@id": "image1",
                    "name": "image_1",
                    "contentUrl": "https://placehold.co/600x400"
                }
        }

    let t = new KrThing(record)

    let r1 = await t.api_post()

    
    console.log(JSON.stringify(t.bestRecord, null, 4))

    console.log(JSON.stringify(t.headings, null, 4))

}

function test4(){


    let record = {
        "@type": "ItemList",
        "@id": "Itemlist11",
        name: "Itemlist11",
        itemListElement: []//getSampleRecords(1)
    }

    let things = new KrThings()
    things.record = record
    //let things = new KrThings("ItemList", "Itemlist1")

    //console.log(things.record_id)
    //console.log('a', JSON.stringify(things.getSystemRecord(), null, 4))
    things.api_post()
}


test4()