
class Queue {
    constructor() {
        this.first = null;
        this.last = this.first;
        this.length = 0;
    }

    enqueue(value) {
        let newNode = {"value": value, "next": null};
        if (this.isEmpty()) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        } else {
            let temp = this.first;
            this.first = this.first.next;
            this.length--;
            if (this.isEmpty()) {
                this.last = null;
            }
            return temp.value;
        }
    }

    isEmpty() {
        return this.length === 0;
    }
}
export default Queue;