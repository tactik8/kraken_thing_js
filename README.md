# kraken_thing

Main library for thing that includes all sub libraries
- kraken_schema
- kraken_html
- kraken_record
- kraken_data
- kraken_api
- kraken_db

## Running tests
node --experimental-vm-modules node_modules/.bin/jest


## How to use

```

import { KrThing } from 'https://cdn.jsdelivr.net/gh/tactik8/kraken_thing_js@main/kraken_thing/kraken_thing.js';

let t = new KrThing();


```


## Key concepts

### Thing 


### Monitor changes (addEventListener)

eventType: 
- all (all events)
- add
- delete
- replace

```

thing.addEventListener(eventType, callbackFn)


```


### Conditions: propertyValueSpecification

#### Filter

```

// Initialize new things
let things = new KrThings()

// Populate with 3 thing objects

let thing1 = new KrThing();
thing1.setProperty('name', 'bob1s')
var i = things.add(thing1, 'id1')

let thing2 = new KrThing();
thing2.setProperty('name', 'bob2s')
var i = things.add(thing2, 'id2')

let thing3 = new KrThing();
thing3.setProperty('name', 'bob3s')
var i = things.add(thing3, 'id3')

// Initialize KrPropertyValueSpecification
let t = new KrPropertyValueSpecification();
t.propertyID = 'name'
t.setEndsWith('3s')

// Filter (gives a new things object)
let thingsFiltered = things.filter([t])

console.log(thingsFiltered.items.length)

```
