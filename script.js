import { KrThing } from "./src/index.js";
import { KrThings } from "./src/index.js";
import { KrListItem } from "./src/index.js";
import { KrPropertyValueSpecification } from "./src/index.js";

function test1() {
    let record = {
        "@type": "ItemList",
        "@id": "ItemList0",
        name: "ItemList0",
        itemListElement: [
            {
                "@type": "ListItem",
                "@id": "ListItem0",
                name: "ListItem0",
                position: 0,
                previousItem: null,
                nextItem: {
                    "@type": "ListItem",
                    "@id": "ListItem1",
                },
                item: {
                    "@type": "Thing",
                    "@id": "Thing0",
                    name: "Thing0",
                    url: "https://www.test.com/thing0",
                },
            },
            {
                "@type": "ListItem",
                "@id": "ListItem1",
                name: "ListItem1",
                position: 1,
                previousItem: {
                    "@type": "ListItem",
                    "@id": "ListItem0",
                },
                nextItem: {
                    "@type": "ListItem",
                    "@id": "ListItem2",
                },
                item: {
                    "@type": "Thing",
                    "@id": "Thing1",
                    name: "Thing1",
                    url: "https://www.test.com/thing1",
                },
            },
            {
                "@type": "ListItem",
                "@id": "ListItem2",
                name: "ListItem2",
                position: 2,
                previousItem: {
                    "@type": "ListItem",
                    "@id": "ListItem1",
                },
                nextItem: {
                    "@type": "ListItem",
                    "@id": "ListItem3",
                },
                item: {
                    "@type": "Thing",
                    "@id": "Thing2",
                    name: "Thing2",
                    url: "https://www.test.com/thing2",
                },
            },
            {
                "@type": "ListItem",
                "@id": "ListItem3",
                name: "ListItem3",
                position: 3,
                previousItem: {
                    "@type": "ListItem",
                    "@id": "ListItem2",
                },
                nextItem: null,
                item: {
                    "@type": "Thing",
                    "@id": "Thing3",
                    name: "Thing3",
                    url: "https://www.test.com/thing3",
                },
            },
        ],
    };

    let things = new KrThings();
    things.record = record;
    console.log(JSON.stringify(things.record, null, 4));

    console.log("zz", things.record_type, things.record_id);

    let refItem = { "@type": "ListItem", "@id": "ListItem2" };

    let newItem = {
        "@type": "ListItem",
        "@id": "ListItem4",
        name: "ListItem4",
        item: {
            "@type": "Thing",
            "@id": "Thing4",
            name: "Thing4",
            url: "https://www.test.com/thing4"
        }
    };

    things.insertAfter(refItem, newItem);

    console.log(things.getProperty("itemListElement").values);
}


function test2(){

    let record = {
        "@type": "ItemList",
        "@id": "ItemList0",
        name: "ItemList0"
    }
    
    let t = new KrThings()
    console.log(t.getProperty('@id').values)
    t.record = record
    
    console.log(JSON.stringify(t.record, null, 4))
    console.log(t.getProperty('@id').value)


    t.replaceProperty('@id', null, 'bob3')
    console.log(t.getProperty('@id').value)
    
    let p = t.getProperty('@id')

    for(let pv of p.propertyValues){

        console.log('value')
        pv.printScreen()
    }
    
}

test1();
//test2()