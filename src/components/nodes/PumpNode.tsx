import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface PumpNodeData {
  label: string;
  isRunning: boolean;
}

function PumpNode({ data }: NodeProps<PumpNodeData>) {
  return (
    <div
      className={`rounded-lg border p-4 shadow-sm min-w-[150px] font-sans ${
        data.isRunning
          ? "bg-amber-50 border-amber-300"
          : "bg-gray-100 border-gray-200"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 rounded-t-md">
          <div className="font-bold text-sm">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div
            className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${
              data.isRunning
                ? "bg-amber-200 text-amber-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {data.isRunning ? "En marche" : "Arrêtée"}
          </div>
          <div className="mt-3 mb-1">
            <svg
              viewBox="0 0 24 24"
              width="40"
              height="40"
              stroke={data.isRunning ? "#d97706" : "#6b7280"}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mx-auto transition-all duration-300 ${
                data.isRunning ? "animate-[spin_3s_linear_infinite]" : ""
              }`}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Connecteurs */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 bg-amber-600 border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 bg-amber-600 border-white"
      />
    </div>
  );
}

export default memo(PumpNode);
