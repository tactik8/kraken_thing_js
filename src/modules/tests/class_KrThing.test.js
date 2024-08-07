import {jest} from '@jest/globals';

jest.useFakeTimers();




import { KrThing } from '../class_KrThing.js';

import { KrAction } from '../class_KrAction.js';






// Run the test
test('KrThing init', function () {
   


    var t = new KrThing('Thing', 'abc123');

    expect(t.record_type).toStrictEqual('Thing');
    expect(t.record_id).toStrictEqual('abc123');
    
   
});


// Run the test
test('KrAction Attributes', function () {
  
    var t = new KrAction();

    t.object.name = 'bob';
    
    expect(t.object.name).toStrictEqual('bob');
    
});



// Run the test
test('KrThing action', function () {
   

    var object1 = new KrThing('Thing', 'object_1');

    var result1 = new KrThing('Thing', 'result_1');
    var result2 = new KrThing('Thing', 'result_2');

    var action = new KrAction(object1, [result1, result2]);
    action.record_id = 'id1';

    var expected_result = {};
    expect(action.object.record_type).toStrictEqual('Thing');


});


// api


