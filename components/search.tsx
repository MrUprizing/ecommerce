"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { ArrowUpRightIcon, SearchIcon } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import * as React from "react";

interface NavigationOption {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navigationOptions: NavigationOption[] = [
  {
    icon: (
      <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
    ),
    label: "Go to Home",
    href: "/",
  },
];

function filterProducts(query: string, products: Product[]): Product[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.type.toLowerCase().includes(lowerQuery),
  );
}

function getRandomProducts(products: Product[], count: number): Product[] {
  if (products.length <= count) return products;
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

interface SearchResultsProps {
  results: Product[];
  query: string;
  onSelect: (product: Product) => void;
}

function SearchResults({ results, query, onSelect }: SearchResultsProps) {
  if (!query.trim()) return null;
  if (results.length === 0)
    return (
      <CommandEmpty>
        <span className="text-muted-foreground">No products found.</span>
      </CommandEmpty>
    );
  return (
    <>
      {results.map((product) => (
        <CommandItem
          key={product.id}
          value={product.name}
          onSelect={() => onSelect(product)}
          className="flex items-center gap-3"
        >
          <img
            src={product.image}
            alt={product.name}
            width={32}
            height={32}
            loading="lazy"
            className="rounded object-cover w-8 h-8 border"
            style={{ minWidth: 32, minHeight: 32 }}
          />
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-xs text-muted-foreground">
              {product.type}
            </span>
          </div>
        </CommandItem>
      ))}
    </>
  );
}

interface QuickStartProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

function QuickStart({ products, onSelect }: QuickStartProps) {
  return (
    <CommandGroup heading="Quick start">
      {products.map((product) => (
        <CommandItem
          key={product.id}
          onSelect={() => onSelect(product)}
          className="flex items-center gap-3"
        >
          <img
            src={product.image}
            alt={product.name}
            width={28}
            height={28}
            loading="lazy"
            className="rounded object-cover w-7 h-7 border"
            style={{ minWidth: 28, minHeight: 28 }}
          />
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-xs text-muted-foreground">
              {product.type}
            </span>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useTransitionRouter();
  const results = React.useMemo(() => filterProducts(query, products), [query]);
  const quickStartProducts = React.useMemo(
    () => getRandomProducts(products, 3),
    [], // No dependencies needed; randomize only on mount
  );

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleProductSelect(product: Product) {
    setOpen(false);
    setQuery("");
    router.push(`/product/${product.id}`);
  }

  function handleNavigation(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-fit rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products by name or type..."
          value={query}
          onValueChange={setQuery}
          autoFocus
        />
        <CommandList>
          {query.trim() ? (
            <SearchResults
              results={results}
              query={query}
              onSelect={handleProductSelect}
            />
          ) : (
            <>
              <QuickStart
                products={quickStartProducts}
                onSelect={handleProductSelect}
              />
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                {navigationOptions.map((nav) => (
                  <CommandItem
                    key={nav.label}
                    onSelect={() => handleNavigation(nav.href)}
                  >
                    {nav.icon}
                    <span>{nav.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
