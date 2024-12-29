import { BaseServiceApi } from "./base.service";

export const usePanelService = () => {
  const { httpClient } = BaseServiceApi();

  const getPanels = async (filter?: string) => {
    try {
      const response = await httpClient.get(`/panel?isHeader=${filter}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching panels:", error);
      throw error;
    }
  };

  const getPanelChildren = async (id: string) => {
    try {
      const response = await httpClient.get(`/panel/${id}/children`);
      return response.data;
    } catch (error) {
      console.error("Error fetching panel children:", error);
      throw error;
    }
  };


  return { getPanels, getPanelChildren };
};
