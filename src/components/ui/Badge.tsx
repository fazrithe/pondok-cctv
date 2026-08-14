import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-700",
  Diskon: "bg-rose-100 text-rose-700",
  Premium: "bg-violet-100 text-violet-700",
  Termurah: "bg-emerald-100 text-emerald-700",
  default: "bg-brand-100 text-brand-700",
};

export default function Badge({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const style = styles[children] || styles.default;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        style,
        className
      )}
    >
      {children}
    </span>
  );
}
