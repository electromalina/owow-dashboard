import { CardPlaceholder } from "@/src/components/ui/CardPlaceholder";
// Home page content area composed of placeholder cards for noww.
import KeyDocuments from "@/src/components/widgets/KeyDocuments";
import UpdatesWidget from "@/src/components/widgets/UpdatesWidget";

export default function Home() {
  return (
    <>
      <CardPlaceholder className="min-h-36" />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <CardPlaceholder className="min-h-56" />
        <CardPlaceholder className="min-h-56" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,1fr)]">
        <KeyDocuments/>
        <CardPlaceholder className="min-h-72" />
        <UpdatesWidget />
      </div>
    </>
  );
}
