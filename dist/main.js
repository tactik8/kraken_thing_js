import {KrThing as $5OpyM$KrThing} from "krakenrecord";
import {KrakenSchemas as $5OpyM$KrakenSchemas, KrSamples as $5OpyM$KrSamples} from "krakenschema";

//import { KrThing as KrThingRecord } from '../../node_modules/krakenrecordjs/kraken_record/kraken_record.js';


async function $689b3c5db7d7e242$export$203df0a267d8bdb2(apiBaseUrl, apiPath, headers, record_type, record_id) {
    const requestOptions = {
        method: "GET",
        headers: headers
    };
    console.log("get", record_type, record_id);
    let params = {
        "@type": record_type,
        "@id": record_id
    };
    let new_url = new URL(apiPath, apiBaseUrl);
    new_url.search = new URLSearchParams(params);
    const response = await fetch(new_url, requestOptions);
    let record = await response.json();
    console.log(response.body);
    console.log("get", record);
    return record;
}
async function $689b3c5db7d7e242$export$ad21aaf36715c9e5(apiBaseUrl, apiPath, headers, record) {
    let requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(record)
    };
    let new_url = new URL(apiPath, apiBaseUrl);
    const response = await fetch(new_url, requestOptions);
    let result = await response.json();
    console.log("res", response.status);
    return result;
}


class $bb461f612cc69085$export$7a23a968115f49cd {
    constructor(apiBaseUrl = null, apiPath = null){
        this.apiBaseUrl = apiBaseUrl;
        this.apiPath = apiPath;
        this.headers = null;
        this.init_KrakenApi();
    }
    init_KrakenApi() {
        //this.apiBaseUrl = this.apiBaseUrl || 'https://5a37e52f-2a27-47ff-b754-2a573636cb5a-00-ayio2unothdd.spock.replit.dev';
        if (!this.apiBaseUrl) this.apiBaseUrl = this.apiBaseUrl || "https://data.krknapi.com";
        if (!this.apiPath) this.apiPath = this.apiPath || "/api/test_container";
        this.headers = this.headers || {
            "Content-Type": "application/json",
            "Authorization": "bob"
        };
    }
    get(record_type, record_id) {
        return (0, $689b3c5db7d7e242$export$203df0a267d8bdb2)(this.apiBaseUrl, this.apiPath, this.headers, record_type, record_id);
    }
    post(record) {
        return (0, $689b3c5db7d7e242$export$ad21aaf36715c9e5)(this.apiBaseUrl, this.apiPath, this.headers, record, this.headers);
    }
}


