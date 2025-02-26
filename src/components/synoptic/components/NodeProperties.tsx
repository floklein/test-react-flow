import React from "react";
import { Node } from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";

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
                  <Label>Niveau (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      min={0}
                      max={100}
                      value={[selectedNode.data.level]}
                      onValueChange={(values) =>
                        updateNodeData(selectedNode.id, {
                          level: values[0],
                        })
                      }
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
                  <Label>État</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center flex-1 justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedNode.data.isOpen}
                          onCheckedChange={(checked) =>
                            updateNodeData(selectedNode.id, {
                              isOpen: checked,
                            })
                          }
                        />
                        <span className="text-sm font-medium">
                          {selectedNode.data.isOpen ? "Ouverte" : "Fermée"}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          selectedNode.data.isOpen
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedNode.data.isOpen ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "pumpNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <Label>État</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center flex-1 justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedNode.data.isRunning}
                          onCheckedChange={(checked) =>
                            updateNodeData(selectedNode.id, {
                              isRunning: checked,
                            })
                          }
                        />
                        <span className="text-sm font-medium">
                          {selectedNode.data.isRunning
                            ? "En marche"
                            : "Arrêtée"}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          selectedNode.data.isRunning
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedNode.data.isRunning ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedNode.type === "sensorNode" && (
              <>
                <div className="flex flex-col gap-3">
                  <Label>Valeur</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={selectedNode.data.value}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          value: parseFloat(e.target.value),
                        })
                      }
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      value={selectedNode.data.unit}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          unit: e.target.value,
                        })
                      }
                      className="w-16"
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
