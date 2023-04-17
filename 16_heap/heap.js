class Heap {
  data

  constructor() {
    this.data = []
  }

  rootNode() {
    return this.data[0]
  }

  lastNode() {
    return this.data[this.data.length - 1]
  }

  leftChildIndex(index) {
    return index * 2 + 1
  }

  rightChildIndex(index) {
    return index * 2 + 2
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  insert(value) {
    this.data.push(value)

    // 堆中只有一个根节点，不需要进行交换操作
    if (this.data.length === 1) {
      return
    }

    let newNodeIndex = this.data.length - 1
    let parentIndex = this.parentIndex(newNodeIndex)

    // 如果新节点比它的父节点大，则交换值
    while (this.data[newNodeIndex] > this.data[parentIndex]) {
      // 交换新节点和它的父节点的值
      [this.data[newNodeIndex], this.data[parentIndex]] = [this.data[parentIndex], this.data[newNodeIndex]]

      // 更新新节点和父节点索引，用于下一次比较
      newNodeIndex = parentIndex
      parentIndex = this.parentIndex(newNodeIndex)
    }
  }

  delete() {
    // 堆没有节点时不进行后续操作
    if (this.data.length === 0) {
      return
    }

    // 堆的最后一个节点代替根节点作为新的根节点
    this.data[0] = this.data.pop()
    let currentNodeIndex = 0

    // 新的根节点与值较大的子节点替换
    while (this.hasGreaterChild(currentNodeIndex)) {
      const childIndex = this.calculateLargerChildIndex(currentNodeIndex)
      [this.data[currentNodeIndex], this.data[childIndex]] = [this.data[childIndex], this.data[currentNodeIndex]]
      // 交换后需要更新 currentNodeIndex
      currentNodeIndex = childIndex
    }
  }

  // 判断节点的左或右子节点是否大于它
  hasGreaterChild(index) {
    const currentNode = this.data[index]
    const leftChild = this.leftChildIndex(index)
    const rightChild = this.rightChildIndex(index)
    return currentNode < leftChild || currentNode < rightChild
  }

  // 获取较大的子节点
  calculateLargerChildIndex(index) {
    const leftChild = this.data[this.leftChildIndex(index)]
    const rightChild = this.data[this.rightChildIndex(index)]
    return leftChild >= rightChild ? this.leftChildIndex(index) : this.rightChildIndex(index)
  }
}

export default Heap
