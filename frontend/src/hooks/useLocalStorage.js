import { useState, useEffect } from "react";

export function useLocalStorage(key, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
        const guardado = localStorage.getItem(key);
        return guardado !== null ? JSON.parse(guardado) : valorInicial;
        } catch (error) {
        console.warn(`useLocalStorage: error leyendo clave "${key}"`, error);
        return valorInicial;
        }
    });

    useEffect(() => {
        try {
        localStorage.setItem(key, JSON.stringify(valor));
        } catch (error) {
        console.warn(`useLocalStorage: error guardando clave "${key}"`, error);
        }
    }, [key, valor]);

    return [valor, setValor];
    }