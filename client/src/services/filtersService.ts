import apiService from "./api/apiService";
import { Filter } from "@types";

const filtersService = {
  getFilters: async () => {
    const filtersResponse = await apiService.get<Filter[]>("/filters");

    return filtersResponse.data;
  },
};

export default filtersService;
