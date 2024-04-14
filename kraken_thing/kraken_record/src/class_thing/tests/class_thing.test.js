


import { exportAllDeclaration } from '@babel/types';
import { KrThing } from '../class_thing.js';



// Run the test
test('KrThing init', function () {


    var input_type = 'person';
    var input_id = "abc123";


    var k = new KrThing(input_type, input_id);

    // Test properties
    expect(k.record_type).toStrictEqual(input_type);
    expect(k.record_id).toStrictEqual(input_id);

    // test ref
    var expected_result = {"@type": input_type, "@id": input_id};
    expect(k.ref).toStrictEqual(expected_result);

});


// Run the test
test('KrThing get record', function () {


    let input_type = 'person';
    let input_id = "abc123";


    let expected_result = {
        "@type": "person",
        "@id": "abc123",
        "name": ["name1"],
        "email": ["email@test.com"]
    };

    let k = new KrThing(input_type, input_id);

    k.setProperty('name', 'name1');
    k.setProperty('email', 'email@test.com');

    let actual_result = k.getFullRecord();

    // Test 
    expect(actual_result).toStrictEqual(expected_result);

});



// Run the test
test('KrThing get record complex', function () {


    let input_type = 'person';
    let input_id = "abc123";


    let expected_result = {
        "@type": "person",
        "@id": "abc123",
        "name": ["name1"],
        "email": ["email@test.com"],
        "other": [{
            "@type": "person",
            "@id": "def456",
            "name": ["name2"],
        }],
    };

    let k = new KrThing(input_type, input_id);

    k.setProperty('name', 'name1');
    k.setProperty('email', 'email@test.com');
    k.setProperty('other', {
                     "@type": "person",
                     "@id": "def456",
                     "name": "name2",
                 });
    let actual_result = k.record;

    // Test 
    expect(actual_result).toStrictEqual(expected_result);

});



// Run the test
test('KrThing Comparison', function () {

    let k1 = new KrThing('Thing', 'abc123');
    let k2 = new KrThing('Thing', 'def456');
    let k3 = new KrThing('Thing', 'def456');
    

    // Test 
    expect(k1.lt(k2)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(false);
    expect(k1.eq(k2)).toStrictEqual(false);
    expect(k2.eq(k3)).toStrictEqual(true);

    expect(k2.lt(k1)).toStrictEqual(false);
    expect(k2.gt(k1)).toStrictEqual(true);
    expect(k2.eq(k1)).toStrictEqual(false);
    expect(k3.eq(k2)).toStrictEqual(true);
    
});


// Run the test
test('KrThing Properties', function () {

    let k = new KrThing('Thing', 'abc123');
    

    k.setProperty('name', 'name1');

    var actual_result = k.getProperty('name').value;
    expect(actual_result).toStrictEqual('name1');
    
    

});



// Run the test
test('KrThing fullRecord', function () {

    let k1 = new KrThing('Thing', 'abc123');

    
    k1.setProperty('name', 'name1');
    k1.setProperty('url', 'https://www.test.com');


    //console.log(JSON.stringify(k1.fullRecord, null, 4));
    let k2 = new KrThing();
    
    k2.fullRecord = k1.fullRecord;
    //console.log(JSON.stringify(k2.fullRecord, null, 4));


    
    expect(k2.name).toStrictEqual(k1.name);
    expect(k2.fullRecord).toStrictEqual(k1.fullRecord);


});



// Run the test
test('KrThing refRecord', function () {

    let k1 = new KrThing('Thing', 'abc123');

    let k2 = new KrThing('Thing', 'def456');
    let k3 = new KrThing();

    k2.setProperty('name', 'bob');    
    k1.setProperty('name', 'name1');
    k1.setProperty('url', 'https://www.test.com');
    k1.setProperty('object', k2);

    k3.fullRecord = k1.refRecord;

    var object = k3.getProperty('object').value;
    

    var nameProperty = object.getProperty('name');
    
    expect(nameProperty.value).toStrictEqual(null);
    
});



// Run the test
test('KrThing properties netting', function () {


    // ------------------------------------
    var k = new KrThing('Thing', 'abc123');
    
    k.addProperty('name', 'name1', 0.4);
    k.replaceProperty('name', null, 'name2', 0.4);
    k.replaceProperty('name', null, 'name3', 0.4);

    var nameProperty = k.getProperty('name');
    expect(nameProperty.value).toStrictEqual('name3');
    expect(nameProperty.values.length).toStrictEqual(1);


    // ------------------------------------
    var k = new KrThing('Thing', 'abc123');

    k.addProperty('name', 'name1', 0.4);
    k.replaceProperty('name', null, 'name2', 0.5);
    k.replaceProperty('name', null, 'name3', 0.3);

    var nameProperty = k.getProperty('name');
    expect(nameProperty.value).toStrictEqual('name2');
    expect(nameProperty.values.length).toStrictEqual(1);


    // ------------------------------------
    var k = new KrThing('Thing', 'abc123');

    k.addProperty('name', 'name1', 0.4);
    k.addProperty('name', 'name2', 0.5);
    k.addProperty('name', 'name3', 0.3);

    var nameProperty = k.getProperty('name');
    expect(nameProperty.value).toStrictEqual('name2');
    expect(nameProperty.values.length).toStrictEqual(3);


    // ------------------------------------
    var k = new KrThing('Thing', 'abc123');

    k.addProperty('name', 'name1', 0.4);
    k.deleteProperty('name', 'name1', 0.4);
    k.addProperty('name', 'name3', 0.4);

    var nameProperty = k.getProperty('name');
    expect(nameProperty.value).toStrictEqual('name3');
    expect(nameProperty.values.length).toStrictEqual(1);

    
});




