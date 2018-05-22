function RunBinaryTreeProblems() {
    //    let treeNode = new TreeNode(3);
    //    treeNode.left = new TreeNode(9);
    //    treeNode.right = new TreeNode(20);
    //    treeNode.right.left = new TreeNode(15);
    //    treeNode.right.right = new TreeNode(7);
    //console.log(maxDepth(treeNode));
    let treeNode = new TreeNode(1);
    treeNode.left = new TreeNode(2);
    treeNode.right = new TreeNode(3);
    treeNode.left.left = new TreeNode(4);
    treeNode.left.right = new TreeNode(5);
    console.log(inorderTraversalRecursive(treeNode));
    console.log(preorderTraversalRecursive(treeNode));
    console.log(postorderTraversalRecursive(treeNode));
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
 

var inorderTraversalRecursive = function (root) {
    //left - root - right
    var arr = new Array();
    inOrderTraversalHelperRecursive(root, arr);
    return arr;
};

function inOrderTraversalHelperRecursive(node, arr) {
    if (node == null) {
        return
    }
    else {
        inOrderTraversalHelperRecursive(node.left, arr);
        arr.push(node.val);
        inOrderTraversalHelperRecursive(node.right, arr);
    }
};

var preorderTraversalRecursive = function (root) {
    // - root - left - right
    var arr = new Array();
    preOrderTraversalHelperRecursive(root, arr);
    return arr;
};

function preOrderTraversalHelperRecursive(node, arr) {
    if (node == null) {
        return
    }
    else {
        arr.push(node.val);
        preOrderTraversalHelperRecursive(node.left, arr);
        preOrderTraversalHelperRecursive(node.right, arr);
    }
};

var postorderTraversalRecursive = function (root) {
    //  - left - right - root
    var arr = new Array();
    postOrderTraversalHelperRecursive(root, arr);
    return arr;
};

function postOrderTraversalHelperRecursive(node, arr) {
    if (node == null) {
        return
    }
    else {
        postOrderTraversalHelperRecursive(node.left, arr);
        postOrderTraversalHelperRecursive(node.right, arr);
        arr.push(node.val);
    }
};

var maxDepth = function (root) {
    return maxDepthHelper(root);
};

var maxDepthHelper = function (node) {
    //base case
    if (node == null) {
        return 0;
    }
    else {
        let leftDepth = maxDepthHelper(node.left);
        let rightDepth = maxDepthHelper(node.right);

        if (leftDepth > rightDepth) {
            return leftDepth + 1;
        }
        else {
            return rightDepth + 1;
        }
    }
};

