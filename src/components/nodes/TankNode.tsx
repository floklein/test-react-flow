import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface TankNodeData {
  label: string;
  level: number;
}

function TankNode({ data }: NodeProps<TankNodeData>) {
  // Déterminer la couleur du liquide en fonction du niveau
  let liquidColor = "bg-blue-500 bg-opacity-80";
  if (data.level < 20) {
    liquidColor = "bg-red-500 bg-opacity-80";
  } else if (data.level < 50) {
    liquidColor = "bg-amber-500 bg-opacity-80";
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-[150px] font-sans">
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 rounded-t-md bg-gray-100">
          <div className="font-bold text-sm">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div className="font-medium text-sm mb-1">Niveau: {data.level}%</div>
          <div className="w-full h-24 border border-gray-200 rounded-md relative overflow-hidden bg-white">
            <div
              className={`absolute bottom-0 left-0 right-0 ${liquidColor} transition-all duration-300 ease-in-out`}
              style={{ height: `${data.level}%` }}
            />
            {/* Lignes de graduation */}
            <div className="absolute top-0 left-0 right-0 border-b border-dashed h-6" />
            <div className="absolute top-6 left-0 right-0 border-b border-dashed h-6" />
            <div className="absolute top-12 left-0 right-0 border-b border-dashed h-6" />
            <div className="absolute top-18 left-0 right-0 border-b border-dashed h-6" />
          </div>
        </div>
      </div>

      {/* Connecteurs */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 bg-blue-500 border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 bg-blue-500 border-white"
      />
    </div>
  );
}

export default memo(TankNode);
