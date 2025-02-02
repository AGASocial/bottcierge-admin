import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import {
  fetchVenueDetails,
  updateVenueThunk,
} from "../store/slices/venueSlice";
import { getDayName, formatTime } from "../utils/orderConstants";
import { Venue } from "@/types/venue.types";

const BusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentVenue } = useSelector((state: RootState) => state.venue);
  const [venueData, setVenueData] = useState<Venue | null>(currentVenue);

  // Fetch venue data when component mounts or ID changes
  useEffect(() => {
    if (currentVenue?.id) {
      dispatch(fetchVenueDetails(currentVenue.id));
    }
  }, [currentVenue?.id, dispatch]);

  // Update local state when currentVenue changes
  useEffect(() => {
    setVenueData(currentVenue);
  }, [currentVenue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (venueData && currentVenue?.id) {
      try {
        await dispatch(
          updateVenueThunk({ venueId: currentVenue.id, venueData: venueData })
        );
        navigate("/profile");
      } catch (error) {
        console.error("Failed to update venue:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <BuildingStorefrontIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Business Information</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form content will be preserved */}
          <div className="space-y-6">
            {/* Name Section */}
            <div className="glass-card p-6">
              {/* <h2 className="text-xl font-semibold text-electric-blue mb-4">Name</h2> */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={venueData?.name || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={venueData?.description || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Address
              </h2>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={venueData?.address || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, address: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={venueData?.city || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, city: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={venueData?.state || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, state: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={venueData?.zipCode || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, zipCode: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Contact
              </h2>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={venueData?.phoneNumber || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, phoneNumber: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="socialMedia"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Social Media
                </label>
                {Object.entries(venueData?.socialMedia || {}).map(
                  ([key, value], index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        name={`socialMediaKey${index}`}
                        defaultValue={key}
                        placeholder="Platform"
                        className="w-1/4 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue mr-2"
                      />
                      <input
                        type="url"
                        name={`socialMediaValue${index}`}
                        value={value}
                        onChange={(e) => {
                          if (venueData) {
                            const updatedSocialMedia = {
                              ...venueData.socialMedia,
                              [key]: e.target.value,
                            };
                            setVenueData({
                              ...venueData,
                              socialMedia: updatedSocialMedia,
                            });
                          }
                        }}
                        placeholder="URL"
                        className="w-3/4 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                      />
                    </div>
                  )
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={venueData?.email || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={venueData?.website || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, website: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>
            </div>

            {/* Operating Hours Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Hours
              </h2>
              <div>
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Timezone
                </label>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={venueData?.timezone || ""}
                  onChange={(e) =>
                    venueData &&
                    setVenueData({ ...venueData, timezone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="operatingHours"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Operating Hours
                </label>
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                    const dayHours = venueData?.operatingHours?.find(
                      (h) => h.dayOfWeek === day
                    ) || {
                      dayOfWeek: day,
                      open: "0000",
                      close: "0000",
                      isOpen: false,
                    };
                    return (
                      <div
                        key={day}
                        className="flex items-center space-x-4 p-2 bg-white/5 rounded-lg"
                      >
                        <div className="w-24 font-medium">
                          {getDayName(day)}
                        </div>
                        <input
                          type="checkbox"
                          checked={dayHours.isOpen}
                          onChange={(e) => {
                            if (venueData) {
                              const updatedHours = [
                                ...(venueData.operatingHours || []),
                              ];
                              const dayIndex = updatedHours.findIndex(
                                (h) => h.dayOfWeek === day
                              );
                              const newHours = {
                                dayOfWeek: day,
                                open: e.target.checked ? "1600" : "0000",
                                close: e.target.checked ? "0200" : "0000",
                                isOpen: e.target.checked,
                              };
                              if (dayIndex >= 0) {
                                updatedHours[dayIndex] = newHours;
                              } else {
                                updatedHours.push(newHours);
                              }
                              setVenueData({
                                ...venueData,
                                operatingHours: updatedHours,
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="flex space-x-2">
                            <select
                              value={dayHours.open.substring(0, 2)}
                              onChange={(e) => {
                                if (venueData) {
                                  const updatedHours = [
                                    ...(venueData.operatingHours || []),
                                  ];
                                  const dayIndex = updatedHours.findIndex(
                                    (h) => h.dayOfWeek === day
                                  );
                                  const newTime =
                                    e.target.value.padStart(2, "0") +
                                    dayHours.open.substring(2);
                                  if (dayIndex >= 0) {
                                    updatedHours[dayIndex] = {
                                      ...updatedHours[dayIndex],
                                      open: newTime,
                                    };
                                  } else {
                                    updatedHours.push({
                                      dayOfWeek: day,
                                      open: newTime,
                                      close: "0200",
                                      isOpen: true,
                                    });
                                  }
                                  setVenueData({
                                    ...venueData,
                                    operatingHours: updatedHours,
                                  });
                                }
                              }}
                              disabled={!dayHours.isOpen}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white w-20"
                            >
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <option
                                    key={hour}
                                    value={hour.toString().padStart(2, "0")}
                                  >
                                    {hour === 0
                                      ? "12 AM"
                                      : hour < 12
                                      ? `${hour} AM`
                                      : hour === 12
                                      ? "12 PM"
                                      : `${hour - 12} PM`}
                                  </option>
                                )
                              )}
                            </select>
                            <select
                              value={dayHours.open.substring(2)}
                              onChange={(e) => {
                                if (venueData) {
                                  const updatedHours = [
                                    ...(venueData.operatingHours || []),
                                  ];
                                  const dayIndex = updatedHours.findIndex(
                                    (h) => h.dayOfWeek === day
                                  );
                                  const newTime =
                                    dayHours.open.substring(0, 2) +
                                    e.target.value;
                                  if (dayIndex >= 0) {
                                    updatedHours[dayIndex] = {
                                      ...updatedHours[dayIndex],
                                      open: newTime,
                                    };
                                  } else {
                                    updatedHours.push({
                                      dayOfWeek: day,
                                      open: newTime,
                                      close: "0200",
                                      isOpen: true,
                                    });
                                  }
                                  setVenueData({
                                    ...venueData,
                                    operatingHours: updatedHours,
                                  });
                                }
                              }}
                              disabled={!dayHours.isOpen}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white w-20"
                            >
                              {[0, 15, 30, 45].map((minutes) => (
                                <option
                                  key={minutes}
                                  value={minutes.toString().padStart(2, "0")}
                                >
                                  {minutes.toString().padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex space-x-2">
                            <select
                              value={dayHours.close.substring(0, 2)}
                              onChange={(e) => {
                                if (venueData) {
                                  const updatedHours = [
                                    ...(venueData.operatingHours || []),
                                  ];
                                  const dayIndex = updatedHours.findIndex(
                                    (h) => h.dayOfWeek === day
                                  );
                                  const newTime =
                                    e.target.value.padStart(2, "0") +
                                    dayHours.close.substring(2);
                                  if (dayIndex >= 0) {
                                    updatedHours[dayIndex] = {
                                      ...updatedHours[dayIndex],
                                      close: newTime,
                                    };
                                  } else {
                                    updatedHours.push({
                                      dayOfWeek: day,
                                      open: "1600",
                                      close: newTime,
                                      isOpen: true,
                                    });
                                  }
                                  setVenueData({
                                    ...venueData,
                                    operatingHours: updatedHours,
                                  });
                                }
                              }}
                              disabled={!dayHours.isOpen}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white w-20"
                            >
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <option
                                    key={hour}
                                    value={hour.toString().padStart(2, "0")}
                                  >
                                    {hour === 0
                                      ? "12 AM"
                                      : hour < 12
                                      ? `${hour} AM`
                                      : hour === 12
                                      ? "12 PM"
                                      : `${hour - 12} PM`}
                                  </option>
                                )
                              )}
                            </select>
                            <select
                              value={dayHours.close.substring(2)}
                              onChange={(e) => {
                                if (venueData) {
                                  const updatedHours = [
                                    ...(venueData.operatingHours || []),
                                  ];
                                  const dayIndex = updatedHours.findIndex(
                                    (h) => h.dayOfWeek === day
                                  );
                                  const newTime =
                                    dayHours.close.substring(0, 2) +
                                    e.target.value;
                                  if (dayIndex >= 0) {
                                    updatedHours[dayIndex] = {
                                      ...updatedHours[dayIndex],
                                      close: newTime,
                                    };
                                  } else {
                                    updatedHours.push({
                                      dayOfWeek: day,
                                      open: "1600",
                                      close: newTime,
                                      isOpen: true,
                                    });
                                  }
                                  setVenueData({
                                    ...venueData,
                                    operatingHours: updatedHours,
                                  });
                                }
                              }}
                              disabled={!dayHours.isOpen}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white w-20"
                            >
                              {[0, 15, 30, 45].map((minutes) => (
                                <option
                                  key={minutes}
                                  value={minutes.toString().padStart(2, "0")}
                                >
                                  {minutes.toString().padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing Rules Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Pricing Rules
              </h2>
              <div>
                {Object.entries(venueData?.pricingRules || {}).map(
                  ([key, value], index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        name={`pricingRulesKey${index}`}
                        defaultValue={key}
                        placeholder="Platform"
                        readOnly
                        className="w-1/4 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue mr-2"
                      />

                      <div className="relative w-3/4">
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                          $
                        </div>
                        <input
                          type="number"
                          name={`pricingRulesValue${index}`}
                          value={value}
                          onChange={(e) => {
                            if (venueData) {
                              const updatedPricingRules = {
                                ...venueData.pricingRules,
                                [key]: Number(e.target.value),
                              };
                              setVenueData({
                                ...venueData,
                                pricingRules: updatedPricingRules,
                              });
                            }
                          }}
                          placeholder="Amount"
                          className="w-full pl-6 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Payments Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Payments
              </h2>
              <div>
                <label
                  htmlFor="taxRate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Tax Rate
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-300 sm:text-sm">%</span>
                  </span>
                  <input
                    type="number"
                    id="taxRate"
                    name="taxRate"
                    value={venueData?.taxRate || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value >= 0 && value <= 100 && venueData) {
                        setVenueData({ ...venueData, taxRate: value });
                      }
                    }}
                    min="0"
                    max="100"
                    step="0.001"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Methods
                </label>
                {venueData?.paymentAccepted.map((payment, index) => (
                  <div key={payment.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`payment-${payment.id}`}
                      name="paymentAccepted"
                      checked={payment.isActive}
                      onChange={(e) => {
                        if (venueData) {
                          const updatedPayments = venueData.paymentAccepted.map(
                            (p, i) =>
                              i === index
                                ? { ...p, isActive: e.target.checked }
                                : p
                          );
                          setVenueData({
                            ...venueData,
                            paymentAccepted: updatedPayments,
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`payment-${payment.id}`}
                      className="text-white"
                    >
                      {payment.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-electric-blue"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessInfo;
