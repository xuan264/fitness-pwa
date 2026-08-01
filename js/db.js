// IndexedDB Promise 化封装
const DB_NAME = 'fitness-pwa-db';
const DB_VERSION = 1;

class FitnessDB {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('progress')) {
          const s = db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
          s.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains('workoutLog')) {
          const s = db.createObjectStore('workoutLog', { keyPath: 'id', autoIncrement: true });
          s.createIndex('date', 'date', { unique: false });
          s.createIndex('week', 'week', { unique: false });
        }

        if (!db.objectStoreNames.contains('mealLog')) {
          const s = db.createObjectStore('mealLog', { keyPath: 'id', autoIncrement: true });
          s.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains('reminders')) {
          db.createObjectStore('reminders', { keyPath: 'id', autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('userProfile')) {
          db.createObjectStore('userProfile', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  }

  _tx(storeName, mode = 'readonly') {
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }

  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName, 'readwrite').add(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const store = this._tx(storeName);
      const index = store.index(indexName);
      const req = index.getAll(value);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async put(storeName, data) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName, 'readwrite').put(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName, 'readwrite').delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async clear(storeName) {
    return new Promise((resolve, reject) => {
      const req = this._tx(storeName, 'readwrite').clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // ===== 数据导出 =====
  async exportAll() {
    const stores = ['progress', 'workoutLog', 'mealLog', 'reminders', 'userProfile', 'settings'];
    const data = {};
    for (const store of stores) {
      try {
        data[store] = await this.getAll(store);
      } catch (e) {
        data[store] = [];
      }
    }
    return {
      version: DB_VERSION,
      exportDate: new Date().toISOString(),
      data
    };
  }

  // ===== 数据导入 =====
  async importAll(jsonData, replace = true) {
    const stores = ['progress', 'workoutLog', 'mealLog', 'reminders', 'userProfile', 'settings'];
    const result = { success: 0, skipped: 0 };

    for (const store of stores) {
      const records = jsonData.data?.[store] || jsonData[store] || [];
      if (replace) {
        try { await this.clear(store); } catch (e) {}
      }
      for (const record of records) {
        try {
          // 移除自增 id，让数据库重新分配
          const { id, ...recordWithoutId } = record;
          await this.add(store, recordWithoutId);
          result.success++;
        } catch (e) {
          result.skipped++;
        }
      }
    }
    return result;
  }
}

export const db = new FitnessDB();
