// Définition d'un type pour les données de nœud
export interface NodeData {
  label: string;
  level?: number;
  isOpen?: boolean;
  isRunning?: boolean;
  value?: number;
  unit?: string;
}

// Type pour les éléments du catalogue
export interface CatalogItem {
  type: string;
  label: string;
  data: NodeData;
  icon: string;
}

// Fonction pour générer un ID unique
export const generateUniqueId = (type: string): string => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${type.replace("Node", "")}_${timestamp}_${randomNum}`;
};
