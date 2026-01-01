import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";
import { exportDataAsJSON, importDataFromJSON } from "../utils/exportData";

const DataBackup = ({
  mentalStateData,
  tasksData,
  onImportComplete,
}) => {
  const fileInputRef = useRef(null);

  const handleExportAll = async () => {
    const backupData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      mentalState: mentalStateData,
      tasks: tasksData,
    };

    exportDataAsJSON(backupData, "mental-state-map-full-backup");
  };

  const handleExportTasks = () => {
    const backupData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      tasks: tasksData,
    };

    exportDataAsJSON(backupData, "mental-state-tasks-backup");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await importDataFromJSON(file);

      if (onImportComplete) {
        onImportComplete(data);
      }

      alert("✓ Data imported successfully!");
    } catch (err) {
      alert(`✗ Import failed: ${err.message}`);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-800 mb-2">💾 Data Backup & Recovery</h3>
        <p className="text-sm text-slate-600">
          Export your data regularly for safekeeping. Great for backup before clearing
          browser data.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <button
          onClick={handleExportAll}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-900 rounded-lg transition font-medium text-sm"
        >
          <Download size={16} />
          Export All
        </button>

        <button
          onClick={handleExportTasks}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg transition font-medium text-sm"
        >
          <Download size={16} />
          Export Tasks
        </button>

        <button
          onClick={handleImportClick}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg transition font-medium text-sm"
        >
          <Upload size={16} />
          Import Data
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
        aria-label="Import backup file"
      />

      <p className="text-xs text-slate-500 mt-4">
        💡 Pro tip: Export your data weekly to keep a safe backup. You can import it
        anytime to restore.
      </p>
    </div>
  );
};

export default DataBackup;

