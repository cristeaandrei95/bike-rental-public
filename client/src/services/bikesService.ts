import apiService from "./api/apiService";
import { BikeParams, Bike, BikesResponse, BikeByIDParams } from "@types";

const bikesService = {
  getBikeById: async ({
    id,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
  }: BikeByIDParams) => {
    const bikeResponse = await apiService.get<Bike>(
      `/bikes/${id}?pickupLocation=${pickupLocation}&dropoffLocation=${dropoffLocation}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`
    );

    return bikeResponse.data;
  },
  getBikes: async (params: BikeParams) => {
    const bikeResponse = await apiService.get<BikesResponse>("/bikes", {
      params: {
        ...params,
      },
    });

    return bikeResponse.data;
  },
  createBike: async ({ bike, file }: { bike: Partial<Bike>; file: File }) => {
    const formData = new FormData();
    // @ts-ignore
    Object.keys(bike).forEach((key: string) => formData.append(key, bike[key]));
    formData.append("image", file);

    const bikeResponse = await apiService.post(`/bikes`, formData);

    return bikeResponse.data;
  },
  updateBike: async ({ id, ...bike }: Bike) => {
    const bikeResponse = await apiService.patch(`/bikes/${id}`, bike);

    return bikeResponse.data;
  },
  deleteBike: async (id: number) => {
    await apiService.delete(`/bikes/${id}`);
  },
};

export default bikesService;
