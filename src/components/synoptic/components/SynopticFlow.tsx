import React from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

interface SynopticFlowProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
  onInit: (instance: ReactFlowInstance) => void;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
}

export const SynopticFlow: React.FC<SynopticFlowProps> = ({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
  onInit,
  onDrop,
  onDragOver,
}) => {
  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        className="w-full h-full"
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="bg-card border border-gray-200 shadow-md rounded-md" />
        <MiniMap
          className="bg-card border border-gray-200 shadow-md rounded-md"
          nodeBorderRadius={2}
          nodeColor={(node) => {
            switch (node.type) {
              case "tankNode":
                return "rgba(59, 130, 246, 0.6)";
              case "valveNode":
                return "rgba(16, 185, 129, 0.6)";
              case "pumpNode":
                return "rgba(245, 158, 11, 0.6)";
              case "sensorNode":
                return "rgba(239, 68, 68, 0.6)";
              default:
                return "rgba(107, 114, 128, 0.6)";
            }
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="rgba(0, 0, 0, 0.05)"
        />
      </ReactFlow>
    </div>
  );
};
