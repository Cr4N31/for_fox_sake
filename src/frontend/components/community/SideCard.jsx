import TavernCard from "./TavernCard"
import QuoteCard from "./QuoteCard"
function SideCard({ tavernLinks, quote, quoteAttribution }) {
  return (
    <aside className="flex flex-col gap-3.5">
      <TavernCard links={tavernLinks} />
      <QuoteCard quote={quote} attribution={quoteAttribution} />
    </aside>
  );
}
export default SideCard