class $836e50e45781687c$export$3138a16edeb45799 extends (0, $5OpyM$KrThing) {
    /* Contains metadata to qualify a value

    attributes:
    - credibility or c:    
    - observationDate or d: 
    - record:         Returns all metadata in a dict
    - object:         The original source of the data
    - Instrument:     What brought the data over
    - schema:         Schema object for thing


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */ constructor(record_type = null, record_id = null){
        super(record_type, record_id);
    }
    get html_form() {
    //return get_html_form(this.record_type);
    }
    get schema() {
        return (0, $5OpyM$KrakenSchemas).get(this.record_type);
    }
    // -----------------------------------------------------
    //  Properties 
    // -----------------------------------------------------
    get actionStatus() {
        return this.getProperty("actionStatus").value;
    }
    set actionStatus(value) {
        return this.setProperty("actionStatus", value);
    }
    get endTime() {
        return this.getProperty("endTime").value;
    }
    set endTime(value) {
        return this.setProperty("endTime", value);
    }
    get error() {
        return this.getProperty("error").value;
    }
    set error(value) {
        return this.setProperty("error", value);
    }
    get familyName() {
        return this.getProperty("familyName").value;
    }
    set familyName(value) {
        return this.setProperty("familyName", value);
    }
    get givenName() {
        return this.getProperty("givenName").value;
    }
    set givenName(value) {
        return this.setProperty("givenName", value);
    }
    get name() {
        if (this.getProperty("name")) return this.getProperty("name").value;
        return null;
    }
    set name(value) {
        return this.setProperty("name", value);
    }
    get startTime() {
        return this.getProperty("startTime").value;
    }
    set startTime(value) {
        return this.setProperty("startTime", value);
    }
    get url() {
        return this.getProperty("url").value;
    }
    set url(value) {
        return this.setProperty("url", value);
    }
    // ----------------
    get agent() {
        var property = this.getProperty("agent");
        if (property) return property.value;
        return null;
    }
    set agent(value) {
        return this.setProperty("agent", value);
    }
    get instrument() {
        var property = this.getProperty("instrument");
        if (property) return property.value;
        return null;
    }
    set instrument(value) {
        return this.setProperty("instrument", value);
    }
    get object() {
        var property = this.getProperty("object");
        if (property) return property.value;
        return null;
    }
    set object(value) {
        return this.setProperty("object", value);
    }
    get result() {
        var result = this.getProperty("result");
        if (!result) {
            result = new $836e50e45781687c$export$3138a16edeb45799();
            this.setProperty("result", result);
        }
        return result;
    }
    set result(value) {
        return this.setProperty("result", value);
    }
    new(record_type, record_id) {
        //super.method();
        return new $836e50e45781687c$export$3138a16edeb45799(record_type, record_id);
    }
    // API
    async api_get() {
        let previousRecord = this.getSystemRecord();
        var k = new (0, $bb461f612cc69085$export$7a23a968115f49cd)();
        var fullRecord = await k.get(this.record_type, this.record_id);
        this.setSystemRecord(fullRecord);
        if (this.getSystemRecord() != previousRecord) {
            let eventRecord = {
                "@type": "updateAction",
                "@id": String(crypto.randomUUID()),
                "targetCollection": this.record_ref,
                "object": this.record,
                "actionStatus": "completedActionStatus",
                "timeStart": new Date(),
                "timeEnd": new Date()
            };
            const newEvent = new CustomEvent("kr-updateAction", {
                detail: eventRecord
            });
            this.dispatchEvent(newEvent);
        }
        return;
    }
    async api_post() {
        var k = new (0, $bb461f612cc69085$export$7a23a968115f49cd)();
        return await k.post(this.getSystemRecord());
    }
    // -----------------------------------------------------
    //  Headings  
    // -----------------------------------------------------
    get_sample(record_id) {
        let r = (0, $5OpyM$KrSamples)(this.record_type, record_id);
        return r;
    }
    set_sample(record_id) {
        this.setFullRecord((0, $5OpyM$KrSamples)(this.record_type, record_id));
    }
    get_heading1() {
        return this.schema.get_heading1(this.getBestRecord());
    }
    get_heading2() {
        return this.schema.get_heading2(this.getBestRecord());
    }
    get_headingText() {
        return this.schema.get_heading_text(this.getBestRecord());
    }
    get_headingImage() {
        return this.schema.get_heading_image(this.getBestRecord());
    }
}
function $836e50e45781687c$var$ensureArray(value) {
    if (Array.isArray(value)) return value;
    else return [
        value
    ];
}




class $14fcc60f5820458e$export$f22625b8b2b04e84 extends (0, $836e50e45781687c$export$3138a16edeb45799) {
    /* Contains metadata to qualify a value

    attributes:

    - Items:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */ constructor(item, record_id){
        super("ListItem", record_id);
        this.item = item;
        if (!record_id) this.setProperty("@id", String(crypto.randomUUID()));
    }
    get item() {
        if (this.getProperty("item")) return this.getProperty("item").value;
        return null;
    }
    set item(value) {
        this.setProperty("item", value);
    }
    get previousItem() {
        if (this.getProperty("previousItem")) return this.getProperty("previousItem")?.value || null;
        return null;
    }
    set previousItem(value) {
        //if(value && value.ref){ value = value.ref};
        this.setProperty("previousItem", value);
    }
    get nextItem() {
        if (this.getProperty("nextItem")) return this.getProperty("nextItem")?.value || null;
        return null;
    }
    set nextItem(value) {
        //if(value && value.ref){ value = value.ref};
        this.setProperty("nextItem", value);
    }
    get position() {
        if (this.getProperty("position")) return this.getProperty("position")?.value || null;
        return null;
    }
    set position(value) {
        this.setProperty("position", value);
    }
}


