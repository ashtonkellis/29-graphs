export default class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  addEdge(startNode, endNode) {
    if (!this.adjacencyList.has(startNode) || !this.adjacencyList.has(endNode)) throw new Error('invalid nodes');

    const neighbors = this.adjacencyList.get(startNode);
    neighbors.push(endNode);
  }

  getNeighbors(node) {
    if (!this.adjacencyList.has(node)) throw new Error('Invalid node');

    return [...this.adjacencyList.get(node)];
  }

  bfTraversal(origin, callback) {
    if (!this.adjacencyList.has(origin)) throw new Error('invalid node');
    if (typeof callback !== 'function') throw new Error('callback must be a function');
    
    const queue = [origin];
    const visited = new Set();
    
    while (queue.length) {
      const current = queue.pop();
      
      callback(current.value);

      const neighbors = this.getNeighbors(current);

      neighbors.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.unshift(neighbor);
        }
      });
    }
  }
}
