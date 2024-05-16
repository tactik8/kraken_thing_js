
import { KrThing as KrThingRecord } from 'https://tactik8.github.io/krakenJsLibraryRecord/kraken_record/kraken_record.js';
import { KrThings } from '../class_KrThings.js';
import { KrThing } from '../class_KrThing.js';

import { KrAction } from '../class_KrAction.js';






// Run the test
test('KrThing init', function () {



    var t = new KrThings();


    let k1 = new KrThing('Thing', 'id1');
    let k2 = new KrThing('Thing', 'id2');
    let k3 = new KrThing('Thing', 'id3');
    let k4 = new KrThing('Thing', 'id4');

    var i1 = t.add(k1, 'id1');
    var i2 = t.add(k2, 'id2');
    var i3 = t.add(k3, 'id3');
    var i4 = t.add(k4, 'id4');

    var last = t.lastItem;


    
    expect(last.position).toStrictEqual(3);

    expect(i1.nextItem.ref).toStrictEqual(i2.ref);
    expect(i2.nextItem.ref).toStrictEqual(i3.ref);
    expect(i3.nextItem.ref).toStrictEqual(i4.ref);
    expect(i4.nextItem).toStrictEqual(null);

    expect(i1.previousItem).toStrictEqual(null);
    expect(i2.previousItem.ref).toStrictEqual(i1.ref);
    expect(i3.previousItem.ref).toStrictEqual(i2.ref);
    expect(i4.previousItem.ref).toStrictEqual(i3.ref);


    
    //
    t.remove(k2.ref);
    expect(i1.nextItem.ref).toStrictEqual(i3.ref);
    expect(i2.nextItem).toStrictEqual(null);
    expect(i3.nextItem.ref).toStrictEqual(i4.ref);
    expect(i4.nextItem).toStrictEqual(null);

    

    expect(t.items.length).toStrictEqual(3);

    expect()
    
   
});
