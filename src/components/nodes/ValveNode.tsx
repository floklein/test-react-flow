import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface ValveNodeData {
  label: string;
  isOpen: boolean;
}

function ValveNode({ data }: NodeProps<ValveNodeData>) {
  return (
    <div
      className="rounded-lg border p-4 shadow-sm min-w-[150px] font-sans"
      style={{
        backgroundColor: data.isOpen
          ? "rgba(16, 185, 129, 0.05)"
          : "rgba(239, 68, 68, 0.05)",
        borderColor: data.isOpen ? "#10b981" : "#ef4444",
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-8 rounded-t-md">
          <div className="font-bold text-sm">{data.label}</div>
        </div>
        <div className="mt-2 text-center">
          <div
            className="text-sm font-medium px-2 py-1 rounded-md inline-block"
            style={{
              backgroundColor: data.isOpen
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(239, 68, 68, 0.2)",
              color: data.isOpen ? "#047857" : "#b91c1c",
            }}
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
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2"
        style={{
          backgroundColor: "#10b981",
          borderColor: "white",
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2"
        style={{
          backgroundColor: "#10b981",
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default memo(ValveNode);
