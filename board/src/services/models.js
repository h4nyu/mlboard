import _ from 'lodash';

class Model {
  constructor(){
    this.id = null;
  }
}

export class Experiment {
  constructor({id, tag, config}){
    this.id = id;
    this.tag = tag;
    this.config = config;
  }
}



export class Trace extends Model {
  fromRes(obj) {
    this.value = obj.value;
    this.ts = obj.ts;
    this.infoId = obj.info_id;
    this.infoType = obj.info_type;
    return this;
  }
}
