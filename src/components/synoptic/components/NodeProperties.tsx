import React from "react";
import { Node } from "reactflow";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface NodePropertiesProps {
  selectedNode: Node | null;
  updateNodeData: (id: string, newData: Record<string, unknown>) => void;
}

export const NodeProperties: React.FC<NodePropertiesProps> = ({
  selectedNode,
  updateNodeData,
}) => {
  if (!selectedNode) return null;

  return (
    <div className="p-4">
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            {selectedNode.type === "tankNode" && (
              <span className="text-xl text-blue-500">🔵</span>
            )}
            {selectedNode.type === "valveNode" && (
              <span className="text-xl text-green-500">➕</span>
            )}
            {selectedNode.type === "pumpNode" && (
              <span className="text-xl text-amber-500">⏱️</span>
            )}
            {selectedNode.type === "sensorNode" && (
              <span className="text-xl text-red-500">🌡️</span>
            )}
            {selectedNode.data.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedNode.type === "tankNode" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Niveau (%)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedNode.data.level}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          level: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium bg-blue-600 text-white px-2 py-1 rounded-md min-w-[3rem] text-center">
                      {selectedNode.data.level}%
                    </span>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "valveNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium">État</label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateNodeData(selectedNode.id, {
                          isOpen: true,
                        })
                      }
                      variant={selectedNode.data.isOpen ? "default" : "outline"}
                      className="flex-1"
                    >
                      Ouverte
                    </Button>
                    <Button
                      onClick={() =>
                        updateNodeData(selectedNode.id, {
                          isOpen: false,
                        })
                      }
                      variant={
                        !selectedNode.data.isOpen ? "default" : "outline"
                      }
                      className="flex-1"
                    >
                      Fermée
                    </Button>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "pumpNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium">État</label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        updateNodeData(selectedNode.id, {
                          isRunning: true,
                        })
                      }
                      variant={
                        selectedNode.data.isRunning ? "default" : "outline"
                      }
                      className="flex-1"
                    >
                      En marche
                    </Button>
                    <Button
                      onClick={() =>
                        updateNodeData(selectedNode.id, {
                          isRunning: false,
                        })
                      }
                      variant={
                        !selectedNode.data.isRunning ? "default" : "outline"
                      }
                      className="flex-1"
                    >
                      Arrêtée
                    </Button>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "sensorNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium">Valeur</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={selectedNode.data.value}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          value: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1 border border-gray-200 bg-white rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={selectedNode.data.unit}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          unit: e.target.value,
                        })
                      }
                      className="w-16 border border-gray-200 bg-white rounded-md px-3 py-2 text-sm"
                      placeholder="Unité"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
