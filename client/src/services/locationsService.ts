import apiService from "./api/apiService";

const locationsService = {
  getLocations: async () => {
    const locationResponse = await apiService.get<string[]>("/locations");

    return locationResponse.data;
  },
};

export default locationsService;
