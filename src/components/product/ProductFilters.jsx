import Input from '../ui/Input.jsx';

function ProductFilters({ categories, values, onChange, onReset }) {
  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="product-category"
          className="block text-sm font-medium text-foreground"
        >
          Danh mục
        </label>
        <select
          id="product-category"
          value={values.category}
          onChange={(event) => onChange('category', event.target.value)}
          className="mt-1.5 block min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-foreground">
          Khoảng giá
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="minimum-price"
            label="Từ"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="0"
            value={values.minPrice}
            onChange={(event) => onChange('minPrice', event.target.value)}
          />
          <Input
            id="maximum-price"
            label="Đến"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Không giới hạn"
            value={values.maxPrice}
            onChange={(event) => onChange('maxPrice', event.target.value)}
          />
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={values.inStock}
          onChange={(event) => onChange('inStock', event.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent focus:ring-accent"
        />
        Chỉ hiện sản phẩm còn hàng
      </label>

      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none"
      >
        Đặt lại bộ lọc
      </button>
    </div>
  );
}

export default ProductFilters;