class $347a3ff9d6941f10$export$625c98c0044d29a6 extends (0, $836e50e45781687c$export$3138a16edeb45799) {
    /* Contains metadata to qualify a value

    attributes:
    
    - Items:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */ constructor(record_id = null){
        super("ItemList", record_id);
    }
    get items() {
        let results = [];
        let t = this.firstItem;
        while(t && t != null){
            results.push(t);
            t = t.nextItem;
        }
        return results;
    }
    set items(values) {
        values = $347a3ff9d6941f10$var$ensureArray(values);
        for(let value in values)this.add(value);
        return;
    }
    get record() {
        return super.record;
    }
    set record(value) {
        if (value.record_type) {
            // Handle thing
            let properties = value.properties;
            for(p in properties)if (p.propertyID != "itemListElement") this._properties.push(p);
            this.items = value.getProperty("itemListElement")?.values;
        } else {
            // Handle record
            for (let k of Object.keys(value))if (k != "itemListElement") this.addProperty(k, value[k]);
            this.items = value?.itemListElement;
        }
    }
    get itemRecords() {
        let items = this.getProperty("listItemElement").values;
        let results = [];
        for (let item of items)results.push(item.item.record);
        return results;
    }
    get itemFullRecords() {
        let items = this.getProperty("listItemElement").values;
        let results = [];
        for (let item of items)results.push(item.item.fullRecord);
        return results;
    }
    get firstItem() {
        let items = this.getProperty("listItemElement").values;
        if (items.length == 0) return null;
        for (let item of items){
            if (!item.previousItem || item.previousItem == null) return item;
        }
        return null;
    }
    get lastItem() {
        let items = this.getProperty("listItemElement").values;
        if (items.length == 0) return null;
        for (let item of items){
            if (item.nextItem === undefined || item.nextItem == null) return item;
        }
        return null;
    }
    add(listItem, itemId) {
        if (Array.isArray(listItem)) {
            for (let l of listItem)this.add(l);
            return;
        }
        if (!(listItem instanceof (0, $14fcc60f5820458e$export$f22625b8b2b04e84))) listItem = new (0, $14fcc60f5820458e$export$f22625b8b2b04e84)(listItem, itemId);
        let lastItem = this.lastItem;
        if (lastItem) {
            listItem.position = lastItem.position + 1;
            listItem.previousItem = lastItem;
            lastItem.nextItem = listItem;
        } else listItem.position = 0;
        // Add to list if not already in it.
        if (!this.get(listItem)) this.addProperty("listItemElement", listItem);
        return listItem;
    }
    reCalculatePosition() {
        let t = this.firstItem;
        var position = 0;
        while(t){
            t.position = position;
            position = position + 1;
            t = t.nextItem;
        }
    }
    // -----------------------------------------------------
    //  CRUD for items 
    // -----------------------------------------------------
    remove(itemRef) {
        var item = this.get(itemRef);
        if (!item) return null;
        var p1 = item.previousItem;
        var n = item.nextItem;
        console.log("item", p1, n);
        // Ressign before and after links to one another
        if (p1) p1.nextItem = n;
        if (n) n.previousItem = p1;
        // Remove from list
        this.deleteProperty("listItemElement", item);
        // Sets position
        item.position = null;
        this.reCalculatePosition();
        // Remove links
        item.previousItem = null;
        item.nextItem = null;
        return;
    }
    insertBefore(ref, itemRef) {
        var p1 = null;
        var item = this.get(itemRef);
        if (!item) return null;
        var n = this.get(ref);
        if (n) var p1 = n.previousItem;
        item.previousItem = p1;
        item.nextItem = n;
        if (p1) p1.nextItem = item;
        if (n) n.previousItem = item;
        // Sets position
        this.reCalculatePosition();
        // Add to list if not already in it.
        if (!this.get(item.ref)) this.addProperty("listItemElement", item);
        return;
    }
    insertAfter(ref, itemRef) {
        // Retrieve all elements
        var item = this.get(itemRef);
        var p1 = item.previousItem;
        var n = null;
        if (p1) n = p1.nextItem;
        // Change allocation
        item.previousItem = p1;
        item.nextItem = n;
        if (p1) p1.nextItem = item;
        if (n) n.previousItem = item;
        // Sets position
        this.reCalculatePosition();
        // Add to list if not already in it.
        if (!this.get(item.ref)) this.addProperty("listItemElement", item);
        return;
    }
    get(ref) {
        if (!ref) return null;
        if (ref && ref.ref) ref = ref.ref;
        if (!ref || !ref["@type"]) return null;
        if (ref["@type"] == "listItem") return this.getByListItem(ref);
        else return this.getByItem(ref);
    }
    getByListItem(ref) {
        let items = this.getProperty("listItemElement").values;
        for (let item of items){
            if (item.record_type == ref["@type"] && item.record_id == ref["@id"]) return item;
        }
        return null;
    }
    getByItem(ref) {
        let items = this.getProperty("listItemElement").values;
        for (let item of items){
            if (item.item.record_type == ref["@type"] && item.item.record_id == ref["@id"]) return item;
        }
        return null;
    }
    // -----------------------------------------------------
    //  Filters 
    // -----------------------------------------------------
    filter(propertyValueSpecifications) {
        /**
         * Returns new Things with filtered items
         */ let newThings = new $347a3ff9d6941f10$export$625c98c0044d29a6();
        for (let item of this.items){
            let result = propertyValueSpecifications.map((pvs)=>pvs.test(item.item));
            if (result.every(Boolean) == true) newThings.add(item.item);
        }
        return newThings;
    }
}
function $347a3ff9d6941f10$var$ensureArray(value) {
    if (Array.isArray(value)) return value;
    else return [
        value
    ];
}




