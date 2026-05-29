import { useEffect, useCallback } from "react";
export function useAtajoTeclado(
    tecla,
    callback,
    {
        ctrl = false,
        alt = false,
        shift = false,
        ignorarInputs = true,
        activo = true,
    } = {}
) {
const handler = useCallback(
    (e) => {
    if (!activo) return;

    if (ignorarInputs) {
        const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    }

        if (ctrl && !e.ctrlKey) return;
        if (alt && !e.altKey) return;
        if (shift && !e.shiftKey) return;
        const teclaPresionada = e.key.toLowerCase();
        const teclaEsperada = tecla.toLowerCase();
        if (teclaPresionada !== teclaEsperada) return;
        if (ctrl || alt) e.preventDefault();

        callback(e);
        },
        [tecla, callback, ctrl, alt, shift, ignorarInputs, activo]
    );

useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
        window.removeEventListener("keydown", handler);
        };
    }, [handler]);
}