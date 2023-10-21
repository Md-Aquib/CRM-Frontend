import axios from "axios";

const BASE_URL = "http://localhost:8000";

const locationAPI = {
    createLocation: async (locationData, authToken) => {
        try {
            let response = await fetch(`${BASE_URL}/api/location`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    id: locationData.id,
                }),
            });
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    hasLocation: async (authToken, id) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/location/has_location/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateLocation: async (locationId, locationData, authToken) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/location/${locationId}`,
                locationData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getLocationByID: async (locationID, authToken) => {
        try {
            let response = await fetch(
                `${BASE_URL}/api/location/salespersons/${locationID}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
};

export default locationAPI;
