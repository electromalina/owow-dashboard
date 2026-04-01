// hardcoded types 
export type DocumentStatus = "approved" | "review" | "active" | "draft";
export type DocumentType = "PDF" | "DOC" | "LINK";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size?: string;
  date: string;
  status: DocumentStatus;
  sourceUrl?: string;
}

export interface DocumentCategory {
  id: string;
  label: string;
  documents: Document[];
}

// Mock data
export const documentCategories: DocumentCategory[] = [
  {
    id: "proposal",
    label: "Proposal",
    documents: [
      {
        id: "prop-1",
        name: "Project Proposal v3.2",
        type: "PDF",
        size: "2.4 MB",
        date: "Feb 28, 2026",
        status: "approved",
      },
      {
        id: "prop-2",
        name: "Scope of Work Final",
        type: "PDF",
        size: "1.8 MB",
        date: "Jan 20, 2026",
        status: "approved",
      },
      {
        id: "prop-3",
        name: "Kickoff Brief",
        type: "PDF",
        size: "900 KB",
        date: "Jan 10, 2026",
        status: "approved",
      },
    ],
  },
  {
    id: "prd",
    label: "PRD",
    documents: [
      {
        id: "prd-1",
        name: "Technical Requirements",
        type: "DOC",
        size: "1.2 MB",
        date: "Feb 25, 2026",
        status: "review",
      },
      {
        id: "prd-2",
        name: "Feature Breakdown",
        type: "PDF",
        size: "890 KB",
        date: "Feb 18, 2026",
        status: "review",
      },
      {
        id: "prd-3",
        name: "API Documentation",
        type: "PDF",
        size: "890 KB",
        date: "Mar 8, 2026",
        status: "approved",
      },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    documents: [
      {
        id: "asset-1",
        name: "Figma Design System v2",
        type: "LINK",
        size: undefined,
        date: "Mar 1, 2026",
        status: "active",
        sourceUrl: "https://figma.com",
      },
      {
        id: "asset-2",
        name: "Brand Guidelines PDF",
        type: "PDF",
        size: "8.2 MB",
        date: "Feb 14, 2026",
        status: "approved",
      },
      {
        id: "asset-3",
        name: "Icon Library",
        type: "LINK",
        size: undefined,
        date: "Feb 10, 2026",
        status: "active",
        sourceUrl: "https://figma.com",
      },
    ],
  },
];