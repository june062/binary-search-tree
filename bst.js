class Node {
  constructor(data) {
    this.value = data;
    this.right = null;
    this.left = null;
  }
}
class Tree {
  constructor(array) {
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
}
function sortAndRemoveDuplicates(arr) {
  arr = arr.sort((a, b) => {
    return a > b ? 1 : b > a ? -1 : 0;
  });
  arr = [...new Set(arr)];
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
array = array.sort((a, b) => {
  return a > b ? 1 : b > a ? -1 : 0;
});
array = [...new Set(array)];
let BSTree = new Tree(array);
console.log(BSTree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(BSTree.root);
