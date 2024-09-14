class Node {
  constructor(data) {
    this.value = data;
    this.right = null;
    this.left = null;
  }
}
class Tree {
  constructor(array) {
    sortAndRemoveDuplicates(array);
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let midElement = Math.floor((start + end) / 2);
    let root = new Node(array[midElement]);
    root.left = this.buildTree(array, start, midElement - 1);
    root.right = this.buildTree(array, midElement + 1, end);
    return root;
  }
  find(value, root) {
    while (root) {
      if (value > root.value && root.right) {
        root = root.right;
        return this.find(value, root);
      } else if (value < root.value && root.left) {
        root = root.left;
        return this.find(value, root);
      } else if (value === root.value) {
        return root;
      } else {
        return "Value doesn't exist";
      }
    }
  }
  insert(value, root) {
    let rootDeeper;
    let direction = "";
    if (root.value < value) {
      rootDeeper = root.right;
      direction = "right";
    } else if (root.value > value) {
      rootDeeper = root.left;
      direction = "left";
    } else {
      return;
    }
    /* Base Case */
    if (rootDeeper == null) {
      root[direction] = new Node(value);
      return;
    }
    this.insert(value, rootDeeper);
    return;
  }
  deleteItem(value, root) {
    if (root == null) {
      return null;
    }
    if (value > root.value) {
      /* Go right */
      root.right = this.deleteItem(value, root.right);
    } else if (value < root.value) {
      /* Go left */
      root.left = this.deleteItem(value, root.left);
    } else {
      /* Check which out of 3 scenarios is true: has no children, 1 child, or 2 children */
      if (!root.left && !root.right) {
        return null;
      }
      if (root.left === null) {
        return this.deleteItem(value, root.right);
      } else if (root.right === null) {
        return this.deleteItem(value, root.left);
      }
      let temp = this.min(root);
      root.value = temp.value;
      root.right = this.deleteItem(root.value, root.right);
    }
    return root;
  }
  min(root) {
    let temp = root.right;
    while (temp.left) {
      temp = temp.left;
    }
    return temp;
  }
  levelOrder(callback) {
    if (arguments.length === 1) {
      throw new Error("Include all required data in function call");
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      queue.splice(0, 1);
    }
  }
  inOrder(callback, node) {
    if (arguments.length === 1) {
      throw new Error("Include all required data in function call");
    }
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }
  preOrder(callback, root) {
    if (arguments.length === 1) {
      throw new Error("Include all required data in function call");
    }
    if (root === null) {
      return;
    }
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root) {
    if (callback === undefined) {
      throw new Error("Must enter a callback function");
    }
    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }
  height(node) {
    if (node === null) {
      return -1;
    }
    let leftSub = this.height(node.left) + 1;
    let rightSub = this.height(node.right) + 1;

    if (leftSub > rightSub) {
      return leftSub;
    } else if (leftSub < rightSub) {
      return rightSub;
    } else {
      return leftSub;
    }
  }
  depth(node, root) {
    /* base case: i */

    if (node === null) {
      return 0;
    }
    if (node === "Value doesn't exist") {
      return "Value doesn't exist";
    }

    if (root.value < node.value) {
      root = root.right;
      return this.depth(node, root) + 1;
    } else if (root.value > node.value) {
      root = root.left;
      return this.depth(node, root) + 1;
    } else {
      return 1;
    }
  }
  maxDepth(root) {
    if (root === null) {
      return 0;
    }
  }
  isBalanced() {
    let leftSub = this.height(BSTree.root.left);
    let rightSub = this.height(BSTree.root.right);
    let difference;
    if (leftSub > rightSub) {
      difference = leftSub - rightSub;
    } else if (leftSub < rightSub) {
      difference = rightSub - leftSub;
    } else {
      return "Balanced";
    }
    if (difference > 1) {
      return "Unbalanced";
    } else {
      return "Balanced";
    }
  }
  rebalance() {
    let rebalancedArray = [];

    this.inOrder((node) => {
      rebalancedArray.push(node.value);
    }, this.root);
    this.root = this.buildTree(rebalancedArray, 0, rebalancedArray.length - 1);
    return this.root;
  }
}
function sortAndRemoveDuplicates(arr) {
  arr = arr.sort((a, b) => {
    return a > b ? 1 : b > a ? -1 : 0;
  });
  arr = [...new Set(arr)];
}

let array = [2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let array2 = [21, 30, 90, 69, 39, 59, 13, 42, 2, 6, 55, 43, 11, 29];

array = array.sort((a, b) => {
  return a > b ? 1 : b > a ? -1 : 0;
});
array = [...new Set(array)];
array2 = [...new Set(array2)];
let BSTree = new Tree(array2);
BSTree.insert(429, BSTree.root);
BSTree.insert(429, BSTree.root);
BSTree.insert(429, BSTree.root);
BSTree.insert(429, BSTree.root);
BSTree.insert(429, BSTree.root);

console.log(BSTree.isBalanced());
BSTree.rebalance();
console.log(BSTree.isBalanced());

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(BSTree.root);
