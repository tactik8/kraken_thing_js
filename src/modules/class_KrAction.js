


import {KrThing } from './class_KrThing.js';

export class KrAction extends KrThing {
    /**
     * 
     */


    constructor(object, result, error) {
        super('Action');

        if(object){this.object = object}
        if(result){this.result = result}      
        
        if(error){
            this.error = error;
            this.actionStatus = 'failedActionStatus';
        }        

        this.startTimer()
    }

    get object(){
        let object = this.getProperty('object').value
        if(!object){
            this.setProperty('object', this.new('Thing'))
        }
        return this.getProperty('object').value
    }

    set object(value){
        this.setProperty('object', value)
    }

    get instrument(){
        return this.getProperty('instrument').value
    }

    set instrument(value){
        this.setProperty('instrument', value)
    }

    get result(){
        return this.getProperty('result').value
    }

    set result(value){
        this.setProperty('result', value)
        this.setCompleted()
    }

    get startTime(){
        return this.getProperty('startTime').value
    }

    set startTime(value){
        this.replaceProperty('startTime', null, value)
    }

    get endTime(){
        return this.getProperty('endTime').value
    }

    set endTime(value){
        this.setProperty('endTime', value)
    }

    get actionStatus(){
        return this.getProperty('actionStatus').value
    }

    set actionStatus(value){
        this.replaceProperty('actionStatus', null, value)
    }

    get error(){
        return this.getProperty('error').value
    }

    set error(value){
        this.setProperty('error', value)
    }


    // time shortcuts
    startTimer(){

        let date = new Date()
        this.startTime = date
        this.actionStatus = 'ActiveActionStatus'
    }

    stopTimer(){
        this.endTime = new Date()
    }

    duration(){
        let startTime = this.startTime
        let endTime = this.endTime || new Date()

        if(startTime){
            return endTime - startTime
        }
        return undefined
    }


    // Action Status shortcuts

    isSuccess(){
        return this.actionStatus == "CompletedActionStatus"
    }

    setCompleted(){
        this.actionStatus = "CompletedActionStatus"
        if(!this.startTime){ this.startTimer() }
        if(!this.endTime){ this.stopTimer() }
        this.error = undefined
    }

    setFailed(errorMessage){
        this.actionStatus = "FailedActionStatus"
        this.error = errorMessage
    }

    // HTML shortcuts

    get htmlStatus(){
        if(this.isSuccess == true){
            return 200
        } else {
            return 400
        }
    }
    
    get htmlContent(){
        if(!this.result || this.result== null) { return null }
        if(Array.isArray(this.result)){
            return this.result.map(x=> x.getSystemRecord(10))
        } else if (this.result.record_type){
            return this.result.getSystemRecord(10)
        } else {
            return this.result
        }
    }

    // Text output
    get textContent(){

        let date = convertToDate(this.startTime)
        if(date && date != null){ date = date.toISOString().split('T')[0]}
        
        let time = convertToDate(this.startTime)
        if(time && time != null){ time = time.toLocaleTimeString()}

        let status = this.actionStatus
        if(status && status != null){ status = status.replace('ActionStatus', '').toUpperCase()}

        let name = this.name
        if(!name || name == null){ name = ''}

        let error = this.error
        if(!error || error == null){ error = ''}

        let record_type = this.record_type
        if(record_type && record_type != null){ record_type = record_type.replace('Action', '')}
          
        let content = `${date}, ${time} - ${status || ''} - ${record_type || ''} ${name || ''} ${error || ''}`
        return content
    }

    
}



function convertToDate(value) {
    if (value instanceof Date && !isNaN(value)) {
        return value;
    }

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return date;
    }

    return null;
}