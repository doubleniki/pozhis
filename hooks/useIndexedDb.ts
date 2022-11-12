import { useEffect, useState } from "react";

export const useIndexedDb = (dbName: string, storeName: string, version: number = 1) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    if (indexedDB) {
      const request = indexedDB.open(storeName, version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("id", "id", { unique: true });
        objectStore.createIndex("task", "task", { unique: false });
      };

      request.onerror = (event) => {
        console.error("Error opening database", event);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.onversionchange = () => {
          db.close();
          alert("Database is outdated, please reload the page.");
        };
        setDb((event.target as IDBOpenDBRequest).result);
      };
    }
  }, [dbName, storeName, version]);

  useEffect(() => {
    return () => {
      if (db) {
        db.close();
      }
    };
  }, [db]);


  return db;
}
