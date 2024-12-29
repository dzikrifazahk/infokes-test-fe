export interface IPanel {
  id: string;
  name: string;
  parentId: string;
  position: string;
  description: string;
  isHeader: boolean;
}

export interface IPanelChildren {
  id: string;
  name: string;
  parentId: string;
  description: string;
}
