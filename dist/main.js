import {KrThing as $5OpyM$KrThing} from "krakenrecord";
import {KrakenSchemas as $5OpyM$KrakenSchemas, KrSamples as $5OpyM$KrSamples} from "krakenschema";
import {krakenHtml as $5OpyM$krakenHtml} from "krakenhtml";

//import { KrThing as KrThingRecord } from '../../node_modules/krakenrecordjs/kraken_record/kraken_record.js';


async function $689b3c5db7d7e242$export$203df0a267d8bdb2(apiBaseUrl, apiPath, headers, record_type, record_id) {
    const requestOptions = {
        method: "GET",
        headers: headers
    };
    let params = {
        "@type": record_type,
        "@id": record_id
    };
    let new_url = new URL(apiPath, apiBaseUrl);
    new_url.search = new URLSearchParams(params);
    const response = await fetch(new_url, requestOptions);
    let record = await response.json();
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
        //this.apiBaseUrl = 'https://5a37e52f-2a27-47ff-b754-2a573636cb5a-00-ayio2unothdd.spock.replit.dev'
        //this.apiBaseUrl = this.apiBaseUrl || 'https://5a37e52f-2a27-47ff-b754-2a573636cb5a-00-ayio2unothdd.spock.replit.dev';
        if (!this.apiBaseUrl) this.apiBaseUrl = this.apiBaseUrl || "https://data.krknapi.com";
        if (!this.apiPath) this.apiPath = this.apiPath || "/api/test7";
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
        this.basePath = null;
        this._urlOptions = {};
    }
    get html_form() {
    //return get_html_form(this.record_type);
    }
    get schema() {
        let schema = (0, $5OpyM$KrakenSchemas).get(this.record_type);
        schema.thing = this;
        return schema;
    }
    // -----------------------------------------------------
    //  Properties 
    // -----------------------------------------------------
    get actionStatus() {
        return this.getProperty("actionStatus").value;
    }
    set actionStatus(value) {
        return this.replaceProperty("actionStatus", null, value);
    }
    get endTime() {
        return this.getProperty("endTime").value;
    }
    set endTime(value) {
        return this.replaceProperty("endTime", null, value);
    }
    get error() {
        return this.getProperty("error").value;
    }
    set error(value) {
        return this.replaceProperty("error", null, value);
    }
    get familyName() {
        return this.getProperty("familyName").value;
    }
    set familyName(value) {
        return this.replaceProperty("familyName", null, value);
    }
    get givenName() {
        return this.getProperty("givenName").value;
    }
    set givenName(value) {
        return this.replaceProperty("givenName", null, value);
    }
    get name() {
        if (this.getProperty("name")) return this.getProperty("name").value;
        return null;
    }
    set name(value) {
        return this.replaceProperty("name", null, value);
    }
    get startTime() {
        return this.getProperty("startTime").value;
    }
    set startTime(value) {
        return this.replaceProperty("startTime", null, value);
    }
    get url() {
        return this.getProperty("url").value;
    }
    set url(value) {
        return this.replaceProperty("url", null, value);
    }
    get position() {
        return this.getProperty("position").value;
    }
    set position(value) {
        return this.replaceProperty("position", null, value);
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
        let records = [];
        records.push(this.getSystemRecord());
        for (let t of this.things)records.push(t.getSystemRecord());
        return await k.post(records);
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
    get headings() {
        return this.schema.headings;
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
    // -----------------------------------------------------
    //  HTML 
    // -----------------------------------------------------
    get urlOptions() {
        let options = this._urlOptions;
        options.basePath = this.basePath || this._urlOptions?.basePath;
        options.record_type = this.record_type;
        options.record_id = this.record_id;
        return options;
    }
    set urlOptions(value) {
        this._urlOptions = value;
    }
    get html() {
        return new (0, $5OpyM$krakenHtml).KrakenHtmlClass(this.record, this.urlOptions);
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
        if (item && item != null) {
            if (item?.["@type"] == "ListItem") this.record = item;
            else if (item?.["record_type"] == "ListItem") this.thing = item;
            else this.replaceProperty("item", null, item);
        }
    //if(!record_id){this.replaceProperty('@id', null, String(crypto.randomUUID()))}
    }
    get item() {
        if (this.getProperty("item")) return this.getProperty("item").value;
        return null;
    }
    set item(value) {
        this.replaceProperty("item", null, value);
    }
    get previousItem() {
        if (this.getProperty("previousItem")) return this.getProperty("previousItem")?.value || null;
        return null;
    }
    set previousItem(value) {
        //if(value && value.ref){ value = value.ref};
        this.replaceProperty("previousItem", null, value);
    }
    get nextItem() {
        if (this.getProperty("nextItem")) return this.getProperty("nextItem")?.value || null;
        return null;
    }
    set nextItem(value) {
        //if(value && value.ref){ value = value.ref};
        this.replaceProperty("nextItem", null, value);
    }
    get position() {
        if (this.getProperty("position")) return this.getProperty("position")?.value || null;
        return null;
    }
    set position(value) {
        this.replaceProperty("position", null, value);
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

    */ constructor(record_type = null, record_id = null){
        super(record_type, record_id);
        this.record_type = "ItemList";
        // Query attributes
        this._limit = null;
        this._offset = null;
        this._orderBy = null;
        this._orderDirection = null;
        this._query = null;
        this._basePath = null;
        this._urlOptions = {};
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
        // Sort values
        function compare(a, b) {
            if (a.position < b.position) return -1;
            if (a.position > b.position) return 1;
            return 0;
        }
        values.sort(compare);
        for (let value of values)this.add(value);
        return;
    }
    get record() {
        return super.record;
    }
    set record(value) {
        //super.record = value
        //return
        if (value.record_type) {
            // Handle thing
            let properties = value.properties;
            for(p in properties)if (p.propertyID != "itemListElement") this._properties.push(p);
            this.items = value.getProperty("itemListElement")?.values;
        } else {
            // Handle record
            for (let k of Object.keys(value))if (k != "itemListElement") this.replaceProperty(k, null, value[k]);
            this.items = value?.itemListElement;
        }
    }
    get itemThings() {
        let items = this.items;
        let results = [];
        for (let item of items)results.push(item.item);
        return results;
    }
    get itemRecords() {
        let items = this.items;
        let results = [];
        for (let item of items)results.push(item.item.record);
        return results;
    }
    get itemFullRecords() {
        let items = this.getProperty("itemListElement").values;
        let results = [];
        for (let item of items)results.push(item.item.fullRecord);
        return results;
    }
    get firstItem() {
        let items = this.getProperty("itemListElement").values;
        if (items.length == 0) return null;
        for (let item of items){
            if (!item.previousItem || item.previousItem == null) return item;
        }
        return null;
    }
    get lastItem() {
        let items = this.getProperty("itemListElement").values;
        if (items.length == 0) return null;
        for (let item of items){
            if (item.nextItem === undefined || item.nextItem == null) return item;
        }
        return null;
    }
    push(listItem) {
        return this.add(listItem);
    }
    add(listItem) {
        if (Array.isArray(listItem)) {
            for (let l of listItem)this.add(l);
            return;
        }
        if (!(listItem instanceof (0, $14fcc60f5820458e$export$f22625b8b2b04e84))) listItem = new (0, $14fcc60f5820458e$export$f22625b8b2b04e84)(listItem);
        let lastItem = this.lastItem;
        if (lastItem && lastItem != null) {
            listItem.position = lastItem.position + 1;
            listItem.previousItem = lastItem;
            listItem.nextItem = null;
            lastItem.nextItem = listItem;
        } else {
            listItem.position = 0;
            listItem.previousItem = null;
            listItem.nextItem = null;
        }
        // Add to list if not already in it.
        if (!this.get(listItem)) this.addProperty("itemListElement", listItem);
        return listItem;
    }
    reCalculatePosition() {
        var position;
        return;
    }
    // -----------------------------------------------------
    //  CRUD for items 
    // -----------------------------------------------------
    remove(itemRef) {
        var item = this.get(itemRef);
        if (!item) return null;
        var p1 = item.previousItem;
        var n = item.nextItem;
        // Ressign before and after links to one another
        if (p1) p1.nextItem = n;
        if (n) n.previousItem = p1;
        // Remove from list
        this.deleteProperty("itemListElement", item);
        // Sets position
        item.position = null;
        // Sets position
        let position = 0;
        if (n) {
            position = n.position - 1;
            n.position = position;
        }
        let nextItem = n?.nextItem;
        while(nextItem){
            nextItem.position = position + 1;
            position = position + 1;
            nextItem = nextItem.nextItem;
        }
        //this.reCalculatePosition()
        // Remove links
        item.previousItem = null;
        item.nextItem = null;
        return;
    }
    insertBefore(referenceItem, refItemtoInsert) {
        let item;
        // Convert to ListItem if not one already
        if (!(refItemtoInsert instanceof (0, $14fcc60f5820458e$export$f22625b8b2b04e84))) {
            refItemtoInsert = new (0, $14fcc60f5820458e$export$f22625b8b2b04e84)(refItemtoInsert);
            item = refItemtoInsert;
        } else item = this.get(refItemtoInsert.ref);
        // Retrieve latest ListItem record
        var n = this.get(referenceItem);
        var p1 = p1.previousItem;
        // Stop events
        this.blockEvents();
        if (item) item.blockEvents();
        if (p1) p1.blockEvents();
        if (n) n.blockEvents();
        // Remove previous links of items
        if (item.previousItem && item.previousItem != null || item.nextItem && item.nextItem != null) this.remove(item.ref);
        // Change allocation
        item.previousItem = p1;
        item.nextItem = n;
        if (p1) p1.nextItem = item;
        else p1.nextItem = null;
        if (n) n.previousItem = item;
        else n.previousItem = null;
        // Start events
        this.allowEvents();
        if (item) item.allowEvents();
        if (p1) p1.allowEvents();
        if (n) n.allowEvents();
        // Sets position
        let position = 0;
        if (p1) position = p1.position + 1;
        item.position = position;
        let nextItem = item.nextItem;
        while(nextItem){
            nextItem.position = position + 1;
            position = position + 1;
            nextItem = nextItem.nextItem;
        }
        //  Add to list
        let t = this.get(refItemtoInsert.ref);
        if (!t || t == null) this.addProperty("itemListElement", refItemtoInsert);
        return item;
    }
    insertAfter(referenceItem, refItemtoInsert) {
        /**
         * 
         */ let item;
        // Convert to ListItem if not one already
        if (!(refItemtoInsert instanceof (0, $14fcc60f5820458e$export$f22625b8b2b04e84))) {
            refItemtoInsert = new (0, $14fcc60f5820458e$export$f22625b8b2b04e84)(refItemtoInsert);
            item = refItemtoInsert;
        } else item = this.get(refItemtoInsert.ref);
        // Stop events
        this.blockEvents();
        if (item) item.blockEvents();
        if (p1) p1.blockEvents();
        if (n) n.blockEvents();
        // Remove previous links of items
        if (item.previousItem && item.previousItem != null || item.nextItem && item.nextItem != null) this.remove(item.ref);
        var p1 = this.get(referenceItem);
        var n = p1.nextItem;
        // Change allocation
        item.previousItem = p1;
        item.nextItem = n;
        if (p1) p1.nextItem = item;
        else p1.nextItem = null;
        if (n) n.previousItem = item;
        else n.previousItem = null;
        // Start events
        this.allowEvents();
        if (item) item.allowEvents();
        if (p1) p1.allowEvents();
        if (n) n.allowEvents();
        // Change position
        let position = 0;
        if (p1) position = p1.position + 1;
        item.position = position;
        let nextItem = item.nextItem;
        while(nextItem){
            nextItem.position = position + 1;
            position = position + 1;
            nextItem = nextItem.nextItem;
        }
        //  Add to list
        let t = this.get(refItemtoInsert.ref);
        if (!t || t == null) this.addProperty("itemListElement", refItemtoInsert);
        return item;
    }
    get(ref) {
        if (!ref) return null;
        if (ref && ref.ref) ref = ref.ref;
        if (!ref || !ref["@type"] || ref["@type"] == null) return null;
        if (ref["@type"] == "ListItem") return this.getByListItem(ref);
        else return this.getByItem(ref);
    }
    getByListItem(ref) {
        let items = this.getProperty("itemListElement").values;
        for (let item of items){
            if (item.record_type == ref["@type"] && item.record_id == ref["@id"]) return item;
        }
        return null;
    }
    getByItem(ref) {
        let items = this.getProperty("itemListElement").values;
        for (let item of items){
            if (item.item.record_type == ref["@type"] && item.item.record_id == ref["@id"]) return item;
        }
        return null;
    }
    // -----------------------------------------------------
    //  Query attributes 
    // -----------------------------------------------------
    get limit() {
        return this._limit;
    }
    set limit(value) {
        this._limit = value;
    }
    get offset() {
        return this._offset;
    }
    set offset(value) {
        this._offset = value;
    }
    get orderBy() {
        return this._orderBy;
    }
    set orderBy(value) {
        this._orderBy = value;
    }
    get orderDirection() {
        return this._orderDirection;
    }
    set orderDirection(value) {
        this._orderDirection = value;
    }
    get query() {
        return this._query;
    }
    set query(value) {
        this._query = value;
    }
    item;
    get basePath() {
        return this._basePath;
    }
    set basePath(value) {
        this._basePath = value;
    }
    get params() {
        let params = {};
        if (!this._params || this._params == null) return {};
        else params = this._params;
        let keys = [
            "limit",
            "offset",
            "orderBy",
            "orderDirection"
        ];
        for (let k of keys){
            let v = this[k];
            if (v && v != null) params[k] = v;
        }
        return params;
    }
    set params(value) {
        this._params = value;
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
    // -----------------------------------------------------
    //  HTML components 
    // -----------------------------------------------------
    get urlOptions() {
        let options = this._urlOptions;
        options.basePath = this.basePath || this._urlOptions?.basePath;
        if (this.params && Object.keys(this.params).length > 0) options.params = this.params;
        return options;
    }
    set urlOptions(value) {
        this._urlOptions = value;
    }
    get html() {
        return new (0, $5OpyM$krakenHtml).KrakenHtmlClass(this.itemRecords, this.urlOptions);
    }
}
function $347a3ff9d6941f10$var$ensureArray(value) {
    if (Array.isArray(value)) return value;
    else return [
        value
    ];
}




class $ec84f2905231493a$export$6104b3febb41c82d extends (0, $836e50e45781687c$export$3138a16edeb45799) {
    /**
     * 
     */ constructor(object, result, error){
        super("Action");
        if (object) this.object = object;
        if (result) this.result = result;
        if (error) {
            this.error = error;
            this.actionStatus = "failedActionStatus";
        }
        this.startTimer();
    }
    get object() {
        return this.getProperty("object").value;
    }
    set object(value) {
        this.setProperty("object", value);
    }
    get instrument() {
        return this.getProperty("instrument").value;
    }
    set instrument(value) {
        this.setProperty("instrument", value);
    }
    get result() {
        return this.getProperty("result").value;
    }
    set result(value) {
        this.setProperty("result", value);
        this.setCompleted();
    }
    get startTime() {
        return this.getProperty("startTime").value;
    }
    set startTime(value) {
        this.replaceProperty("startTime", null, value);
    }
    get endTime() {
        return this.getProperty("endTime").value;
    }
    set endTime(value) {
        this.setProperty("endTime", value);
    }
    get actionStatus() {
        return this.getProperty("actionStatus").value;
    }
    set actionStatus(value) {
        this.replaceProperty("actionStatus", null, value);
    }
    get error() {
        return this.getProperty("error").value;
    }
    set error(value) {
        this.setProperty("error", value);
    }
    // time shortcuts
    startTimer() {
        let date = new Date();
        this.startTime = date;
        this.actionStatus = "ActiveActionStatus";
    }
    stopTimer() {
        this.endTime = new Date();
    }
    duration() {
        let startTime = this.startTime;
        let endTime = this.endTime || new Date();
        if (startTime) return endTime - startTime;
        return undefined;
    }
    // Action Status shortcuts
    isSuccess() {
        return this.actionStatus == "CompletedActionStatus";
    }
    setCompleted() {
        this.actionStatus = "CompletedActionStatus";
        if (!this.startTime) this.startTimer();
        if (!this.endTime) this.stopTimer();
        this.error = undefined;
    }
    setFailed(errorMessage) {
        this.actionStatus = "FailedActionStatus";
        this.error = errorMessage;
    }
    // HTML shortcuts
    get htmlStatus() {
        if (this.isSuccess == true) return 200;
        else return 400;
    }
    get htmlContent() {
        if (!this.result || this.result == null) return null;
        if (Array.isArray(this.result)) return this.result.map((x)=>x.getSystemRecord(10));
        else if (this.result.record_type) return this.result.getSystemRecord(10);
        else return this.result;
    }
    // Text output
    get textContent() {
        let date = $ec84f2905231493a$var$convertToDate(this.startTime);
        if (date && date != null) date = date.toISOString().split("T")[0];
        let time = $ec84f2905231493a$var$convertToDate(this.startTime);
        if (time && time != null) time = time.toLocaleTimeString();
        let status = this.actionStatus;
        if (status && status != null) status = status.replace("ActionStatus", "").toUpperCase();
        let name = this.name;
        if (!name || name == null) name = "";
        let error = this.error;
        if (!error || error == null) error = "";
        let record_type = this.record_type;
        if (record_type && record_type != null) record_type = record_type.replace("Action", "");
        let content = `${date}, ${time} - ${status || ""} - ${record_type || ""} ${name || ""} ${error || ""}`;
        return content;
    }
}
function $ec84f2905231493a$var$convertToDate(value) {
    if (value instanceof Date && !isNaN(value)) return value;
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
    return null;
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



class $7812463799ce0094$export$f5bc5036afac6116 {
    /**
     * Cache to store things
     */ constructor(maxTime = null){
        this._db = {};
        this._maxTime = maxTime;
    }
    get(record_type, record_id) {
        if (!record_type || record_type == null) return null;
        if (!record_id || record_id == null) return null;
        return this._db?.[record_type]?.[record_id]?.["item"] || null;
    }
    add(thing) {
        return this.set(thing);
    }
    set(thing) {
        let record_type = thing.record_type;
        let record_id = thing.record_id;
        if (!record_type || record_type == null) return null;
        if (!record_id || record_id == null) return null;
        this._db[record_type] = this._db[record_type] || {};
        this._db[record_type][record_id] = this._db[record_type][record_id] || {};
        // Merge with current item if exists
        let currentElement = this._db[record_type][record_id]?.item;
        if (currentElement && currentElement.record_type) currentElement.merge(thing);
        else this._db[record_type][record_id].item = thing;
        this._db[record_type][record_id].date = Date();
    }
    post(thing) {
        return this.set(thing);
    }
    get things() {
        let things = [];
        for (let record_type of Object.keys(this._db))for (let record_id of Object.keys(this._db[record_type])){
            let thing = this.get(record_type, record_id);
            things.push(thing);
        }
        return things;
    }
}


//const API_URL = 'https://data.krknapi.com/api/test7'
const $60521b3a3298773d$var$API_URL = "https://2d432316-7c15-4f0f-9214-d4f6fba60627-00-1b1hmvrd8c12s.spock.replit.dev/api/test7";
class $60521b3a3298773d$export$45cddf157e5e52d5 {
    /**
     * Database to store things and access API
     *
     * Attributes:
     * - _api_url: the url for the api
     * - things: Lis tof all things in db cache local
     *
     * Methods:
     * - get: get thing from local cache
     * - set: set thing in local cache
     * - getFromApi: get from api
     * - postToApi: post to Api
     * - postAll: post all things to api
     * - refreshAll: refresh all things from api
     * 
     */ constructor(api_url = null){
        this._localCache = new (0, $7812463799ce0094$export$f5bc5036afac6116)();
        this._apiCache = new (0, $7812463799ce0094$export$f5bc5036afac6116)();
        this._api_url = api_url || $60521b3a3298773d$var$API_URL;
    }
    get things() {
        return this._localCache.things;
    }
    get(record_type, record_id) {
        /**
         * Returns thing from local cache.
         * If not present, creates one and calls api to refresh data
         */ let localThing = this._localCache.get(record_type, record_id);
        if (localThing && localThing != null) return localThing;
        else {
            let thing = new (0, $836e50e45781687c$export$3138a16edeb45799)(record_type, record_id);
            this._localCache.set(thing);
            this.getFromApi(record_type, record_id);
        }
    }
    set(thing) {
        this._localCache.set(thing);
        for (let t of thing.things){
            let localT = this._localCache.get(t.record_type, t.record_id);
            if (!localT || localT == null) this._localCache.set(t);
        }
    }
    async postAll() {
        /**
         * Posts all thing to API if they have changed
         */ let records = [];
        for (let t of this._localCache.things){
            console.log("t", t.record_type, t.record_id);
            if (this._testIsInSync(t.record_type, t.record_id) == false) records.push(t.getSystemRecord());
        }
        let result = await $60521b3a3298773d$var$postRecordToApi(this._api_url, records);
        return result;
    }
    async refreshAll() {
        /**
         * Retrieve latest value from api
         */ let results = [];
        for (let thing of this._apiCache.things){
            let result = await this.getFromApi(thing.record_type, thing.record_id);
            results.push(result);
        }
        return results;
    }
    _testIsInSync(record_type, record_id) {
        /**
         * Returns true if api cache is equal to local cache
         */ let local = this._localCache.get(record_type, record_id);
        let api = this._apiCache.get(record_type, record_id);
        let localRecord = JSON.stringify(local);
        let apiRecord = JSON.stringify(api);
        return localRecord == apiRecord;
    }
    async getFromApi(record_type, record_id) {
        /**
         * Updates local thing with value from API
         */ // Retrieve record from api
        let systemRecord = await $60521b3a3298773d$var$getRecordFromApi(this._api_url, record_type, record_id);
        if (!systemRecord || systemRecord == null) return;
        // Store api thing in cache
        let apiThing = new (0, $836e50e45781687c$export$3138a16edeb45799)();
        apiThing.setSystemRecord(systemRecord);
        this._apiCache.set(apiThing);
        // Retrieve corresponding thing from local cache
        let thing = this._localCache.get(record_type, record_id);
        // Create new thing if not exist
        if (!thing || thing == null) {
            thing = new (0, $836e50e45781687c$export$3138a16edeb45799)();
            this._localCache.set(thing);
        }
        // Load record to thing
        thing.setSystemRecord(systemRecord);
        return thing;
    }
    async postToApi(thing) {
        // Skip if already in sync
        if (this._testIsInSync(thing.record_type, thing.record_id)) return true;
        let result = await $60521b3a3298773d$var$postRecordToApi(this._api_url, thing.getSystemRecord());
        return result;
    }
}
async function $60521b3a3298773d$var$getRecordFromApi(api_url, record_type, record_id) {
    let url = `${api_url}?record_type=${record_type}&record_id=${record_id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let text = await response.text();
    let systemRecord = null;
    if (text) systemRecord = JSON.stringify(text);
    else return false;
    return systemRecord;
}
async function $60521b3a3298773d$var$postRecordToApi(api_url, record) {
    let url = api_url;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
    });
    let result = await response.json();
    return result;
}



var $cf838c15c8b009ba$export$3138a16edeb45799 = (0, $836e50e45781687c$export$3138a16edeb45799);
var $cf838c15c8b009ba$export$625c98c0044d29a6 = (0, $347a3ff9d6941f10$export$625c98c0044d29a6);
var $cf838c15c8b009ba$export$f22625b8b2b04e84 = (0, $14fcc60f5820458e$export$f22625b8b2b04e84);
var $cf838c15c8b009ba$export$6f5bc0f54215664f = (0, $2f5d4658e18a068e$export$6f5bc0f54215664f);
var $cf838c15c8b009ba$export$45cddf157e5e52d5 = (0, $60521b3a3298773d$export$45cddf157e5e52d5);
var $cf838c15c8b009ba$export$6104b3febb41c82d = (0, $ec84f2905231493a$export$6104b3febb41c82d);
var $cf838c15c8b009ba$export$f5bc5036afac6116 = (0, $7812463799ce0094$export$f5bc5036afac6116);


export {$cf838c15c8b009ba$export$3138a16edeb45799 as KrThing, $cf838c15c8b009ba$export$625c98c0044d29a6 as KrThings, $cf838c15c8b009ba$export$f22625b8b2b04e84 as KrListItem, $cf838c15c8b009ba$export$6f5bc0f54215664f as KrPropertyValueSpecification, $cf838c15c8b009ba$export$45cddf157e5e52d5 as KrDb, $cf838c15c8b009ba$export$6104b3febb41c82d as KrAction, $cf838c15c8b009ba$export$f5bc5036afac6116 as KrCache};
//# sourceMappingURL=main.js.map
