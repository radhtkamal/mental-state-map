// Export data as JSON file
export const exportDataAsJSON = (data, filename = "mental-state-map-backup") => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import data from JSON file
export const importDataFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (err) {
        reject(new Error("Invalid JSON file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

// Create downloadable CSV for task summary
export const exportTasksAsCSV = (tasks, filename = "mental-state-tasks") => {
  let csv = "Date,State,Task,Time\n";

  Object.entries(tasks).forEach(([date, stateData]) => {
    Object.entries(stateData).forEach(([state, taskList]) => {
      if (Array.isArray(taskList)) {
        taskList.forEach((task) => {
          const time = new Date(task.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });
          csv += `"${date}","${state}","${task.task.replace(/"/g, '""')}","${time}"\n`;
        });
      }
    });
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

