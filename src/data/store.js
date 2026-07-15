import { useCallback, useEffect, useState } from 'react';
import * as seed from './mockData';

const KEY = 'helix-mock-store-v1';
const clone = (value) => JSON.parse(JSON.stringify(value));

export function readStore() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? { ...clone(seed), ...JSON.parse(saved) } : clone(seed);
  } catch {
    return clone(seed);
  }
}

export function writeStore(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('helix-store-change'));
  return next;
}

export function useStore() {
  const [data, setData] = useState(readStore);
  useEffect(() => {
    const refresh = () => setData(readStore());
    window.addEventListener('helix-store-change', refresh);
    return () => window.removeEventListener('helix-store-change', refresh);
  }, []);
  const update = useCallback((key, updater) => {
    const current = readStore();
    const value = typeof updater === 'function' ? updater(current[key]) : updater;
    const next = { ...current, [key]: value };
    setData(writeStore(next));
    return value;
  }, []);
  return { data, update };
}

export function resetStore() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('helix-store-change'));
}
