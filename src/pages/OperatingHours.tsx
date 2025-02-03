import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClockIcon } from "@heroicons/react/24/outline";
import type { RootState } from "../store";
import { getDayName } from "@/utils/orderConstants";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
});

const OperatingHours: React.FC = () => {
  const navigate = useNavigate();
  const { currentVenue } = useSelector((state: RootState) => state.venue);

  const getDefaultTime = (type: "open" | "close", day: number) => {
    const hours = currentVenue?.operatingHours?.find(
      (h) => h.dayOfWeek === day
    );
    if (type === "open") return hours?.open || "11:00 AM";
    return hours?.close || "10:00 PM";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save operating hours
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <ClockIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Operating Hours</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <div className="space-y-6">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-gray-300 font-medium">
                    {getDayName(day)}
                  </div>
                  <div>
                    <label htmlFor={`${day}-open`} className="sr-only">
                      Opening Time for {getDayName(day) || day}
                    </label>
                    <select
                      id={`${day}-open`}
                      name={`${day}-open`}
                      defaultValue={getDefaultTime("open", day)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                    >
                      {TIME_OPTIONS.map((time) => (
                        <option key={`${day}-open-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${day}-close`} className="sr-only">
                      Closing Time for {day}
                    </label>
                    <select
                      id={`${day}-close`}
                      name={`${day}-close`}
                      defaultValue={getDefaultTime("close", day)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                    >
                      {TIME_OPTIONS.map((time) => (
                        <option key={`${day}-close-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-electric-blue text-white rounded-lg hover:bg-electric-blue/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperatingHours;
