import { KrThing } from "../../class_KrThing.js";

import { KrCache } from "../class_krCache.js";

// Run the test
test("KrCache init", function () {
    let cache = new KrCache();

    let record = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1",
    };

    var t = new KrThing(record);

    cache.set(t);

    let t2 = cache.get("Thing", "thing1");

    expect(t2.name).toStrictEqual("thing1");
});


test("KrCache init with array", function () {
    let cache = new KrCache();

    let record1 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1",
    };

    let record2 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing2",
        name: "thing2",
    };

    var t1 = new KrThing(record1);
    var t2 = new KrThing(record2);

    cache.set([t1, t2]);

    
    let tr1 = cache.get("Thing", "thing1");
    let tr2 = cache.get("Thing", "thing2");

    expect(tr1.name).toStrictEqual("thing1");
    expect(tr2.name).toStrictEqual("thing2");
    expect(cache.length).toStrictEqual(2);
    
});


test("KrCache init with record", function () {
    let cache = new KrCache();

    let record1 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1",
    };

    let record2 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing2",
        name: "thing2",
    };

  
    cache.set([record1, record2]);


    let tr1 = cache.get("Thing", "thing1");
    let tr2 = cache.get("Thing", "thing2");

    expect(tr1.name).toStrictEqual("thing1");
    expect(tr2.name).toStrictEqual("thing2");
    expect(cache.length).toStrictEqual(2);

});

test("KrCache multiple records", function () {
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
    expect(t1.name).toStrictEqual("thing1");

    let t2 = cache.get("Thing", "thing2");
    expect(t2.name).toStrictEqual("thing2");

    let t3 = cache.get("Thing", "thing3");
    expect(t3.name).toStrictEqual("thing3");

    let t4 = cache.get("Thing", "thing4");
    expect(t4.name).toStrictEqual("thing4");

    
});



test("KrCache infinite loop records", function () {
    
    
    let cache = new KrCache();

    let record1 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1"
    }
    
    var t1 = new KrThing(record1);


    let record2 = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing2",
        name: "thing2",
        other2: t1
    }

    let t2 = new KrThing(record2)
    
    t1.setProperty('other1', t2)
    

    cache.set(t1);

    let t3 = cache.get("Thing", "thing1");
    expect(t3.name).toStrictEqual("thing1");

   
    let t4 = cache.get("Thing", "thing2");
    expect(t4.name).toStrictEqual("thing2");

    let p = t4.getProperty('other2')
    expect(p.value.name).toStrictEqual("thing1");

    expect(cache.length).toStrictEqual(2);

});


test("KrCache null", function () {
    let cache = new KrCache();

    let record = {
        "@context": "https://schema.org/",
        "@type": "Thing",
        "@id": "thing1",
        name: "thing1",
    };

    var t = new KrThing(record);

    cache.set(null);

    let t2 = cache.get("Thing", "thing1");

    expect(t2).toStrictEqual(undefined);
});