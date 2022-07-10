import { Configuration, DefaultApi, Work, WorkCreate } from "./openapi";

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

export async function createWork(workCreate: WorkCreate): Promise<WorkCreate> {
  const requestParameters = { workCreate: workCreate };
  const response = await apiClient.createWorkWorkPost(requestParameters);
  return response;
}
