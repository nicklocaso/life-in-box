"use strict";

const genLen = 16;

class Genoma {
  constructor(value) {
    this._value = value || [Genoma.generate(genLen), Genoma.generate(genLen)];
  }

  static generate(len) {
    let result = [];
    while (result.length < len) {
      result = [...result, getRandomInt(0, 1)];
    }
    return result;
  }

  static mate(a, b) {
    if (a.getSex() !== b.getSex()) {
      let crossover = 5;
      let aGenoma = a.getValue();
      let bGenoma = b.getValue();
      for (let i = crossover - 1; i < genLen; i++) {
        let _a = aGenoma[i];
        aGenoma[i] = bGenoma[i];
        bGenoma[i] = _a;
      }
      let mutate = getRandomInt(0, genLen - 1);
      aGenoma[mutate] = aGenoma[mutate] === 1 ? 0 : 1;
      mutate = getRandomInt(0, genLen - 1);
      bGenoma[mutate] = bGenoma[mutate] === 1 ? 0 : 1;
      return new Genoma(
        getRandomInt(0, 1) === 0 ? [aGenoma, bGenoma] : [bGenoma, aGenoma]
      );
    }
  }

  getValue() {
    // The first bit decide sex
    return this._value[this.getSex()];
  }

  getSex() {
    // 0 - Female, 1 - Male
    return this._value[0][0];
  }

  getSize() {
    // TODO: Verificare se è necessario unire più elementi
    let me = this.getValue();
    return parseInt(me.slice(6, 10).join(""), 2);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

const a = new Genoma();
console.log(`A is ${a.getSex()}:`, a.getValue());
console.log(a.getSize());

const b = new Genoma();
console.log(`B is ${b.getSex()}`, b.getValue());
console.log(b.getSize());

const c = Genoma.mate(a, b);
console.log(`C is ${c.getSex()}`, c.getValue());
console.log(c.getSize());

const e = Genoma.mate(a, b);
console.log(`E is ${e.getSex()}`, e.getValue());
console.log(e.getSize());

const f = Genoma.mate(a, b);
console.log(`F is ${f.getSex()}`, f.getValue());
console.log(f.getSize());