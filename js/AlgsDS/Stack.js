function Stack() {
    this.items = [];
}

Stack.prototype.push = function (el) {
    this.items.push(el);
}

Stack.prototype.pop = function () {
    if (this.items.length == 0) {
        throw Error("Pop Failed. Stack is empty");
    }
    return this.items.pop()
}

Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
}

Stack.prototype.size = function () {
    return this.items.length;
}