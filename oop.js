class Greeting {
    constructor() {
        this.hello = 'Hello';
    }

    hi(name) {
        return this.hello + ' ' + name;
    }  
}

var greet = new Greeting();
console.log(greet.hi('Jack'))