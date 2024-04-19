
import { KrProperty } from '../class_property.js';





// Run the test
test('KrProperty init', function () {

    var input_value = 'name';
    var expected_result = 'name';
    
    let k = new KrProperty(input_value);

    // Test property
    expect(k.propertyID).toStrictEqual(expected_result);
   
    // Test value
    var input_value = 'name';
    var expected_result = 'name';
    k.value = input_value;
    expect(k.value).toStrictEqual(expected_result);
    
    
});


// Run the test
test('KrProperty comparison', function () {


    var k1 = new KrProperty('@type');
    var k2 = new KrProperty('name');
    var k3 = new KrProperty('name');
   
    // Test comparison lt
    var test_condition = k1.lt(k2);
    var expected_result = true;
    expect(test_condition).toStrictEqual(expected_result);

    // Test comparison gt
    var test_condition = k1.gt(k2);
    var expected_result = false;
    expect(test_condition).toStrictEqual(expected_result);

    // Test comparison lt false
    var test_condition = k2.lt(k1);
    var expected_result = false;
    expect(test_condition).toStrictEqual(expected_result);

    // Test comparison gt false
    var test_condition = k2.gt(k1);
    var expected_result = true;
    expect(test_condition).toStrictEqual(expected_result);

    // Test comparison eq true
    var test_condition = k2.eq(k1);
    var expected_result = false;
    expect(test_condition).toStrictEqual(expected_result);
    
    // Test comparison eq false
    var test_condition = k2.eq(k3);
    var expected_result = true;
    expect(test_condition).toStrictEqual(expected_result);
    
});




// Run the test
test('KrProperty Values', function () {

    var k = new KrProperty('name');
    

    var v1=k.setValue('value1');
    v1.c = 0.5;

    var v2=k.setValue('value2');
    v2.c = 0.3;
    
    // Test max
    var expected_result = 'value1';
    expect(k.propertyValue.value).toStrictEqual(expected_result);

    // test all
    var expected_result = 'value1';
    var results = k.values;
    expect(results).toStrictEqual(['value1']);

});



// Run the test
test('KrProperty Values @id', function () {

    var k = new KrProperty('@id');


    var v=k.setValue('aaa');
   

    var v=k.setValue('bbb');
    

    // Test max
    var expected_result = 'bbb';
    expect(k.value).toStrictEqual(expected_result);

    

});



     