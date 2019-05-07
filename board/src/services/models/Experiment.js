export default class Experiment {
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

