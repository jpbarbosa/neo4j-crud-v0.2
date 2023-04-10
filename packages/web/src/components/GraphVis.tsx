import ReactGraphVis, { GraphVisData } from 'react-graph-vis';

type GraphVisProps = {
  graph: GraphVisData;
};

export const GraphVis: React.FC<GraphVisProps> = ({ graph }) => {
  return (
    <ReactGraphVis
      graph={graph}
      options={{
        //autoResize: true,
        height: '100%',
        nodes: {
          shape: 'dot',
          font: {
            strokeWidth: 4,
          },
        },
        edges: {
          width: 1,
          color: 'darkorange',
          length: 200,
          font: {
            size: 10,
            strokeWidth: 3,
            //   align: 'middle', // Performance issue.
          },
        },
        physics: {
          // Even though it's disabled the options still apply to network.stabilize().
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 200, // Put more distance between the nodes.
          },
          stabilization: {
            iterations: 200,
            //fit: true,
          },
        },
      }}
      getNetwork={(network) => {
        network.fit({
          animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad',
          },
          nodes: graph.nodes.map((n) => String(n.id)),
        });
      }}
    />
  );
};
