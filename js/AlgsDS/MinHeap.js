function MinHeap(){
    //root is smaller
    this.items = [];
    this.size = 0;
    //left and right child = 2*i and 2*i+1
    //parent = i/2
}

MinHeap.prototype.peek = function(){
   if(this.size == 0){
    throw Error("Failed");
   }
   return this.items[0];
}

MinHeap.prototype.poll = function(){
    //return min element copy last to first and then shrink size and heapify down
    if(this.size == 0){
        throw Error("Failed");
       }

       let item = this.items[0];
       this.items[0] = this.items[this.size - 1];
       this.size--;
       heapifyDown();
       return item;
}

MinHeap.prototype.add = function(item){
    //insert at end and bubble up
    this.items[this.size] = item;
    this.size++;
    heapifyUp();
}


MinHeap.prototype.heapifyUp = function(){
    //added at last and moves up
    let index = this.size -1;
    while(this.hasParent(index) && this.parent(index) > this.items[index]){
        swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
    }

}

MinHeap.prototype.heapifyDown = function(){
    //first elem is copied so bubble down
    let index = 0;
    while(this.hasLeftChild(index)){//check only left coz if left is not there right wont be there
        let smallerChildIndex = this.getLeftChildIndex(index);

        if(this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)){
            smallerChildIndex = this.getRightChildIndex(index);
        }

        if(this.items[index] < this.items[smallerChildIndex]){
            break;//i am in order
        }
        else{
            this.swap(index, smallerChildIndex);
        }
        index = smallerChildIndex;
    }

}

MinHeap.prototype.getLeftChildIndex = function(parentIndex){
    return 2 * parentIndex + 1;
}

MinHeap.prototype.getRightChildIndex = function(parentIndex){
    return 2 * parentIndex + 2;
}

MinHeap.prototype.getParentIndex = function(childIndex){
    return (childIndex - 1)/2;
}

MinHeap.prototype.hasLeftChild = function(index){
    return this.getLeftChildIndex(index) < this.size;
}

MinHeap.prototype.hasRightChild = function(index){
    return this.getRightChildIndex(index) < this.size;
}

MinHeap.prototype.hasParent = function(index){
    return this.getParentIndex(index) >= 0;
}

MinHeap.prototype.leftChild = function(index){
    return this.items[this.getLeftChildIndex(index)];
}

MinHeap.prototype.rightChild = function(index){
    return this.items[this.getRightChildIndex(index)];
}

MinHeap.prototype.parent = function(index){
    return this.items[this.getParentIndex(index)];
}

MinHeap.prototype.swap = function(indexOne, indexTwo){
    let temp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = temp;
}

