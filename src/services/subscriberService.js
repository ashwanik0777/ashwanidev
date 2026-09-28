import apiClient from "./apiClient";

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await apiClient.post("/subscribers", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listSubscribers = async () => {
  try {
    const response = await apiClient.get("/admin/subscribers");
    return response.data?.data || [];
  } catch (error) {
    throw error;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/subscribers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleSubscriberStatus = async (id) => {
  try {
    const response = await apiClient.put(`/admin/subscribers/${id}/toggle`);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};
