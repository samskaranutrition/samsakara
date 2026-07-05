import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { PageMetaKey } from "@/lib/i18n/page-meta-types";

export function usePageMeta(page: PageMetaKey) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;

  useEffect(() => {
    const title = t(`pageMeta.${page}.title`);
    const description = t(`pageMeta.${page}.description`);
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [page, lang, t]);
}
