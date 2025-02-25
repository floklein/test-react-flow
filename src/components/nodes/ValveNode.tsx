import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface ValveNodeData {
  label: string;
  isOpen: boolean;
}

function ValveNode({ data }: NodeProps<ValveNodeData>) {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-lg border font-sans min-w-[150px] ${
        data.isOpen
          ? "bg-green-50/50 border-green-300"
          : "bg-red-50/50 border-red-300"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 rounded-t-md">
          <div className="font-bold text-sm text-foreground">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div
            className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${
              data.isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {data.isOpen ? "Ouverte" : "Fermée"}
          </div>
          <div className="mt-3 mb-1">
            <svg
              viewBox="0 0 24 24"
              width="40"
              height="40"
              stroke={data.isOpen ? "#16a34a" : "#dc2626"}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto transition-all duration-300"
            >
              {data.isOpen ? (
                <>
                  <path d="M6 12h12" />
                  <path d="M12 6v12" />
                </>
              ) : (
                <path d="M6 12h12" />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Connecteurs */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-green-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-500 border-2 border-background"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-green-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-green-500 border-2 border-background"
      />
    </div>
  );
}

export default memo(ValveNode);
