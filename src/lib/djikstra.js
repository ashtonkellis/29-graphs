'use strict';

/*eslint-disable*/
const PriorityQueue = require('js-priority-queue');

// we are creating a new funciton that accepts graph, startNode, and goalNode as arguments, We are then exporting this function
module.exports = (graph, startNode, goalNode) => {
  // we are instantiating a new Set, and saving it to a variable called visitedNodes
  const visitedNodes = new Set();
  // we are instantiating a new Map, and saving it to a variable called parentMap
  const parentMap = new Map();
  // we are instantiating a new Map and saving it to a variable called ShortestPathSoFar
  const shortestPathSoFar = new Map();

  // we are instantiating a new PriorityQueue, and saving it to a variable called priorityQueue.
  const priorityQueue = new PriorityQueue({
    // we are setting the sorting option for our priority queue, and telling the queue to 
    comparator: (a, b) => a.priority - b.priority,
  });

  // we are creating a putting the startNode into our priority queue, and giving it a priority of zero
  priorityQueue.queue({
    node: startNode,
    priority: 0,
  });

  // we are adding the startNode to our map, and giving it a value of zero
  shortestPathSoFar.set(startNode, 0);

  // we are starting a whiel loop that will run for as long as there are items in the priorityQueue
  while (priorityQueue.length > 0) {
    // we are dequeueing the first thing in our priority queue, and saving its .node property to a variable called currentNode
    const currentNode = priorityQueue.dequeue().node;

    // we are checking whether we have previously visited this node. If we have, we continue the loop
    if (visitedNodes.has(currentNode)) { continue; }
    
    // here we add the current node to our set of visited nodes
    visitedNodes.add(currentNode);

    // here we check if the current node is the goal node. if it is, we have arrived, so we return the parentMap
    if (currentNode === goalNode) { return parentMap; }
    
    // we graph all of the neighbors of the current node, and save them to a variable called neighbors
    const neighbors = graph.getNeighbors(currentNode);

    // we iterate over each neighbor in our neighbors array
    for (const neighbor of neighbors) {
      // we assign the neighborWeight to the weightproperty on the current neighbor
      const neighborWeight = neighbor.weight;
      // we assign neighborNode to the node property of the current neighbor
      const neighborNode = neighbor.node;

      // if we ahve already visited this node, we coninue the while loop
      if (visitedNodes.has(neighborNode)) { continue; }
      
      // here we calcuate the new path weight, which is the sum of the current path weight plus the neighbor weight
      const newPathWeight = shortestPathSoFar.get(currentNode) + neighborWeight;

      // if this neighbor does not exist in the shortestPathSoFar map OR
      if (!shortestPathSoFar.has(neighbor) ||
        // the newpathWeight is less than the value that is currently saved for this neighbor node
         newPathWeight < shortestPathSoFar.get(neighborNode)) {
          // then we update the shortestPathSoFar map with the new value
        shortestPathSoFar.set(neighborNode, newPathWeight);
        // andwe update the parentMap map with the new value
        parentMap.set(neighborNode, currentNode);

        // now we put the neighbor into the priority queue
        priorityQueue.queue({
          // the node that we're enqueueing is the neighbor node
          node: neighborNode,
          // and its priority is the shortestpath that we currently have saved in the shortestPathSoFar map
          priority: shortestPathSoFar.get(neighborNode),
        });
      }
    }
  }
  // and here we return null to shut up the airbnb linter
  return null; 
};
