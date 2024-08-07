

import { KrThings } from '../class_KrThings.js';
import { KrThing } from '../class_KrThing.js';




// Run the test
test('KrThings init', function () {


    var t = new KrThings()

    let k0 = new KrThing('Thing', 'id0')
    let k1 = new KrThing('Thing', 'id1')
    let k2 = new KrThing('Thing', 'id2')
    let k3 = new KrThing('Thing', 'id3')
    let k4 = new KrThing('Thing', 'id4')

    t.add(k0)
    t.add(k1)
    t.add(k2)
    t.add(k3)
    t.add(k4)

    var lastItem = t.lastItem
    
    expect(lastItem.position).toStrictEqual(4);

   
    
   
});