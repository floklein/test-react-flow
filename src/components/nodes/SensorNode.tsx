import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface SensorNodeData {
  label: string;
  value: number;
  unit: string;
}

function SensorNode({ data }: NodeProps<SensorNodeData>) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-[150px] font-sans">
      <div className="flex flex-col">
        <div
          className="flex items-center justify-center h-8 rounded-t-md"
          style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
        >
          <div className="font-bold text-sm">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div className="font-mono text-lg font-bold px-3 py-2 rounded-md inline-block border border-gray-200 bg-white">
            {data.value} {data.unit}
          </div>
        </div>
      </div>

      {/* Connecteur d'entrée */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2"
        style={{
          backgroundColor: "#ef4444",
          borderColor: "white",
        }}
      />

      {/* Connecteur de sortie */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2"
        style={{
          backgroundColor: "#ef4444",
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default memo(SensorNode);
