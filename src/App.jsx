import React, { useState, useEffect } from 'react';
import RenderedGraph from './RenderedGraph';
import './App.css';
import Graph from './util/Graph';
import GraphPlayer from './util/GraphPlayer';
import BFS from './algorithm/BFS';
import DFS from './algorithm/DFS';
import BellmanFord from './algorithm/BellmanFord';
import Dijkstra from './algorithm/Dijkstra';
import FloydWarshall from './algorithm/FloydWarshall';
import KMST from './algorithm/KruskalMST';
import PMST from './algorithm/PrimMST';
import TarjanSSC from './algorithm/TarjanSSC';
import ReachabilityQuery from './algorithm/ReachabilityQuery';

function App() {
  const [vertexCount, setVertexCount] = useState(20);
  const [tps, setTps] = useState(10);
  const [graphInput, setGraphInput] = useState(
    Graph.generateRoughlyPlanarGraph(vertexCount),
  );
  const [alg, setAlg] = useState(new BFS());
  const [graph, setGraph] = useState(null);
  /**
   * @type {Array.<{label:string, callback:()=>{}}>}
   */
  const utilities = [
    {
      label: 'Randomize',
      callback: () => {
        setGraphInput(Graph.generateRoughlyPlanarGraph(vertexCount));
      },
    },
    {
      label: 'Negative Randomize',
      callback: () => {
        setGraphInput(Graph.generateRoughlyPlanarGraphWithNegativeEdges(20, -10, 100));
      },
    },
    {
      label: 'DFS',
      callback: () => {
        setAlg(new DFS());
      },
    },
    {
      label: 'BFS',
      callback: () => {
        setAlg(new BFS());
      },
    },
    {
      label: 'Dijkstra',
      callback: () => {
        setAlg(new Dijkstra());
      },
    },
    {
      label: 'Bellman-Ford',
      callback: () => {
        setAlg(new BellmanFord());
      },
    },
    {
      label: 'FloydWarshall',
      callback: () => {
        setAlg(new FloydWarshall());
      },
    },
    {
      label: 'Kruskal',
      callback: () => {
        setAlg(new KMST());
      },
    },
    {
      label: 'Prim',
      callback: () => {
        setAlg(new PMST());
      },
    },
    {
      label: 'RQ',
      callback: () => {
        setAlg(new ReachabilityQuery());
      },
    },
    {
      label: 'Tarjan SSC',
      callback: () => {
        setAlg(new TarjanSSC());
      },
    },
  ];

  useEffect(() => {
    setGraphInput(Graph.generateRoughlyPlanarGraph(vertexCount));
  }, [vertexCount]);
  useEffect(() => {
    if (graphInput) {
      const processedGraph = alg.run(graphInput);
      const graph = new GraphPlayer(processedGraph);
      setGraph(graph);
    }
  }, [graphInput, alg]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (graph) {
        graph.step(Date.now());
      }
    }, 1000 / tps);
    return () => {
      clearInterval(interval);
    };
  }, [tps, graph]);

  return (
    <div>
      {utilities.map(({ label, callback }, index) => (
        <button onClick={callback} key={index}>
          {label}
        </button>
      ))}
      <div>
        <div>
          <label> vertex count: {vertexCount} </label>
          <input
            type='range'
            name='vertex-n'
            min={5}
            max={30}
            step={5}
            defaultValue={vertexCount}
            onMouseUp={({ target }) => setVertexCount(+target.value)}
          />
        </div>
        <div>
          <label> tick / second: {tps} </label>
          {[1, 2, 5, 10, 20, 50, 100].map((x, index) => (
            <button
              key={index}
              onClick={() => setTps(x)}
              className={
                'bg-slate-100 hover:border transition-all ' +
                (x === tps ? 'border-red-500' : '')
              }
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      <RenderedGraph graph={graph} />
    </div>
  );
}

export default App;
