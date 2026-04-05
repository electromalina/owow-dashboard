import { DocumentStatus } from "@/src/data/documents";

const statusStyles: Record<DocumentStatus, string> = {
  approved: "border-green text-green",
  review: "border-yellow text-yellow",
  active: "border-blue text-blue",
  draft: "border-off-white text-off-white",
};

const statusLabels: Record<DocumentStatus, string> = {
  approved: "Approved",
  review: "Review",
  active: "Active",
  draft: "Draft",
};

export default function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}