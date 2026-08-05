function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="whitespace-nowrap">Sap xep</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-10 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Sap xep san pham"
      >
        <option value="newest">Moi nhat</option>
        <option value="price-asc">Gia tang dan</option>
        <option value="price-desc">Gia giam dan</option>
        <option value="name-asc">Ten A-Z</option>
      </select>
    </label>
  );
}

export default SortSelect;
