
class Stack {
    constructor() {
        this.first = null;
        this.length = 0;
    }

    store(value) {
        this.first = {"value": value, "next": this.first};
        this.length++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        } else {
            let temp = this.first;
            this.first = this.first.next;
            this.length--;
            return temp.value;
        }
    }
    isEmpty() {
        return this.length === 0;
    }
}

export default Stack;