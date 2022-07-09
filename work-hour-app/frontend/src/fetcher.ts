import { Configuration, DefaultApi, Work } from "./openapi";

const config = new Configuration({ basePath: "http://localhost:8000" });
export const apiClient = new DefaultApi(config);

export async function readWork(): Promise<Work[]> {
  const response = await apiClient.readWorksWorkGet({});
  return response;
}
