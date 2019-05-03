class Model {
  constructor() {
    this.id = null;
  }
}

export class Experiment {
  constructor({ 
    id, 
    name, 
    memo,
    score,
    config,
    createDate,
  }) {
    this.id = id;
    this.name = name;
    this.memo = memo;
    this.score = score;
    this.config = config;
    this.createDate = createDate;
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
