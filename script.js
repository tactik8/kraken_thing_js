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


    let record = [
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "803f7511-cd02-42fd-b29b-8c0c60023422",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "5cf4af10-6498-4840-9915-1d3dc777ddb0",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "idChild2_9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "1f7bf7f3-dd3d-4a20-bebe-72dbaacc6bcf",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "childName2"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "859345fe-cde5-4c5c-b96a-d9fb39ea9d3d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "4511bf2c-627f-4412-ae04-504c97978216",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "2edbc396-0cf9-477b-9044-676c9ff14efd",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "23fe9850-03b9-4a1a-9af9-896196a9990e",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "idChild2_9",
                "name": "childName2",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                }
            },
            "@type": "Thing",
            "@id": "idChild2_9"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "f70713c0-e643-4030-ac56-b3f90e8ad051",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "a0fb0b6f-717b-4201-bce7-aae920d85757",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "4303407c-c5d3-4b14-ac0c-0759b1363cd4",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "b2d2d77c-153b-449a-a68d-a8fe8cf8eed2"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "b2d2d77c-153b-449a-a68d-a8fe8cf8eed2"
            },
            "@type": "imageObject",
            "@id": "b2d2d77c-153b-449a-a68d-a8fe8cf8eed2"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "b8e0f50f-af7a-493f-aa44-4cc151e98cc5",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "ad9f7d3e-f943-48db-960a-945a5d047724",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "idChild2_8"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "64f8ada5-c9ca-40d3-b185-f0e5ccb94b1e",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "childName2"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "80567cd6-df20-484e-a3a1-88fa5d55251a",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "582889bf-690f-489b-9394-b9d688a5d35a",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "7a91f06b-ef5d-41a2-9a81-522dc5c07c01",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "1f86e576-1d36-44b1-aeae-b1dbe247502c",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "idChild2_8",
                "name": "childName2",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                }
            },
            "@type": "Thing",
            "@id": "idChild2_8"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "70ad49ce-01d3-4d68-8ddf-fb8d30c7517d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "ListItem"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "1d0191a2-d6b0-49b2-98c5-60832f72a133",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "ab326121-6908-429a-8522-c9fc91d87e9e"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "item": [
                    {
                        "@type": "replaceAction",
                        "@id": "97ba380d-c204-4330-9709-8d300c676bdc",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "item",
                            "value": {
                                "@type": "Thing",
                                "@id": "id_8"
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "position": [
                    {
                        "@type": "replaceAction",
                        "@id": "afa36061-70ca-4db9-8d7c-8ce220e489c1",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "position",
                            "value": 8
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "previousItem": [
                    {
                        "@type": "ListItem",
                        "@id": "92c61b83-a5e7-40c0-ba6c-efd6d7bcaa30"
                    }
                ],
                "nextItem": [
                    null,
                    {
                        "@type": "ListItem",
                        "@id": "726ea801-1836-4c18-b064-8a5d8df1182d"
                    }
                ]
            },
            "summary": {
                "@type": "ListItem",
                "@id": "ab326121-6908-429a-8522-c9fc91d87e9e",
                "item": {
                    "@type": "Thing",
                    "@id": "id_8",
                    "name": "name_8",
                    "url": "https://www.url.com/8",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "95c8c63a-7242-4194-b559-0aacf078ab73"
                    },
                    "parent": {
                        "@type": "Thing",
                        "@id": "idParent1_8",
                        "name": "parentName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "78a0d329-2bfc-41af-8eec-b0a26b8d6242"
                        }
                    },
                    "children": [
                        {
                            "@type": "Thing",
                            "@id": "idChild2_8",
                            "name": "childName2",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "7525817b-bd64-43cd-ac7c-108208de8924"
                            }
                        },
                        {
                            "@type": "Thing",
                            "@id": "idChild1_8",
                            "name": "childName1",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "d1f75617-29c0-495b-a37b-e728bc698843"
                            }
                        }
                    ]
                },
                "position": 8,
                "previousItem": {
                    "@type": "ListItem",
                    "@id": "92c61b83-a5e7-40c0-ba6c-efd6d7bcaa30"
                },
                "nextItem": {
                    "@type": "ListItem",
                    "@id": "726ea801-1836-4c18-b064-8a5d8df1182d"
                }
            },
            "@type": "ListItem",
            "@id": "ab326121-6908-429a-8522-c9fc91d87e9e"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "82b0d2c8-b687-4cc8-923c-9cc974351ab7",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "ListItem"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "d501f57e-7aff-4427-97f8-060c8fa6ee8d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "92c61b83-a5e7-40c0-ba6c-efd6d7bcaa30"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "item": [
                    {
                        "@type": "replaceAction",
                        "@id": "8bb3b8fc-3e07-49ba-8536-34e93737cd6d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "item",
                            "value": {
                                "@type": "Thing",
                                "@id": "id_7"
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "position": [
                    {
                        "@type": "replaceAction",
                        "@id": "ce7900e1-063e-42a1-8dfc-e020719546f4",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "position",
                            "value": 7
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "previousItem": [
                    {
                        "@type": "ListItem",
                        "@id": "90ce60fb-2368-48ef-bdd2-b6b53db63a5e"
                    }
                ],
                "nextItem": [
                    null,
                    {
                        "@type": "ListItem",
                        "@id": "ab326121-6908-429a-8522-c9fc91d87e9e"
                    }
                ]
            },
            "summary": {
                "@type": "ListItem",
                "@id": "92c61b83-a5e7-40c0-ba6c-efd6d7bcaa30",
                "item": {
                    "@type": "Thing",
                    "@id": "id_7",
                    "name": "name_7",
                    "url": "https://www.url.com/7",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "69cdd50a-1e8b-4b6e-9a73-20897fb1da45"
                    },
                    "parent": {
                        "@type": "Thing",
                        "@id": "idParent1_7",
                        "name": "parentName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "1750946a-c581-4823-b6ef-3bb75af429f8"
                        }
                    },
                    "children": [
                        {
                            "@type": "Thing",
                            "@id": "idChild2_7",
                            "name": "childName2",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "2849d999-7792-4609-8562-ef085f28a92b"
                            }
                        },
                        {
                            "@type": "Thing",
                            "@id": "idChild1_7",
                            "name": "childName1",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "4e917789-f86a-494e-9b9d-256beb566846"
                            }
                        }
                    ]
                },
                "position": 7,
                "previousItem": {
                    "@type": "ListItem",
                    "@id": "90ce60fb-2368-48ef-bdd2-b6b53db63a5e"
                },
                "nextItem": {
                    "@type": "ListItem",
                    "@id": "ab326121-6908-429a-8522-c9fc91d87e9e"
                }
            },
            "@type": "ListItem",
            "@id": "92c61b83-a5e7-40c0-ba6c-efd6d7bcaa30"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "12e2ea57-1ae9-4b2a-a2b7-6109d32a326c",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "b7903f25-34b7-4b04-876d-1bc7c4bb4992",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "de549d4c-a101-47fd-a98e-fbc6e96774bf",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "0758ecc0-5f59-4ff5-aa08-c069a43dac23"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "0758ecc0-5f59-4ff5-aa08-c069a43dac23"
            },
            "@type": "imageObject",
            "@id": "0758ecc0-5f59-4ff5-aa08-c069a43dac23"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "9b99be64-2434-4d05-a3a2-def669c95de8",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "b65d773c-2e9a-45dc-93f4-dd5511a97b64",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "86f45f36-157c-4618-84f3-1b12a30a623f",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "7525817b-bd64-43cd-ac7c-108208de8924"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "7525817b-bd64-43cd-ac7c-108208de8924"
            },
            "@type": "imageObject",
            "@id": "7525817b-bd64-43cd-ac7c-108208de8924"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "c01a8b80-be0c-4140-b782-d67297476351",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "b4224f50-22c9-4045-8883-99106eaf42dd",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "idParent1_8"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "a223200a-f555-4ce4-8e22-931dde9a6756",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "parentName1"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "a590886b-9de1-4492-92b7-89da0ef2b818",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "25f25ca6-42d1-4b6f-af61-2db35f9c54f8",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "8b997909-83c0-4981-b8f5-a67b20a924b7",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "eef7e52e-73c1-4675-90a5-a328b3154102",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "idParent1_8",
                "name": "parentName1",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                }
            },
            "@type": "Thing",
            "@id": "idParent1_8"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "635f4cf5-15a2-4cda-a298-3beb6f82967a",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "da494558-b0a4-4669-a5fc-a67af543acf5",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "id_8"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "b935b542-5a7e-4903-966d-703648a5baa3",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "name_8"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "url": [
                    {
                        "@type": "replaceAction",
                        "@id": "8c3ae647-8408-457d-b3dd-8d3e091c2ae1",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "url",
                            "value": "https://www.url.com/8"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "ef041d4a-40ad-47ef-94bb-08c37f6dce9c",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "2c6b8df4-970b-4b68-b923-52bd6e1554c9",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "08b9ee20-4478-4b58-8517-4a006310304e",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "7f7c4a11-0926-4bb8-b284-f44cba3b169d",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "ce752a1c-f2c8-4757-9596-0fd31f3125cb",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "2c6b8df4-970b-4b68-b923-52bd6e1554c9"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "2c6b8df4-970b-4b68-b923-52bd6e1554c9"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "parent": [
                    {
                        "@type": "replaceAction",
                        "@id": "3617f3cc-7a8c-4ce6-9b8c-b29bbc980a6d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "parent",
                            "value": {
                                "@type": "Thing",
                                "@id": "idParent1_8",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "c01a8b80-be0c-4140-b782-d67297476351",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "b4224f50-22c9-4045-8883-99106eaf42dd",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idParent1_8"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a223200a-f555-4ce4-8e22-931dde9a6756",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "parentName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a590886b-9de1-4492-92b7-89da0ef2b818",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "25f25ca6-42d1-4b6f-af61-2db35f9c54f8",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "8b997909-83c0-4981-b8f5-a67b20a924b7",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "eef7e52e-73c1-4675-90a5-a328b3154102",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idParent1_8",
                                    "name": "parentName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "children": [
                    {
                        "@type": "replaceAction",
                        "@id": "d8172797-9b9b-4b91-bccb-bd3912316779",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild1_8",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "b049f988-dfcd-44d3-b1db-07c444c9c247",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "28a7b77c-7a77-4822-9ad2-8738356b593f",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild1_8"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "b9bfa68d-7310-4dd5-80e0-6d2808f55286",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "7b525c78-ae02-4a56-933b-a5b12ab7c6b8",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "0cb8a34e-ab01-4a8d-b875-282078e69284",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "df856a35-3ce1-46b7-9730-4162bcfc8243",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "177482fb-dac9-4cc6-91a0-c8936b543f0d",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "00ad6bc9-35ab-47a5-9efe-8d84c7b4483d",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "0cb8a34e-ab01-4a8d-b875-282078e69284"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "0cb8a34e-ab01-4a8d-b875-282078e69284"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild1_8",
                                    "name": "childName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "0cb8a34e-ab01-4a8d-b875-282078e69284"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    },
                    {
                        "@type": "addAction",
                        "@id": "ddb01c2d-1c91-409e-9f29-312acac10d36",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild2_8",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "b8e0f50f-af7a-493f-aa44-4cc151e98cc5",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "ad9f7d3e-f943-48db-960a-945a5d047724",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild2_8"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "64f8ada5-c9ca-40d3-b185-f0e5ccb94b1e",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName2"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "80567cd6-df20-484e-a3a1-88fa5d55251a",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "582889bf-690f-489b-9394-b9d688a5d35a",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "7a91f06b-ef5d-41a2-9a81-522dc5c07c01",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "1f86e576-1d36-44b1-aeae-b1dbe247502c",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild2_8",
                                    "name": "childName2",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 2
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "id_8",
                "name": "name_8",
                "url": "https://www.url.com/8",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "2c6b8df4-970b-4b68-b923-52bd6e1554c9"
                },
                "parent": {
                    "@type": "Thing",
                    "@id": "idParent1_8",
                    "name": "parentName1",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "54ea4b49-683d-4b99-89a8-82c34763af9f"
                    }
                },
                "children": [
                    {
                        "@type": "Thing",
                        "@id": "idChild2_8",
                        "name": "childName2",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "fa9c172d-6ac1-4fe1-81fe-7aac0c590347"
                        }
                    },
                    {
                        "@type": "Thing",
                        "@id": "idChild1_8",
                        "name": "childName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "0cb8a34e-ab01-4a8d-b875-282078e69284"
                        }
                    }
                ]
            },
            "@type": "Thing",
            "@id": "id_8"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "cf753721-9144-41ed-888d-8b690582d903",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "7b94c364-50e5-443b-ae97-c92359aab5a0",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "26ce62a0-c9bf-423f-b82a-17e940ec01b5",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "d1f75617-29c0-495b-a37b-e728bc698843"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "d1f75617-29c0-495b-a37b-e728bc698843"
            },
            "@type": "imageObject",
            "@id": "d1f75617-29c0-495b-a37b-e728bc698843"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "a441717c-bcc2-4e12-9ecb-6f39760ac71c",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "f7ce0fa8-53f7-435b-aa6e-bff923d57679",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "58c83a32-4174-4d97-b114-b5f2152b69ca",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "311682a7-dcce-4393-b7c4-8acf58599af7"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "311682a7-dcce-4393-b7c4-8acf58599af7"
            },
            "@type": "imageObject",
            "@id": "311682a7-dcce-4393-b7c4-8acf58599af7"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "ec35d845-a11a-4c53-a95e-8b375ad0ce58",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "593678d5-c143-4349-801f-7f273adfaabb",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "9d34e8bd-7dbf-4a86-ade8-35bd541ef483",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "69cdd50a-1e8b-4b6e-9a73-20897fb1da45"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "69cdd50a-1e8b-4b6e-9a73-20897fb1da45"
            },
            "@type": "imageObject",
            "@id": "69cdd50a-1e8b-4b6e-9a73-20897fb1da45"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "09ea81e5-4812-4efb-a511-c05c811ab240",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "905c0ab1-aa8b-4d1f-8706-724f43caf09f",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "4bf5629b-e793-4b56-b83a-785b091d5681",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "7798c85e-aec4-427a-9252-183cdbb7794c"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "7798c85e-aec4-427a-9252-183cdbb7794c"
            },
            "@type": "imageObject",
            "@id": "7798c85e-aec4-427a-9252-183cdbb7794c"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "8b3b8212-7c50-4c56-970d-1518122e90b7",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "72b375d1-6664-4792-85a6-57d8bf9134b2",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "ca40ba62-8f63-469e-94fa-0cb7c23cdb6e",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "95c8c63a-7242-4194-b559-0aacf078ab73"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "95c8c63a-7242-4194-b559-0aacf078ab73"
            },
            "@type": "imageObject",
            "@id": "95c8c63a-7242-4194-b559-0aacf078ab73"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "a2c20249-3358-4cec-b777-4f8202604970",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "imageObject"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "contentUrl": [
                    {
                        "@type": "replaceAction",
                        "@id": "e78bd893-822f-4155-8cfb-e05b05ce0a7a",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "contentUrl",
                            "value": "./kraken.png"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "2e553113-d79b-4fc5-acb8-a2c1f97f83d8",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "78a0d329-2bfc-41af-8eec-b0a26b8d6242"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.163Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "imageObject",
                "contentUrl": "./kraken.png",
                "@id": "78a0d329-2bfc-41af-8eec-b0a26b8d6242"
            },
            "@type": "imageObject",
            "@id": "78a0d329-2bfc-41af-8eec-b0a26b8d6242"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "a6c47f2b-2ee6-4030-acc1-e7dff64aabab",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "0d82bc39-16c2-4903-b137-f89c71c342e0",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "idChild1_9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "347a8a91-c447-4c5c-bd48-5baf40171867",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "childName1"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "168c1fb5-e602-45f8-95aa-d2508752a0d5",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "c6d5544f-f948-4ce1-a77f-8dbd9de27fff",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "ca6ab6c8-b14b-46af-a5aa-75affcea1dc9",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a91c175a-a639-4948-9f28-f9dfcfe21548",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "idChild1_9",
                "name": "childName1",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                }
            },
            "@type": "Thing",
            "@id": "idChild1_9"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "c3ce96c7-ad83-403d-88ef-ae222c02c4b8",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "ListItem"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "bc43b8b7-afa2-4724-94da-7d76e05c2fcb",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "726ea801-1836-4c18-b064-8a5d8df1182d"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "item": [
                    {
                        "@type": "replaceAction",
                        "@id": "518bc7f7-c45b-44a7-9187-6b095bd58f4d",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "item",
                            "value": {
                                "@type": "Thing",
                                "@id": "id_9"
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "position": [
                    {
                        "@type": "replaceAction",
                        "@id": "2c0bd3ae-b050-4ea5-b21f-2daf08faf8b0",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "position",
                            "value": 9
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-28T15:40:51.164Z\"",
                            "position": 1
                        }
                    }
                ],
                "previousItem": [
                    {
                        "@type": "ListItem",
                        "@id": "ab326121-6908-429a-8522-c9fc91d87e9e"
                    }
                ],
                "nextItem": [
                    null
                ]
            },
            "summary": {
                "@type": "ListItem",
                "@id": "726ea801-1836-4c18-b064-8a5d8df1182d",
                "item": {
                    "@type": "Thing",
                    "@id": "id_9",
                    "name": "name_9",
                    "url": "https://www.url.com/9",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "311682a7-dcce-4393-b7c4-8acf58599af7"
                    },
                    "parent": {
                        "@type": "Thing",
                        "@id": "idParent1_9",
                        "name": "parentName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "7798c85e-aec4-427a-9252-183cdbb7794c"
                        }
                    },
                    "children": [
                        {
                            "@type": "Thing",
                            "@id": "idChild2_9",
                            "name": "childName2",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "0758ecc0-5f59-4ff5-aa08-c069a43dac23"
                            }
                        },
                        {
                            "@type": "Thing",
                            "@id": "idChild1_9",
                            "name": "childName1",
                            "image": {
                                "@type": "imageObject",
                                "contentUrl": "./kraken.png",
                                "@id": "b2d2d77c-153b-449a-a68d-a8fe8cf8eed2"
                            }
                        }
                    ]
                },
                "position": 9,
                "previousItem": {
                    "@type": "ListItem",
                    "@id": "ab326121-6908-429a-8522-c9fc91d87e9e"
                },
                "nextItem": null
            },
            "@type": "ListItem",
            "@id": "726ea801-1836-4c18-b064-8a5d8df1182d"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "253fd0a0-1344-4b0f-b93f-d7864039c612",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "74c31422-ba5b-4763-b52f-98990727f5eb",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "idParent1_9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "d20f1ebc-ea64-45dd-a1ca-110c7c2588ff",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "parentName1"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "e09127a8-6002-46da-b91e-919de4500660",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "80ff16d2-632e-4921-b586-9ca2bcbb2beb",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "9e25d07d-9e0e-4264-935f-50e227abbe0c",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "bd225f20-9951-4432-aa21-e2ba630a66e0",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                            "position": 1
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "idParent1_9",
                "name": "parentName1",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                }
            },
            "@type": "Thing",
            "@id": "idParent1_9"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "f3819f69-d1f1-4c14-a58c-eb95f5bf15a2",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "5c6e7992-4f0b-4778-bfad-64453bf1def1",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "id_7"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "3ea9cd9f-2287-47e7-85b4-a4a6b905d5ae",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "name_7"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "url": [
                    {
                        "@type": "replaceAction",
                        "@id": "8a319c37-2037-4c8d-8183-f62f60502319",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "url",
                            "value": "https://www.url.com/7"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "1f16b207-b404-4b86-97d9-dce4b7d9b86a",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "8ff6072d-45d0-4109-96ca-91e5c40353e9",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "fe8fd6b5-1b9c-475e-ad58-1c161bfc4269",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "ea8fb9a0-f2b2-4ba3-8c45-b4acdc672cc9",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "f66fd6cf-1375-45b3-90c0-d728e66038d4",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "8ff6072d-45d0-4109-96ca-91e5c40353e9"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "8ff6072d-45d0-4109-96ca-91e5c40353e9"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "parent": [
                    {
                        "@type": "replaceAction",
                        "@id": "7e59c652-23e2-4bb6-8247-c14d709c463f",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "parent",
                            "value": {
                                "@type": "Thing",
                                "@id": "idParent1_7",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "9f955452-b258-41ef-ae8f-07b850b86ba7",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "f11d1073-ea08-4fa3-a501-6ecb7a2c13cf",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idParent1_7"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "35faf7b5-eb3e-4710-9645-27f485c4b0f5",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "parentName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "ecf85017-0c64-4aac-b13d-43a0e34e15cf",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "86ac05f8-d9b2-4f7d-b475-54feab7c1ec6",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "348aea2e-f8f9-48e0-9b98-579c24c9dc0e",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "6a5098d0-add9-4434-ab93-d1caa59a2dc9",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "4be70de1-affd-4dfc-8121-21305529181a",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "86ac05f8-d9b2-4f7d-b475-54feab7c1ec6"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "86ac05f8-d9b2-4f7d-b475-54feab7c1ec6"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idParent1_7",
                                    "name": "parentName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "86ac05f8-d9b2-4f7d-b475-54feab7c1ec6"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    }
                ],
                "children": [
                    {
                        "@type": "replaceAction",
                        "@id": "bc71a0b4-47a2-4f7a-9e0e-c6f92dfebe62",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild1_7",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "16c832b5-168b-4f8a-9da0-365f987877a7",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "4ad1bf7f-1410-4887-a28e-2b96eaf63ea7",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild1_7"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "eaa90aec-5b22-4650-8d7b-7ef830d086cf",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "40ab803d-7152-4b52-b428-b5c5a71b22d2",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "a6afb788-d92a-4487-91da-da6238027cb2",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "2e24da98-af0c-40a8-83a9-b3d8a23e2df3",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "f4d66b3f-9b40-4230-953c-b06914f979ce",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "bd3edc0d-9ee8-469a-ae34-c20fde88f624",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "a6afb788-d92a-4487-91da-da6238027cb2"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "a6afb788-d92a-4487-91da-da6238027cb2"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild1_7",
                                    "name": "childName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "a6afb788-d92a-4487-91da-da6238027cb2"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 1
                        }
                    },
                    {
                        "@type": "addAction",
                        "@id": "83a527c5-1e09-4346-83f2-d8ffe56a3d53",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild2_7",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "5014663e-d2c1-425c-9fc4-ade153ae05a0",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a07e3d56-5676-4d95-b37f-a20733dc84b7",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild2_7"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a0c761f8-52dd-4337-9c45-fe6d7f158f3f",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName2"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "0480afc1-9780-4e0e-b6b8-91aaaa4ef724",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "28d47ff6-b870-4309-8318-c66f8224a353",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "b9308326-306a-43b6-86b7-47fa237ba94d",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "8db3b9f7-0d22-477b-9b87-0aa8247c4c66",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "c401f48b-d57f-4907-9305-35c7bf7c3c92",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "28d47ff6-b870-4309-8318-c66f8224a353"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "28d47ff6-b870-4309-8318-c66f8224a353"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild2_7",
                                    "name": "childName2",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "28d47ff6-b870-4309-8318-c66f8224a353"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.018Z\"",
                            "position": 2
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "id_7",
                "name": "name_7",
                "url": "https://www.url.com/7",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "8ff6072d-45d0-4109-96ca-91e5c40353e9"
                },
                "parent": {
                    "@type": "Thing",
                    "@id": "idParent1_7",
                    "name": "parentName1",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "86ac05f8-d9b2-4f7d-b475-54feab7c1ec6"
                    }
                },
                "children": [
                    {
                        "@type": "Thing",
                        "@id": "idChild2_7",
                        "name": "childName2",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "28d47ff6-b870-4309-8318-c66f8224a353"
                        }
                    },
                    {
                        "@type": "Thing",
                        "@id": "idChild1_7",
                        "name": "childName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "a6afb788-d92a-4487-91da-da6238027cb2"
                        }
                    }
                ]
            },
            "@type": "Thing",
            "@id": "id_7"
        },
        {
            "properties": {
                "@type": [
                    {
                        "@type": "replaceAction",
                        "@id": "e09cfc78-a389-4b61-8032-2a3898700139",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@type",
                            "value": "Thing"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "@id": [
                    {
                        "@type": "replaceAction",
                        "@id": "4194d46e-eb17-4d2c-aac2-7668aecbff08",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "@id",
                            "value": "id_9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "name": [
                    {
                        "@type": "replaceAction",
                        "@id": "1db7ad76-68e3-48a7-9416-5a61b6d251f9",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "name",
                            "value": "name_9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "url": [
                    {
                        "@type": "replaceAction",
                        "@id": "5c15ddea-6124-4124-9f8d-475e32e3d6b2",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "url",
                            "value": "https://www.url.com/9"
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "image": [
                    {
                        "@type": "replaceAction",
                        "@id": "4f22238f-d547-48d1-b157-d87f364ae5fd",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "image",
                            "value": {
                                "@type": "imageObject",
                                "@id": "49049b65-04b1-42b7-a6c8-5ed33098934a",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "030867f4-fc55-4c0d-85a3-7b779b4653b0",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "imageObject"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "contentUrl": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "87799efa-52a6-41c0-b62f-de3b900d357f",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "contentUrl",
                                                "value": "./kraken.png"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "0521a2f9-38a1-4898-af81-5c51ee992291",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "49049b65-04b1-42b7-a6c8-5ed33098934a"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "imageObject",
                                    "contentUrl": "./kraken.png",
                                    "@id": "49049b65-04b1-42b7-a6c8-5ed33098934a"
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "parent": [
                    {
                        "@type": "replaceAction",
                        "@id": "997d30c4-e2b6-4223-abc7-6e9d9dbe182e",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "parent",
                            "value": {
                                "@type": "Thing",
                                "@id": "idParent1_9",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "253fd0a0-1344-4b0f-b93f-d7864039c612",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "74c31422-ba5b-4763-b52f-98990727f5eb",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idParent1_9"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "d20f1ebc-ea64-45dd-a1ca-110c7c2588ff",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "parentName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "e09127a8-6002-46da-b91e-919de4500660",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "80ff16d2-632e-4921-b586-9ca2bcbb2beb",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "9e25d07d-9e0e-4264-935f-50e227abbe0c",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "bd225f20-9951-4432-aa21-e2ba630a66e0",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idParent1_9",
                                    "name": "parentName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    }
                ],
                "children": [
                    {
                        "@type": "replaceAction",
                        "@id": "1f33b9e8-3dc3-4858-b51d-49ac0f5821f0",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild1_9",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "a6c47f2b-2ee6-4030-acc1-e7dff64aabab",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "0d82bc39-16c2-4903-b137-f89c71c342e0",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild1_9"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "347a8a91-c447-4c5c-bd48-5baf40171867",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName1"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "168c1fb5-e602-45f8-95aa-d2508752a0d5",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "c6d5544f-f948-4ce1-a77f-8dbd9de27fff",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "ca6ab6c8-b14b-46af-a5aa-75affcea1dc9",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "a91c175a-a639-4948-9f28-f9dfcfe21548",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild1_9",
                                    "name": "childName1",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 1
                        }
                    },
                    {
                        "@type": "addAction",
                        "@id": "4dfb88ab-6fa3-4f49-b1fc-28449683e049",
                        "actionStatus": "completedActionStatus",
                        "object": {
                            "@type": "propertyValue",
                            "propertyID": "children",
                            "value": {
                                "@type": "Thing",
                                "@id": "idChild2_9",
                                "properties": {
                                    "@type": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "803f7511-cd02-42fd-b29b-8c0c60023422",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@type",
                                                "value": "Thing"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "@id": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "5cf4af10-6498-4840-9915-1d3dc777ddb0",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "@id",
                                                "value": "idChild2_9"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "name": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "1f7bf7f3-dd3d-4a20-bebe-72dbaacc6bcf",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "name",
                                                "value": "childName2"
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ],
                                    "image": [
                                        {
                                            "@type": "replaceAction",
                                            "@id": "859345fe-cde5-4c5c-b96a-d9fb39ea9d3d",
                                            "actionStatus": "completedActionStatus",
                                            "object": {
                                                "@type": "propertyValue",
                                                "propertyID": "image",
                                                "value": {
                                                    "@type": "imageObject",
                                                    "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01",
                                                    "properties": {
                                                        "@type": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "4511bf2c-627f-4412-ae04-504c97978216",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@type",
                                                                    "value": "imageObject"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "contentUrl": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "2edbc396-0cf9-477b-9044-676c9ff14efd",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "contentUrl",
                                                                    "value": "./kraken.png"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ],
                                                        "@id": [
                                                            {
                                                                "@type": "replaceAction",
                                                                "@id": "23fe9850-03b9-4a1a-9af9-896196a9990e",
                                                                "actionStatus": "completedActionStatus",
                                                                "object": {
                                                                    "@type": "propertyValue",
                                                                    "propertyID": "@id",
                                                                    "value": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                                                                },
                                                                "metadata": {
                                                                    "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                                    "position": 1
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "summary": {
                                                        "@type": "imageObject",
                                                        "contentUrl": "./kraken.png",
                                                        "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                                                    }
                                                }
                                            },
                                            "metadata": {
                                                "createdDate": "\"2024-06-29T16:10:25.020Z\"",
                                                "position": 1
                                            }
                                        }
                                    ]
                                },
                                "summary": {
                                    "@type": "Thing",
                                    "@id": "idChild2_9",
                                    "name": "childName2",
                                    "image": {
                                        "@type": "imageObject",
                                        "contentUrl": "./kraken.png",
                                        "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                                    }
                                }
                            }
                        },
                        "metadata": {
                            "createdDate": "\"2024-06-29T16:10:25.019Z\"",
                            "position": 2
                        }
                    }
                ]
            },
            "summary": {
                "@type": "Thing",
                "@id": "id_9",
                "name": "name_9",
                "url": "https://www.url.com/9",
                "image": {
                    "@type": "imageObject",
                    "contentUrl": "./kraken.png",
                    "@id": "49049b65-04b1-42b7-a6c8-5ed33098934a"
                },
                "parent": {
                    "@type": "Thing",
                    "@id": "idParent1_9",
                    "name": "parentName1",
                    "image": {
                        "@type": "imageObject",
                        "contentUrl": "./kraken.png",
                        "@id": "1706ff75-7a26-4379-b8df-03bf27dfbd94"
                    }
                },
                "children": [
                    {
                        "@type": "Thing",
                        "@id": "idChild2_9",
                        "name": "childName2",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "2383f7d6-9ba8-47a7-a56e-acab32e5ce01"
                        }
                    },
                    {
                        "@type": "Thing",
                        "@id": "idChild1_9",
                        "name": "childName1",
                        "image": {
                            "@type": "imageObject",
                            "contentUrl": "./kraken.png",
                            "@id": "18392b61-10cc-4d4b-b5ab-a1d3db51e4ac"
                        }
                    }
                ]
            },
            "@type": "Thing",
            "@id": "id_9"
        }
    ]

    let thing = new KrThing()
    thing.setSystemRecord(record)
    //let things = new KrThings("ItemList", "Itemlist1")

    //console.log(things.record_id)
    //console.log('a', JSON.stringify(things.getSystemRecord(), null, 4))
    //things.api_post()


    console.log(JSON.stringify(thing.record, null, 4))

  
}


test4()