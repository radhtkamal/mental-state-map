import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "../components/DatePicker";
import StateTaskSection from "../components/StateTaskSection";
import TaskSummary from "../components/TaskSummary";

const TaskLogger = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState({});

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

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("mentalStateTasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mentalStateTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Initialize input state for current date
  useEffect(() => {
    const dateData = tasks[selectedDate] || {};
    const inputData = {};
    states.forEach((state) => {
      inputData[state.id] = "";
    });
    setTaskInput(inputData);
  }, [selectedDate, tasks]);

  const addTask = (stateId) => {
    const taskText = taskInput[stateId]?.trim();
    if (!taskText) return;

    const now = new Date().toISOString();
    const newTask = {
      id: `${now}-${Math.random()}`,
      task: taskText,
      timestamp: now,
    };

    setTasks((prev) => {
      const dateData = prev[selectedDate] || {};
      return {
        ...prev,
        [selectedDate]: {
          ...dateData,
          [stateId]: [...(dateData[stateId] || []), newTask],
        },
      };
    });

    // Clear input
    setTaskInput((prev) => ({
      ...prev,
      [stateId]: "",
    }));
  };

  const deleteTask = (stateId, taskId) => {
    setTasks((prev) => {
      const dateData = prev[selectedDate] || {};
      return {
        ...prev,
        [selectedDate]: {
          ...dateData,
          [stateId]: (dateData[stateId] || []).filter(
            (task) => task.id !== taskId
          ),
        },
      };
    });
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
      </div>
    </div>
  );
};

export default TaskLogger;
