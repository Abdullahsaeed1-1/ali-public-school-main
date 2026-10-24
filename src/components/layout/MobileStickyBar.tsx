import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/data/site";

export function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-ink/10 bg-paper/95 p-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button
        href={whatsappUrl(
          "Assalam-o-Alaikum, I would like to start the admissions process."
        )}
        variant="solid"
        className="w-full"
      >
        WhatsApp Admissions Office
      </Button>
    </div>
  );
}
