"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faqs";

function FaqRow({
  item,
  index,
  idPrefix,
}: {
  item: FaqItem;
  index: number;
  idPrefix: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `${idPrefix}-panel-${index}`;
  const headerId = `${idPrefix}-header-${index}`;

  return (
    <div>
      <button
        type="button"
        id={headerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left font-heading text-base font-semibold text-dmz-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dmz-accent"
      >
        {item.question}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center bg-dmz-soft text-dmz-dark transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${open ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-dmz-border/80 px-5 pb-5 pt-0 text-sm leading-relaxed text-dmz-text">
            <p className="pt-4">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionStack({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix: string;
}) {
  return (
    <div className="divide-y divide-dmz-border border border-dmz-border bg-dmz-white">
      {items.map((item, i) => (
        <FaqRow key={`${item.question}-${i}`} item={item} index={i} idPrefix={idPrefix} />
      ))}
    </div>
  );
}

/** Single-column accordion (original bordered stack) */
export function FaqAccordion({
  items,
  idPrefix = "faq",
}: {
  items: FaqItem[];
  idPrefix?: string;
}) {
  return <AccordionStack items={items} idPrefix={idPrefix} />;
}

/** Two-column layout; each column matches the original single-stack design */
export function FaqAccordionTwoColumn({
  left,
  right,
  idPrefix = "faq",
}: {
  left: FaqItem[];
  right: FaqItem[];
  idPrefix?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <AccordionStack items={left} idPrefix={`${idPrefix}-l`} />
      <AccordionStack items={right} idPrefix={`${idPrefix}-r`} />
    </div>
  );
}
