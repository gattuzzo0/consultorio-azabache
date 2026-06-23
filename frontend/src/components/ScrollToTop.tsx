import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de ruta, sube al inicio (las SPAs no lo hacen solas). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
