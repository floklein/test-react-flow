import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface PumpNodeData {
  label: string;
  isRunning: boolean;
}

function PumpNode({ data }: NodeProps<PumpNodeData>) {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-lg border font-sans min-w-[150px] ${
        data.isRunning
          ? "bg-amber-50/50 border-amber-300"
          : "bg-muted border-gray-200"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 rounded-t-md">
          <div className="font-bold text-sm text-foreground">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div
            className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${
              data.isRunning
                ? "bg-amber-100 text-amber-700"
                : "bg-muted text-muted-foreground"
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
                data.isRunning ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Connecteurs */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-amber-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-amber-500 border-2 border-background"
      />
    </div>
  );
}

export default memo(PumpNode);
