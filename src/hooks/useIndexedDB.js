import { useEffect, useState } from "react";

const DB_NAME = "MentalStateMap";
const DB_VERSION = 1;

// Initialize database schema
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object store for mental state data
      if (!db.objectStoreNames.contains("mentalState")) {
        db.createObjectStore("mentalState", { keyPath: "id" });
      }

      // Create object store for tasks
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "date" });
      }
    };
  });
};

// Generic get operation
const getFromDB = (storeName, key) => {
  return new Promise((resolve, reject) => {
    initDB().then((db) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  });
};

// Generic put/update operation
const putToDB = (storeName, data) => {
  return new Promise((resolve, reject) => {
    initDB().then((db) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  });
};

// Get all from store
const getAllFromDB = (storeName) => {
  return new Promise((resolve, reject) => {
    initDB().then((db) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  });
};

// Delete from store
const deleteFromDB = (storeName, key) => {
  return new Promise((resolve, reject) => {
    initDB().then((db) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  });
};

// Hook for mental state check-ins
export const useMentalStateData = () => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getFromDB("mentalState", "current");
        setState(data || null);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const saveState = async (newState) => {
    try {
      const dataToSave = {
        id: "current",
        ...newState,
      };
      await putToDB("mentalState", dataToSave);
      setState(dataToSave);
      return dataToSave;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const clearState = async () => {
    try {
      await deleteFromDB("mentalState", "current");
      setState(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { state, loading, error, saveState, clearState };
};

// Hook for task data
export const useTaskData = () => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const allTasks = await getAllFromDB("tasks");
        const tasksObj = {};

        allTasks.forEach((item) => {
          tasksObj[item.date] = item.data;
        });

        setTasks(tasksObj);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      const allDates = Object.keys(newTasks);

      for (const date of allDates) {
        await putToDB("tasks", {
          date,
          data: newTasks[date],
        });
      }

      setTasks(newTasks);
      return newTasks;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const saveTasksForDate = async (date, dateData) => {
    try {
      await putToDB("tasks", {
        date,
        data: dateData,
      });

      setTasks((prev) => ({
        ...prev,
        [date]: dateData,
      }));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteAllTasks = async () => {
    try {
      const allTasks = await getAllFromDB("tasks");
      for (const task of allTasks) {
        await deleteFromDB("tasks", task.date);
      }
      setTasks({});
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    saveTasks,
    saveTasksForDate,
    deleteAllTasks,
  };
};

export default useTaskData;

