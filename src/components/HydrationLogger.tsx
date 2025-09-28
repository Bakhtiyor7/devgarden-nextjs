"use client";

import { useEffect } from "react";

export default function HydrationFix() {
  // Clean up extension attributes immediately when component mounts
  useEffect(() => {
    const cleanupExtensionAttributes = () => {
      const body = document.body;
      const extensionAttrs = [
        "bis_register",
        "bis_skin_checked",
        "__processed_", // matches any __processed_* attributes
      ];

      extensionAttrs.forEach((attr) => {
        if (attr.endsWith("_")) {
          // Handle pattern matching like __processed_*
          const pattern = attr.slice(0, -1);
          Array.from(body.attributes).forEach((a) => {
            if (a.name.startsWith(pattern)) {
              body.removeAttribute(a.name);
            }
          });
        } else if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    };

    // Run cleanup immediately
    cleanupExtensionAttributes();

    // Set up a mutation observer to catch future extension injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.target === document.body
        ) {
          const attrName = mutation.attributeName;
          if (
            attrName &&
            (attrName === "bis_register" ||
              attrName === "bis_skin_checked" ||
              attrName.startsWith("__processed_"))
          ) {
            document.body.removeAttribute(attrName);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: undefined, // watch all attributes
    });

    // Also run the diagnostic logging
    async function run() {
      try {
        const html = document.documentElement;
        const body = document.body;

        const attrs = (el: Element) =>
          Array.from(el.attributes).reduce(
            (acc, a) => {
              acc[a.name] = a.value;
              return acc;
            },
            {} as Record<string, string>
          );

        // Client-side attrs
        // eslint-disable-next-line no-console
        console.info("HydrationLogger: html attrs", attrs(html));
        // eslint-disable-next-line no-console
        console.info("HydrationLogger: body attrs", attrs(body));

        // Fetch server-rendered HTML for the same URL so we can compare
        // server <body> attrs vs client DOM attrs.
        const resp = await fetch(window.location.href, { cache: "no-store" });
        const text = await resp.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const serverBody = doc.body;
        const serverAttrs = attrs(serverBody);
        // eslint-disable-next-line no-console
        console.info("HydrationLogger: server body attrs", serverAttrs);

        // compute a simple diff
        const clientAttrs = attrs(body);
        const allKeys = new Set([
          ...Object.keys(serverAttrs),
          ...Object.keys(clientAttrs),
        ]);
        const diffs: {
          onlyOnServer: Record<string, string>;
          onlyOnClient: Record<string, string>;
          different: Record<string, { server: string; client: string }>;
        } = { onlyOnServer: {}, onlyOnClient: {}, different: {} };

        allKeys.forEach((k) => {
          const s = serverAttrs[k];
          const c = clientAttrs[k];
          if (s !== undefined && c === undefined) diffs.onlyOnServer[k] = s;
          else if (s === undefined && c !== undefined)
            diffs.onlyOnClient[k] = c;
          else if (s !== undefined && c !== undefined && s !== c)
            diffs.different[k] = { server: s, client: c };
        });

        // eslint-disable-next-line no-console
        console.info("HydrationLogger: attr diffs", diffs);

        // Clean up known extension-injected attributes to prevent hydration errors
        const extensionAttrs = [
          "bis_register",
          "bis_skin_checked",
          "__processed_", // matches any __processed_* attributes
        ];

        extensionAttrs.forEach((attr) => {
          if (attr.endsWith("_")) {
            // Handle pattern matching like __processed_*
            const pattern = attr.slice(0, -1);
            Array.from(body.attributes).forEach((a) => {
              if (a.name.startsWith(pattern)) {
                // eslint-disable-next-line no-console
                console.info(
                  `HydrationFix: Removing extension attribute: ${a.name}`
                );
                body.removeAttribute(a.name);
              }
            });
          } else if (body.hasAttribute(attr)) {
            // eslint-disable-next-line no-console
            console.info(`HydrationFix: Removing extension attribute: ${attr}`);
            body.removeAttribute(attr);
          }
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("HydrationFix failed", e);
      }
    }

    run();

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  return null;
}
