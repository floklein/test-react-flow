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
      <Card className="shadow-none border-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            {selectedNode.type === "tankNode" && (
              <span className="text-blue-500 text-xl">🔵</span>
            )}
            {selectedNode.type === "valveNode" && (
              <span className="text-green-500 text-xl">➕</span>
            )}
            {selectedNode.type === "pumpNode" && (
              <span className="text-amber-500 text-xl">⏱️</span>
            )}
            {selectedNode.type === "sensorNode" && (
              <span className="text-red-500 text-xl">🌡️</span>
            )}
            {selectedNode.data.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedNode.type === "tankNode" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Niveau (%)
                  </label>
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
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-sm font-medium bg-primary text-primary-foreground px-2 py-1 rounded-md min-w-[3rem] text-center">
                      {selectedNode.data.level}%
                    </span>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "valveNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-foreground">
                    État
                  </label>
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
                  <label className="text-sm font-medium text-foreground">
                    État
                  </label>
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
                  <label className="text-sm font-medium text-foreground">
                    Valeur
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={selectedNode.data.value}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          value: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1 border border-gray-200 bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="text"
                      value={selectedNode.data.unit}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          unit: e.target.value,
                        })
                      }
                      className="w-16 border border-gray-200 bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
