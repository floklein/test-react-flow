import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { CatalogItem, NodeData } from "../types";

interface NodeCatalogProps {
  nodeCatalog: CatalogItem[];
  onDragStart: (
    event: React.DragEvent,
    nodeType: string,
    nodeData: NodeData
  ) => void;
}

export const NodeCatalog: React.FC<NodeCatalogProps> = ({
  nodeCatalog,
  onDragStart,
}) => {
  return (
    <div className="p-4">
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">
            Catalogue de composants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Glissez-déposez les éléments sur le plan pour les ajouter
            </p>
            <div className="grid grid-cols-1 gap-3">
              {nodeCatalog.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3 cursor-move hover:bg-gray-50 transition-colors"
                  draggable
                  onDragStart={(event) =>
                    onDragStart(event, item.type, item.data)
                  }
                >
                  <div className="text-2xl text-blue-600">{item.icon}</div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">
                      {item.data.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
