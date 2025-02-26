import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    position: { x: 300, y: 100 },
    data: { label: "Node 2" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function Flow() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="w-full h-full"
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
      <div className="w-[400px] bg-white p-5">
        <h2>Right Panel</h2>
        <p>This is a test panel to see if the layout works properly.</p>
      </div>
    </div>
  );
}

export default function TestFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
