import Graph from '../lib/graph';
import Node from '../lib/node';

describe('Graph class testing', () => {
  let node1;
  let node2;
  let node3;
  let testGraph;
  
  beforeEach(() => {
    node1 = new Node(1);
    node2 = new Node(2);
    node3 = new Node(3);
    testGraph = new Graph();
  });

  afterEach(() => {
    node1 = null;
    node2 = null;
    node3 = null;
    testGraph = null;
  });
  
  test('#addNode method simple case', () => {
    testGraph.addNode(node1);
    testGraph.addNode(node2);
    expect(testGraph.adjacencyList.has(node1)).toBe(true);
    expect(testGraph.adjacencyList.has(node2)).toBe(true);
  });

  test('#addEdge method simple case', () => {
    testGraph.addNode(node1);
    testGraph.addNode(node2);
    testGraph.addEdge(node1, node2);
    const node1Neighbors = testGraph.adjacencyList.get(node1);
    expect(node1Neighbors[0]).toBe(node2);
  });

  test('#getNeighbors method simple case', () => {
    testGraph.addNode(node1);
    testGraph.addNode(node2);
    testGraph.addNode(node3);
    testGraph.addEdge(node1, node2);
    testGraph.addEdge(node1, node3);

    const neighbors = testGraph.getNeighbors(node1);

    expect(neighbors[0]).toBe(node2);
    expect(neighbors[1]).toBe(node3);
  });

  test('bfTraversal method simple case', () => {
    testGraph.addNode(node1);
    testGraph.addNode(node2);
    testGraph.addNode(node3);
    testGraph.addEdge(node1, node2);
    testGraph.addEdge(node1, node3);

    const visited = [];
    
    testGraph.bfTraversal(node1, value => visited.push(value));

    expect(visited[0]).toBe(1);
    expect(visited[1]).toBe(2);
    expect(visited[2]).toBe(3);
  });

  test('bfTraversal method throws on non-existent origin', () => {
    expect(() => {
      testGraph.bfTraversal(node1);
    }).toThrow();
  });

  test('bfTraversal method throws if callback is not a function', () => {
    testGraph.addNode(node1);
    
    expect(() => {
      testGraph.bfTraversal(node1, 'foo');
    }).toThrow();
  });
});
