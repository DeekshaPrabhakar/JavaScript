function Node(data) {
    this.data = data;
    this.children = [];
}

Node.prototype.push = function (data) {
    this.children.push(new Node(data));
}

Node.prototype.remove = function (data) {
    this.children = this.children.filter(el => {
        return el.data !== data;
    });
}

function Tree(){
    this.root = null;
}

Tree.prototype.traverseBF = function(fn){
    const arr = [this.root];

    while(arr.length){
        const node = arr.shift();//take out first element of array
        arr.push(...node.children);
        fn(node);
    }
}

Tree.prototype.traverseDF = function(fn){
    const arr = [this.root];

    while(arr.length){
        const node = arr.shift();//take out first element of array
        arr.unshift(...node.children);
        fn(node);
    }
}

function run(){

}


function levelWidth(node){
    var counters = [0];
    var startPointer = "s";
    var arr = [node, startPointer];
  

    while(arr.length){
        
    }




}