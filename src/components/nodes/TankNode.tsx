import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface TankNodeData {
  label: string;
  level: number;
}

function TankNode({ data }: NodeProps<TankNodeData>) {
  // Calculer la hauteur du liquide en fonction du niveau
  const liquidHeight = `${data.level}%`;

  // Déterminer la couleur du liquide en fonction du niveau
  let liquidColor = "bg-blue-500/80";
  if (data.level < 20) {
    liquidColor = "bg-red-500/80";
  } else if (data.level < 50) {
    liquidColor = "bg-amber-500/80";
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-lg bg-card border border-gray-200 min-w-[150px] font-sans">
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 bg-muted rounded-t-md">
          <div className="font-bold text-sm text-foreground">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div className="font-medium text-sm mb-1 text-foreground">
            Niveau: {data.level}%
          </div>
          <div className="w-full h-24 border border-gray-200 rounded-md bg-background relative overflow-hidden">
            <div
              className={`absolute bottom-0 left-0 right-0 ${liquidColor} transition-all duration-300 ease-in-out`}
              style={{ height: liquidHeight }}
            />
            {/* Lignes de graduation */}
            <div className="absolute top-0 left-0 right-0 border-b border-gray-200 border-dashed h-6" />
            <div className="absolute top-6 left-0 right-0 border-b border-gray-200 border-dashed h-6" />
            <div className="absolute top-12 left-0 right-0 border-b border-gray-200 border-dashed h-6" />
            <div className="absolute top-18 left-0 right-0 border-b border-gray-200 border-dashed h-6" />
          </div>
        </div>
      </div>

      {/* Connecteurs */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500 border-2 border-background"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500 border-2 border-background"
      />
    </div>
  );
}

export default memo(TankNode);
