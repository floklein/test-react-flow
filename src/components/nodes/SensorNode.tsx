import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface SensorNodeData {
  label: string;
  value: number;
  unit: string;
}

function SensorNode({ data }: NodeProps<SensorNodeData>) {
  return (
    <div className="px-4 py-2 shadow-md rounded-lg bg-card border border-gray-200 min-w-[150px] font-sans">
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 bg-red-100/50 rounded-t-md">
          <div className="font-bold text-sm text-foreground">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div className="font-mono text-lg font-bold text-foreground bg-background px-3 py-2 rounded-md inline-block">
            {data.value} {data.unit}
          </div>
        </div>
      </div>

      {/* Connecteur d'entrée */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-red-500 border-2 border-background"
      />

      {/* Connecteur de sortie */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-red-500 border-2 border-background"
      />
    </div>
  );
}

export default memo(SensorNode);
