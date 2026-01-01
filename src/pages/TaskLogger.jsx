import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "../components/DatePicker";
import StateTaskSection from "../components/StateTaskSection";
import TaskSummary from "../components/TaskSummary";
import DataBackup from "../components/DataBackup";
import { useTaskData } from "../hooks/useIndexedDB";

const TaskLogger = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [taskInput, setTaskInput] = useState({});
  const { tasks, loading, error, saveTasksForDate } = useTaskData();

  const states = [
    {
      id: "clear",
      emoji: "🌤",
      name: "Clear / Focused",
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-900",
      accentColor: "bg-amber-100",
    },
    {
      id: "noisy",
      emoji: "🌊",
      name: "Noisy but Functional",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-900",
      accentColor: "bg-blue-100",
    },
    {
      id: "overwhelmed",
      emoji: "🌧",
      name: "Overwhelmed",
      color: "bg-slate-50 border-slate-300",
      textColor: "text-slate-900",
      accentColor: "bg-slate-200",
    },
    {
      id: "low",
      emoji: "🌙",
      name: "Low Energy",
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-900",
      accentColor: "bg-indigo-100",
    },
  ];


  // Initialize input state for current date
  useEffect(() => {
    const dateData = tasks[selectedDate] || {};
    const inputData = {};
    states.forEach((state) => {
      inputData[state.id] = "";
    });
    setTaskInput(inputData);
  }, [selectedDate, tasks]);

  const addTask = async (stateId) => {
    const taskText = taskInput[stateId]?.trim();
    if (!taskText) return;

    const now = new Date().toISOString();
    const newTask = {
      id: `${now}-${Math.random()}`,
      task: taskText,
      timestamp: now,
    };

    const dateData = tasks[selectedDate] || {};
    const updatedDateData = {
      ...dateData,
      [stateId]: [...(dateData[stateId] || []), newTask],
    };

    await saveTasksForDate(selectedDate, updatedDateData);

    // Clear input
    setTaskInput((prev) => ({
      ...prev,
      [stateId]: "",
    }));
  };

  const deleteTask = async (stateId, taskId) => {
    const dateData = tasks[selectedDate] || {};
    const updatedDateData = {
      ...dateData,
      [stateId]: (dateData[stateId] || []).filter((task) => task.id !== taskId),
    };

    await saveTasksForDate(selectedDate, updatedDateData);
  };

  const getDateData = () => tasks[selectedDate] || {};

  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600">Loading your task data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-900">
            Error loading data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 font-medium"
          >
            ← Back to Weather Map
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-2">
            Daily Task Log
          </h1>
          <p className="text-slate-600">
            What did you accomplish in each state today?
          </p>
        </div>

        {/* Date Picker */}
        <div className="mb-8">
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <p className="text-sm text-slate-600 mt-2">
            Viewing: <strong>{formatDateDisplay(selectedDate)}</strong>
          </p>
        </div>

        {/* State Task Sections */}
        <div className="space-y-6 mb-8">
          {states.map((state) => {
            const dateData = getDateData();
            const stateTasks = dateData[state.id] || [];

            return (
              <StateTaskSection
                key={state.id}
                state={state}
                tasks={stateTasks}
                inputValue={taskInput[state.id] || ""}
                onInputChange={(value) =>
                  setTaskInput((prev) => ({ ...prev, [state.id]: value }))
                }
                onAddTask={() => addTask(state.id)}
                onDeleteTask={(taskId) => deleteTask(state.id, taskId)}
              />
            );
          })}
        </div>

        {/* Summary */}
        <TaskSummary tasks={getDateData()} states={states} />

        {/* Data Backup */}
        <div className="mt-8">
          <DataBackup
            mentalStateData={{}}
            tasksData={tasks}
            onImportComplete={(data) => {
              if (data.tasks) {
                Object.entries(data.tasks).forEach(([date, dateData]) => {
                  saveTasksForDate(date, dateData);
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskLogger;
