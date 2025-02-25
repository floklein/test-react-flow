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
      <Card className="shadow-none border-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-foreground">
            Catalogue de composants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Glissez-déposez les éléments sur le plan pour les ajouter
            </p>
            <div className="grid grid-cols-1 gap-3">
              {nodeCatalog.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 cursor-move bg-background hover:bg-accent transition-colors flex items-center gap-3 shadow-sm"
                  draggable
                  onDragStart={(event) =>
                    onDragStart(event, item.type, item.data)
                  }
                >
                  <div className="text-2xl text-primary">{item.icon}</div>
                  <div>
                    <div className="font-medium text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
