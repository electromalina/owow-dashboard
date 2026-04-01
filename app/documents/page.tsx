import KeyDocuments from "@/src/components/widgets/KeyDocuments";

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-black p-8">
      {/* 
        max-w-lg keeps the widget at a reasonable card width (will adjust later)
      */}
      <div className="mx-auto max-w-lg">
        <KeyDocuments />
      </div>
    </main>
  );
}