import { Edge, Node, NodeTypes } from "reactflow";
import PumpNode from "../../nodes/PumpNode";
import SensorNode from "../../nodes/SensorNode";
import TankNode from "../../nodes/TankNode";
import ValveNode from "../../nodes/ValveNode";
import { CatalogItem } from "./index";

// Définition des types de nœuds
export const nodeTypes: NodeTypes = {
  sensorNode: SensorNode,
  valveNode: ValveNode,
  tankNode: TankNode,
  pumpNode: PumpNode,
};

// Nœuds initiaux pour notre synoptique
export const initialNodes: Node[] = [
  {
    id: "tank1",
    type: "tankNode",
    position: { x: 250, y: 100 },
    data: { label: "Réservoir 1", level: 45 },
  },
  {
    id: "valve1",
    type: "valveNode",
    position: { x: 250, y: 250 },
    data: { label: "Vanne 1", isOpen: true },
  },
  {
    id: "pump1",
    type: "pumpNode",
    position: { x: 100, y: 250 },
    data: { label: "Pompe 1", isRunning: true },
  },
  {
    id: "sensor1",
    type: "sensorNode",
    position: { x: 400, y: 250 },
    data: { label: "Capteur 1", value: 48, unit: "°C" },
  },
  {
    id: "tank2",
    type: "tankNode",
    position: { x: 250, y: 400 },
    data: { label: "Réservoir 2", level: 50 },
  },
];

// Connexions initiales entre les nœuds
export const initialEdges: Edge[] = [
  { id: "e1-2", source: "tank1", target: "valve1" },
  { id: "e2-5", source: "valve1", target: "tank2" },
  { id: "e3-2", source: "pump1", target: "valve1" },
  { id: "e2-4", source: "valve1", target: "sensor1" },
];

// Définition des éléments du catalogue
export const nodeCatalog: CatalogItem[] = [
  {
    type: "tankNode",
    label: "Réservoir",
    data: { label: "Nouveau Réservoir", level: 50 },
    icon: "🔵",
  },
  {
    type: "valveNode",
    label: "Vanne",
    data: { label: "Nouvelle Vanne", isOpen: false },
    icon: "➕",
  },
  {
    type: "pumpNode",
    label: "Pompe",
    data: { label: "Nouvelle Pompe", isRunning: false },
    icon: "⏱️",
  },
  {
    type: "sensorNode",
    label: "Capteur",
    data: { label: "Nouveau Capteur", value: 0, unit: "°C" },
    icon: "🌡️",
  },
];
