import Stack from './stack.js';

class PriorityStack extends Stack {
    constructor(compareFunction) {
        super();
        this.compareFunction = compareFunction;
    }

    store(value) {
        let newNode = {"value": value, "next": null};
        if (this.isEmpty()) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let current = this.first;
            let previous = null;
            while (current != null && this.compareFunction(value, current.value)) {
                previous = current;
                current = current.next;
            }
            if (previous == null) {
                newNode.next = this.first;
                this.first = newNode;
            } else {
                newNode.next = current;
                previous.next = newNode;
            }
            if (current == null) {
                this.last = newNode;
            }
        }
        this.length++;
    }
}

export default PriorityStack;