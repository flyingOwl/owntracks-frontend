import L from "leaflet";

import config from "@/config";
import { distanceBetweenCoordinates } from "@/util";

/**
 * Apply filters to the selected users' and devices' location histories.
 *
 * @param {State} state
 * @param {LocationHistory} state.locationHistory
 *   Location history of selected users and devices
 * @returns {LocationHistory} Filtered location history
 */
const filteredLocationHistory = (state) => {
  const locationHistory = {};
  Object.keys(state.locationHistory).forEach((user) => {
    locationHistory[user] = {};
    Object.keys(state.locationHistory[user]).forEach((device) => {
      locationHistory[user][device] = [];
      state.locationHistory[user][device].forEach((location) => {
        if (
          config.filters.minAccuracy !== null &&
          location.acc > config.filters.minAccuracy
        )
          return;
        locationHistory[user][device].push(location);
      });
    });
  });
  return locationHistory;
};

/**
 * From the selected users' and devices' location histories, create an
 * array of all coordinates.
 *
 * @param {State} state
 * @returns {L.LatLng[]} All coordinates
 */
const filteredLocationHistoryLatLngs = (state) => {
  const latLngs = [];
  const locationHistory = filteredLocationHistory(state);
  Object.keys(locationHistory).forEach((user) => {
    Object.keys(locationHistory[user]).forEach((device) => {
      locationHistory[user][device].forEach((location) => {
        latLngs.push(L.latLng(location.lat, location.lon));
      });
    });
  });
  return latLngs;
};

/**
 * From the selected users' and devices' location histories, create an
 * array of coordinate groups where the distance between two subsequent
 * coordinates does not exceed `config.map.maxPointDistance`.
 *
 * @param {State} state
 * @returns {L.LatLng[][]} Groups of coherent coordinates
 */
const filteredLocationHistoryLatLngGroups = (state) => {
  const groups = [];
  const locationHistory = filteredLocationHistory(state);
  Object.keys(locationHistory).forEach((user) => {
    Object.keys(locationHistory[user]).forEach((device) => {
      let latLngs = [];
      let lastTst = 0;
      locationHistory[user][device].forEach((location) => {
        const latLng = L.latLng(location.lat, location.lon);
        // Skip if group splitting is disabled or this is the first
        // coordinate in the current group
        let splitByDistance =
          typeof config.map.maxPointDistance === "number" &&
          config.map.maxPointDistance > 0;
        let splitByTimeOffset =
          typeof config.map.maxTimeOffset === "number" &&
          config.map.maxTimeOffset > 0;
        if ((splitByDistance || splitByTimeOffset) && latLngs.length > 0) {
          const lastLatLng = latLngs.slice(-1)[0];
          const distance = distanceBetweenCoordinates(lastLatLng, latLng);
          const timeOffset = location.tst - lastTst;
          if (
            (splitByDistance && distance > config.map.maxPointDistance) ||
            (splitByTimeOffset && timeOffset > config.map.maxTimeOffset)
          ) {
            // Distance is too far, start new group of coordinate
            groups.push(latLngs);
            latLngs = [];
            lastTst = 0;
          }
        }
        // Add coordinate to current active group
        latLngs.push(latLng);
        lastTst = location.tst;
      });
      groups.push(latLngs);
    });
  });
  return groups;
};

export default {
  filteredLocationHistory,
  filteredLocationHistoryLatLngs,
  filteredLocationHistoryLatLngGroups,
};