class $ec84f2905231493a$export$6104b3febb41c82d extends (0, $836e50e45781687c$export$3138a16edeb45799) {
    /* Contains metadata to qualify a value

    attributes:
    - credibility or c:    
    - observationDate or d: 
    - record:         Returns all metadata in a dict
    - object:         The original source of the data
    - Instrument:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */ constructor(object, result, error){
        super("Action", null);
        this.actionStatus = "completedActionStatus";
        this.startTime = new Date();
        this.endTime = new Date();
        if (object) this.setProperty("object", object);
        if (result) this.setProperty("result", result);
        if (!this.object) this.setProperty("object", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.instrument) this.setProperty("instrument", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.agent) this.setProperty("agent", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.result) this.setProperty("result", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (error) {
            this.error = error;
            this.actionStatus = "failedActionStatus";
        }
    }
}




class $2f5d4658e18a068e$export$6f5bc0f54215664f extends (0, $836e50e45781687c$export$3138a16edeb45799) {
    /* Contains metadata to qualify a value

    attributes:
    - credibility or c:    
    - observationDate or d: 
    - record:         Returns all metadata in a dict
    - object:         The original source of the data
    - Instrument:     What brought the data over


    Methods
    - equal:     Returns true if comes from same object
    - lt:        Worst metadata in order of c and d
    - gt:        Best metadata in order of c and d

    */ constructor(object, result, error){
        super("Action", null);
        this.actionStatus = "completedActionStatus";
        this.startTime = new Date();
        this.endTime = new Date();
        if (object) this.setProperty("object", object);
        if (result) this.setProperty("result", result);
        if (!this.object) this.setProperty("object", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.instrument) this.setProperty("instrument", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.agent) this.setProperty("agent", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (!this.result) this.setProperty("result", new (0, $836e50e45781687c$export$3138a16edeb45799)());
        if (error) {
            this.error = error;
            this.actionStatus = "failedActionStatus";
        }
    }
    // -----------------------------------------------------
    //  Methods 
    // -----------------------------------------------------
    test(thing) {
        /**
         * Test if a given thing meets the condition 
         */ let propertyID = this.propertyID;
        let value = thing.getProperty(propertyID).value;
        // Test min / max value
        if (this.minValue) {
            if (value < this.minValue) return false;
        }
        if (this.maxValue) {
            if (value > this.maxValue) return false;
        }
        // Test valueRequired
        if (this.valueRequired == true && (value === undefined || value === null)) return false;
        // Test valuePattern
        if (this.valuePattern) {
            const re = new RegExp(this.valuePattern);
            const result = re.test(value);
            if (result == false) return false;
        }
        // Default
        return true;
    }
    // -----------------------------------------------------
    //  Helpers to build conditions 
    // -----------------------------------------------------
    setEqualTo(value) {
        if (typeof value != "string") {
            this.minValue = value;
            this.maxValue = value;
        } else this.valuePattern = `^${value}$`;
    }
    setContains(value) {
        this.valuePattern = `${value}`;
    }
    setContainsWord(value) {
        this.valuePattern = `\\b${value}\\b`;
    }
    setStartsWith(value) {
        this.valuePattern = `^${value}`;
    }
    setEndsWith(value) {
        this.valuePattern = `${value}$`;
    }
    setGE(value) {
        this.minValue = value;
    }
    setLE(value) {
        this.maxValue = value;
    }
    // -----------------------------------------------------
    // ---------------- Specific properties ----------------
    // -----------------------------------------------------
    get defaultValue() {
        return this.getProperty("defaultValue").value;
    }
    set defaultValue(value) {
        this.setProperty("defaultValue", value);
    }
    get maxValue() {
        return this.getProperty("maxValue").value;
    }
    set maxValue(value) {
        this.setProperty("maxValue", value);
    }
    get minValue() {
        return this.getProperty("minValue").value;
    }
    set minValue(value) {
        this.setProperty("minValue", value);
    }
    get multipleValues() {
        return this.getProperty("multipleValues").value;
    }
    set multipleValues(value) {
        this.setProperty("multipleValues", value);
    }
    get readonlyValue() {
        return this.getProperty("readonlyValue").value;
    }
    set readonlyValue(value) {
        this.setProperty("readonlyValue", value);
    }
    get stepValue() {
        return this.getProperty("stepValue").value;
    }
    set stepValue(value) {
        this.setProperty("stepValue", value);
    }
    get valueMaxLength() {
        return this.getProperty("valueMaxLength").value;
    }
    set valueMaxLength(value) {
        this.setProperty("valueMaxLength", value);
    }
    get valueMinLength() {
        return this.getProperty("valueMinLength").value;
    }
    set valueMinLength(value) {
        this.setProperty("valueMinLength", value);
    }
    get valueName() {
        return this.getProperty("valueName").value;
    }
    set valueName(value) {
        this.setProperty("valueName", value);
    }
    get valuePattern() {
        return this.getProperty("valuePattern").value;
    }
    set valuePattern(value) {
        this.setProperty("valuePattern", value);
    }
    get valueRequired() {
        return this.getProperty("valueRequired").value;
    }
    set valueRequired(value) {
        this.setProperty("valueRequired", value);
    }
    get propertyID() {
        return this.getProperty("propertyID").value;
    }
    set propertyID(value) {
        this.setProperty("propertyID", value);
    }
}


var $cf838c15c8b009ba$export$3138a16edeb45799 = (0, $836e50e45781687c$export$3138a16edeb45799);
var $cf838c15c8b009ba$export$625c98c0044d29a6 = (0, $347a3ff9d6941f10$export$625c98c0044d29a6);
var $cf838c15c8b009ba$export$f22625b8b2b04e84 = (0, $14fcc60f5820458e$export$f22625b8b2b04e84);
var $cf838c15c8b009ba$export$6f5bc0f54215664f = (0, $2f5d4658e18a068e$export$6f5bc0f54215664f);


export {$cf838c15c8b009ba$export$3138a16edeb45799 as KrThing, $cf838c15c8b009ba$export$625c98c0044d29a6 as KrThings, $cf838c15c8b009ba$export$f22625b8b2b04e84 as KrListItem, $cf838c15c8b009ba$export$6f5bc0f54215664f as KrPropertyValueSpecification};
//# sourceMappingURL=main.js.map
