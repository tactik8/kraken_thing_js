
import { KrMetadata } from '../class_metadata.js';



// Run the test
test('KrMetadata init', function () {

    let k = new KrMetadata();

    // Test observationDate
    var input_value = 0.4;
    var expected_result = 0.4;
    k.credibility = input_value;
    
    expect(k.credibility).toStrictEqual(expected_result);
    expect(k.c).toStrictEqual(expected_result);

    // Test observationDate
    var input_value = new Date(2024, 3, 18);
    var expected_result =new Date(2024, 3, 18);;
    
    k.observationDate = input_value;
    expect(k.observationDate).toStrictEqual(expected_result);
    expect(k.d).toStrictEqual(expected_result);

    // Test metadata record
    var expected_result = {
        "credibility": 0.4,
        "observationDate": new Date(2024, 3, 18)
    };
    expect(k._record.credibility).toStrictEqual(0.4);
    
});



// Run the test
test('KrMetadata comparison', function () {

    let k = new KrMetadata();
    
    var k1 = new KrMetadata('name', 'name1');
    
    var k2 = new KrMetadata('name', 'name1');
    
    
    k1.credibility = null;
    k1.observationDate = null;
    k1.createdDate = null;
    
    k2.credibility = null;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(false);
    
    k1.credibility = 0.4;
    k1.observationDate = null;
    k1.createdDate = null;
    
    k2.credibility = null;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = 0.4;
    k1.observationDate = null;
    k1.createdDate = null;
    
    k2.credibility = 0.2;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = 0.4;
    k1.observationDate = null;
    k1.createdDate = null;
    
    k2.credibility = 0.2;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = null;
    k1.observationDate = new Date(2024, 1, 1);
    k1.createdDate = null;
    
    k2.credibility = null;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = null;
    k1.observationDate = new Date(2024, 1, 1);
    k1.createdDate = null;
    
    k2.credibility = null;
    k2.observationDate = new Date(2023, 1, 1);
    k2.createdDate = null;

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = null;
    k1.observationDate = null;
    k1.createdDate = new Date(2024, 1, 1);
    
    k2.credibility = null;
    k2.observationDate = null;
    k2.createdDate = null;
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);
    
    
    // ---------
    k1.credibility = null;
    k1.observationDate = null;
    k1.createdDate = new Date(2024, 1, 1);
    
    k2.credibility = null;
    k2.observationDate = null;
    k2.createdDate = new Date(2022, 1, 1);
    
    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);


    // ---------

    var k1 = new KrMetadata('name', 'name1');

    var k2 = new KrMetadata('name', 'name2');
    
    k1.credibility = 0.5;
    k1.createdDate = new Date(2024, 1, 1);
    k1.position = 7

    k2.credibility = 0.3;
    k2.createdDate = new Date(2022, 1, 1);
    k2.position = 8

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(true);
    expect(k1.gt(k2)).toStrictEqual(true);
    expect(k2.gt(k1)).toStrictEqual(false);

});



// Run the test
test('KrMetadata comparison', function () {

    let k = new KrMetadata();

    var k1 = new KrMetadata('name', 'name1');

    var k2 = new KrMetadata('name', 'name1');

    expect(k1.lt(k2)).toStrictEqual(false);
    expect(k2.lt(k1)).toStrictEqual(false);

    expect(k1.gt(k2)).toStrictEqual(false);
    expect(k2.gt(k1)).toStrictEqual(false);

});