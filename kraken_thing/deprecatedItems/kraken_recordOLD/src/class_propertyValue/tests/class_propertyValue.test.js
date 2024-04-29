
import { KrPropertyValue } from '../class_propertyValue.js';
import { KrThing } from '../../class_thing/class_thing.js';







// Run the test
test('KrPropertyValue init', function () {

    var input_propertyID = 'name';
    var input_value = 'test1';

    var expected_result = 'test1';

    var k = new KrPropertyValue(input_propertyID, input_value);

    // Test properties
    expect(k.propertyID).toStrictEqual(input_propertyID);
    expect(k.value).toStrictEqual(input_value);


});



// Run the test
test('KrPropertyValue comparison', function () {

    
    var k1 = new KrPropertyValue('name', 'name1');

    var k2 = new KrPropertyValue('name', 'name1');

    
    k1.metadata.credibility = null;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = null;

    k2.metadata.credibility = null;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(false);

    k1.metadata.credibility = 0.4;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = null;

    k2.metadata.credibility = null;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);


    // ---------
    k1.metadata.credibility = 0.4;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = null;

    k2.metadata.credibility = 0.2;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);


    // ---------
    k1.metadata.credibility = 0.4;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = null;

    k2.metadata.credibility = 0.2;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);


    // ---------
    k1.metadata.credibility = null;
    k1.metadata.observationDate = new Date(2024, 1, 1);
    k1.metadata.createdDate = null;

    k2.metadata.credibility = null;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    

    // ---------
    k1.metadata.credibility = null;
    k1.metadata.observationDate = new Date(2024, 1, 1);
    k1.metadata.createdDate = null;

    k2.metadata.credibility = null;
    k2.metadata.observationDate = new Date(2023, 1, 1);
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);



    // ---------
    k1.metadata.credibility = null;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = new Date(2024, 1, 1);

    k2.metadata.credibility = null;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);


    // ---------
    k1.metadata.credibility = null;
    k1.metadata.observationDate = null;
    k1.metadata.createdDate = new Date(2024, 1, 1);

    k2.metadata.credibility = null;
    k2.metadata.observationDate = null;
    k2.metadata.createdDate = new Date(2022, 1, 1);

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);



    // ---------

    var k1 = new KrPropertyValue('name', 'name1');

    var k2 = new KrPropertyValue('name', 'name2');

    k1.metadata.credibility = 0.5;
    k1.metadata.createdDate = new Date(2024, 1, 1);
    k1.metadata.position = 7

    k2.metadata.credibility = 0.3;
    k2.metadata.createdDate = new Date(2022, 1, 1);
    k2.metadata.position = 8

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);

    
    
});




    

// Run the test
test('KrPropertyValue thing as a value', function () {


    var input_propertyID = 'name';
    var input_value = new KrThing({ "@type": "person", "@id": "test", "name": "name3" });
    var expected_result = { "@type": "person", "@id": "test", "name": ["name3"] };



    var k1 = new KrPropertyValue(input_propertyID, input_value);

    var actual_result = k1.getFullRecord();

    expect(actual_result).toStrictEqual(expected_result);


});







