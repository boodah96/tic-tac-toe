'use strict';

class Data{
    constructor(model){
        this.model=model;
    }

    creat(obj){
        const user= new this.model(obj);
        user.save();
    }

    read(id){
        if(id){
            return this.model.findOne({_id:id});
        }else{
            return this.model.findOne({});
        }
    }

    update(id,obj){
        return this.model.findByIdAndUpdate(id,obj,{new:true});
    }
}

module.exports=Data;