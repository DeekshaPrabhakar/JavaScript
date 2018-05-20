function ListNode(val) {
    this.val = val;
    this.next = null;
}

function RunLinkedListProblems(){
    
    // let node = new ListNode(1);
    // node.next = new ListNode(2);
    // node.next.next = new ListNode(3);
    // node.next.next.next = new ListNode(4);
    // node.next.next.next.next = new ListNode(5);
    // printLinkedList(node);
    // printLinkedList(reverseList(node));
    let node = new ListNode(1);
    node.next = new ListNode(2);
    node.next.next = new ListNode(4);
    node.next.next.next = new ListNode(6);
    node.next.next.next.next = new ListNode(7);

    let node2 = new ListNode(1);
    node2.next = new ListNode(3);
    node2.next.next = new ListNode(4);
    node2.next.next.next = new ListNode(5);
    node2.next.next.next.next = new ListNode(7);

    printLinkedList(mergeTwoLists(node, node2));

}

var printLinkedList = function(head){
    let node = head;
    let output = "";
    while(node != null){
        output += `${node.val} ->`;
        node = node.next;
    }
    console.log(output);
}

var hasCycle = function(head) {
    
};

var mergeTwoLists = function(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;

    while(l1 != null || l2 != null){
        if(l1 != null && l2 != null){
            if(l1.val <= l2.val){
                curr.next = l1;
                l1 = l1.next;
            }
            else{
                curr.next = l2;
                l2 = l2.next;
            }
        }
        else if(l1 != null){
            curr.next = l1;
            l1 = l1.next;
        }
        else if(l2 != null) {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    return dummy.next;
};

var deleteNode = function(node) {
    if(node == null){
        return;
    }
    node.val = node.next.val;
    node.next = node.next.next;
};

var reverseList = function(head) {
    let prev = null;
    let curr = head;
    let next = null;

    if(head == null || head.next == null){
        return head;
    }

    while(curr != null){        
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
};