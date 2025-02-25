import { useCallback, useState } from "react";
import {
  Connection,
  Node,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

// Import des types et constantes
import { NodeData, generateUniqueId } from "./types";
import {
  initialEdges,
  initialNodes,
  nodeCatalog,
  nodeTypes,
} from "./types/constants";

// Import des composants
import { NodeCatalog } from "./components/NodeCatalog";
import { NodeProperties } from "./components/NodeProperties";
import { SynopticFlow } from "./components/SynopticFlow";

export default function Synoptic() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Fonction pour gérer l'ajout de connexions
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Fonction pour gérer la sélection d'un nœud
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Fonction pour désélectionner le nœud quand on clique sur le fond
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Fonction pour mettre à jour les propriétés d'un nœud
  const updateNodeData = useCallback(
    (id: string, newData: Record<string, unknown>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );

      // Mettre à jour également le nœud sélectionné si c'est celui qui est modifié
      if (selectedNode && selectedNode.id === id) {
        setSelectedNode((prevNode) => {
          if (!prevNode) return null;
          return {
            ...prevNode,
            data: {
              ...prevNode.data,
              ...newData,
            },
          };
        });
      }
    },
    [setNodes, selectedNode]
  );

  // Fonction pour gérer le drag and drop depuis le catalogue
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    nodeData: NodeData
  ) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData(
      "application/reactflow/data",
      JSON.stringify(nodeData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  // Fonction pour gérer le drop sur le canvas
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow/type");
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow/data")
      );

      // Vérifier que le type est valide
      if (!type || !Object.keys(nodeTypes).includes(type)) return;

      // Calculer la position où le nœud a été déposé
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Créer un nouveau nœud
      const newNode: Node = {
        id: generateUniqueId(type),
        type,
        position,
        data,
      };

      // Ajouter le nouveau nœud
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="flex w-full h-screen bg-background font-sans">
      {/* Zone principale du ReactFlow */}
      <div className="flex-1 h-full relative border-r border-gray-200">
        <SynopticFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>

      {/* Panneau latéral */}
      <div
        style={{ width: "400px" }}
        className="flex-none h-full bg-card overflow-y-auto shadow-md"
      >
        {/* Afficher les propriétés si un nœud est sélectionné, sinon afficher le catalogue */}
        {selectedNode ? (
          <NodeProperties
            selectedNode={selectedNode}
            updateNodeData={updateNodeData}
          />
        ) : (
          <NodeCatalog nodeCatalog={nodeCatalog} onDragStart={onDragStart} />
        )}
      </div>
    </div>
  );
}
