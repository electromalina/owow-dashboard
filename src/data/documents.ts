// hardcoded types 
export type DocumentStatus = "approved" | "review" | "active" | "draft";
export type DocumentType = "PDF" | "DOC" | "LINK";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size?: string; //optionla cuz links dont have file size
  date: string;
  status: DocumentStatus;
  sourceUrl?: string; //optional - only for links
}

export interface DocumentCategory {
  id: string;
  label: string;
  documents: Document[];
}

// Mock data (widget and full pages import from here)
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
      {
        id: "prop-4",
        name: "Budget Estimation v2",
        type: "PDF",
        size: "1.1 MB",
        date: "Jan 5, 2026",
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
      {
        id: "prd-4",
        name: "User Stories & Acceptance Criteria",
        type: "DOC",
        size: "2.1 MB",
        date: "Feb 10, 2026",
        status: "approved",
      },
      {
        id: "prd-5",
        name: "Database Schema Design",
        type: "PDF",
        size: "3.4 MB",
        date: "Jan 28, 2026",
        status: "approved",
        sourceUrl: "https://notion.so",
      },
      {
        id: "prd-6",
        name: "API Endpoint Documentation",
        type: "PDF",
        size: "1.8 MB",
        date: "Jan 20, 2026",
        status: "approved",
        sourceUrl: "https://notion.so",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    documents: [
      {
        id: "rep-1",
        name: "Weekly Progress Report #8",
        type: "PDF",
        size: "2.1 MB",
        date: "Mar 8, 2026",
        status: "approved",
      },
      {
        id: "rep-2",
        name: "Budget Status February",
        type: "PDF",
        size: "1.5 MB",
        date: "Mar 1, 2026",
        status: "approved",
      },
      {
        id: "rep-3",
        name: "Sprint 4 Retrospective",
        type: "DOC",
        size: "800 KB",
        date: "Feb 20, 2026",
        status: "approved",
      },
      {
        id: "rep-4",
        name: "QA Test Results Round 2",
        type: "PDF",
        size: "3.2 MB",
        date: "Feb 15, 2026",
        status: "review",
      },
      {
        id: "rep-5",
        name: "Monthly Client Summary Jan",
        type: "PDF",
        size: "1.9 MB",
        date: "Feb 1, 2026",
        status: "approved",
      },
      {
        id: "rep-6",
        name: "Weekly Progress Report #4",
        type: "PDF",
        size: "1.8 MB",
        date: "Jan 25, 2026",
        status: "approved",
      },
      {
        id: "rep-7",
        name: "Sprint 2 Retrospective",
        type: "DOC",
        size: "750 KB",
        date: "Jan 18, 2026",
        status: "approved",
      },
      {
        id: "rep-8",
        name: "Initial Risk Assessment",
        type: "PDF",
        size: "2.0 MB",
        date: "Jan 10, 2026",
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
      {
        id: "asset-4",
        name: "Photography Assets Pack",
        type: "PDF",
        size: "15 MB",
        date: "Jan 20, 2026",
        status: "approved",
      },
      {
        id: "asset-5",
        name: "Font License Agreement",
        type: "PDF",
        size: "200 KB",
        date: "Jan 8, 2026",
        status: "approved",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    documents: [
      {
        id: "comm-1",
        name: "Client Feedback Round 2",
        type: "PDF",
        size: "3.2 MB",
        date: "Feb 28, 2026",
        status: "approved",
      },
      {
        id: "comm-2",
        name: "Kickoff Meeting Notes",
        type: "DOC",
        size: "650 KB",
        date: "Jan 15, 2026",
        status: "approved",
      },
      {
        id: "comm-3",
        name: "Stakeholder Interview Summary",
        type: "DOC",
        size: "1.1 MB",
        date: "Jan 22, 2026",
        status: "approved",
      },
      {
        id: "comm-4",
        name: "Design Review Feedback",
        type: "PDF",
        size: "900 KB",
        date: "Feb 5, 2026",
        status: "review",
      },
      {
        id: "comm-5",
        name: "Mid-Project Check-in Notes",
        type: "DOC",
        size: "500 KB",
        date: "Feb 12, 2026",
        status: "approved",
      },
      {
        id: "comm-6",
        name: "Final Presentation Outline",
        type: "DOC",
        size: "750 KB",
        date: "Feb 25, 2026",
        status: "draft",
      },
      {
        id: "comm-7",
        name: "Project Handoff Checklist",
        type: "DOC",
        size: "400 KB",
        date: "Mar 5, 2026",
        status: "draft",
      },
    ],
  },

];


//calculate totals functions:
export function getTotalDocuments(): number {
  return documentCategories.reduce(
    (total, cat) => total + cat.documents.length,
    0
  );
}

export function getTotalCategories(): number {
  return documentCategories.length;
}
