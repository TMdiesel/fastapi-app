/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    HTTPValidationError,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    Work,
    WorkFromJSON,
    WorkToJSON,
    WorkCreate,
    WorkCreateFromJSON,
    WorkCreateToJSON,
    WorkUpdate,
    WorkUpdateFromJSON,
    WorkUpdateToJSON,
} from '../models';

export interface CreateWorkWorkPostRequest {
    workCreate: WorkCreate;
}

export interface DeleteWorkWorkWorkIdDeleteRequest {
    workId: number;
}

export interface ReadWorksWorkGetRequest {
    skip?: number;
    limit?: number;
}

export interface UpdateWorkWorkWorkIdPutRequest {
    workId: number;
    workUpdate: WorkUpdate;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Create Work
     */
    async createWorkWorkPostRaw(requestParameters: CreateWorkWorkPostRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<WorkCreate>> {
        if (requestParameters.workCreate === null || requestParameters.workCreate === undefined) {
            throw new runtime.RequiredError('workCreate','Required parameter requestParameters.workCreate was null or undefined when calling createWorkWorkPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/work`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WorkCreateToJSON(requestParameters.workCreate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkCreateFromJSON(jsonValue));
    }

    /**
     * Create Work
     */
    async createWorkWorkPost(requestParameters: CreateWorkWorkPostRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<WorkCreate> {
        const response = await this.createWorkWorkPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete Work
     */
    async deleteWorkWorkWorkIdDeleteRaw(requestParameters: DeleteWorkWorkWorkIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Work>> {
        if (requestParameters.workId === null || requestParameters.workId === undefined) {
            throw new runtime.RequiredError('workId','Required parameter requestParameters.workId was null or undefined when calling deleteWorkWorkWorkIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/work/{work_id}`.replace(`{${"work_id"}}`, encodeURIComponent(String(requestParameters.workId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkFromJSON(jsonValue));
    }

    /**
     * Delete Work
     */
    async deleteWorkWorkWorkIdDelete(requestParameters: DeleteWorkWorkWorkIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Work> {
        const response = await this.deleteWorkWorkWorkIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Index
     */
    async indexGetRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<any>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Index
     */
    async indexGet(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<any> {
        const response = await this.indexGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Read Works
     */
    async readWorksWorkGetRaw(requestParameters: ReadWorksWorkGetRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<Work>>> {
        const queryParameters: any = {};

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/work`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WorkFromJSON));
    }

    /**
     * Read Works
     */
    async readWorksWorkGet(requestParameters: ReadWorksWorkGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<Work>> {
        const response = await this.readWorksWorkGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Work
     */
    async updateWorkWorkWorkIdPutRaw(requestParameters: UpdateWorkWorkWorkIdPutRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<WorkUpdate>> {
        if (requestParameters.workId === null || requestParameters.workId === undefined) {
            throw new runtime.RequiredError('workId','Required parameter requestParameters.workId was null or undefined when calling updateWorkWorkWorkIdPut.');
        }

        if (requestParameters.workUpdate === null || requestParameters.workUpdate === undefined) {
            throw new runtime.RequiredError('workUpdate','Required parameter requestParameters.workUpdate was null or undefined when calling updateWorkWorkWorkIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/work/{work_id}`.replace(`{${"work_id"}}`, encodeURIComponent(String(requestParameters.workId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: WorkUpdateToJSON(requestParameters.workUpdate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkUpdateFromJSON(jsonValue));
    }

    /**
     * Update Work
     */
    async updateWorkWorkWorkIdPut(requestParameters: UpdateWorkWorkWorkIdPutRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<WorkUpdate> {
        const response = await this.updateWorkWorkWorkIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
