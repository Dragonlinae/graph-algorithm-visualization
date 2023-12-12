import Graph from '../util/Graph';
import BaseAlgorithm from './BaseAlgorithm';

class PrimMST extends BaseAlgorithm {
  /** @override */
  run(graphInput) {
    // --- set up auxiliary values then finalize
    const graph = new Graph(graphInput, null, null);
    const lightEdgeTable = graph.createTable({
      name: 'Light Edge',
      rows:1,
      cols: 2,
      initialValue: null,
    });
    graph.finalize();

    // --- process graph
    let mstEdges = [];
    let setS = [0];
    
    while (mstEdges < graphInput.n - 1) {
      for (let i = 0; i < setS.length; ++i) {
        
        // Find Light Edge
        let lightEdge = -1;
        let lightEdgeWeight = Number.MAX_SAFE_INTEGER

        for (let j = 0; j < graphInput.edges.length; ++j) {
          const edgeTuple = graphInput.edges[j]
          const from = edgeTuple[0];
          const to = edgeTuple[1];
          const weight = edgeTuple[2];

          // Check eligibility
          // Needs to be from inside of setS and pointing out of setS
          if (!setS.includes(from)) {
            continue;
          }
          if (setS.includes(to)) {
            continue;
          }

          if (weight < lightEdgeWeight) {
            lightEdgeWeight = weight;
            lightEdge = j;
          }

        }

        if (lightEdge == -1) {
          console.log("Something went big bad with prims");
        }
        mstEdges.push(lightEdge);
      }
    }

    graph.subroutine('final coloring', () => {
      for (const edgeid of mstEdges) {
        const edgeTuple = graphInput.edges[edgeid];
        const edge = graph.getEdge(edgeTuple[0], edgeTuple[1]);
        edge.setColor(2);

        const u = graph.getVertex(edgeTuple[0]);
        u.setColor(2);
        const v = graph.getVertex(edgeTuple[1]);
        v.setColor(2);
      }
    });

    return graph;
  }
}
export default PrimMST;
