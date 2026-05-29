import { useState, useEffect, useCallback } from "react";

export function useFetch(url, opciones = {}) {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [contador, setContador] = useState(0); 

    const refetch = useCallback(() => {
        setContador((c) => c + 1);
    }, []);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        async function ejecutarFetch() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, { ...opciones, signal });
            if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const json = await res.json();
            if (!signal.aborted) {
            setData(json);
            }
        } catch (err) {
            if (err.name !== "AbortError" && !signal.aborted) {
            setError(err.message);
            }
        } finally {
            if (!signal.aborted) {
            setLoading(false);
            }
        }
        }

        ejecutarFetch();

        return () => {
        controller.abort();
        };
    }, [url, contador]);

    return { data, loading, error, refetch };
}