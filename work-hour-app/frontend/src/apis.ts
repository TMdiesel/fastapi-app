import { Configuration, DefaultApi, Work } from "./openapi";

const config = new Configuration({ basePath: "http://localhost:8000" });
export const apiClient = new DefaultApi(config);

export async function readWorks(): Promise<Work[]> {
  const response = await apiClient.readWorksWorkGet({});
  return response;
}

export async function deleteWork(workId: number): Promise<Work> {
  const requestParameters = { workId: workId };
  const response = await apiClient.deleteWorkWorkWorkIdDelete(
    requestParameters
  );
  return response;
}
