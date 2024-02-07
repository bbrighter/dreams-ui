/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ControllerDreamMetaResponse {
  date: string;
  id: number;
}

export interface ControllerDreamRequestBody {
  date: string;
  description?: string;
}

export interface ControllerDreamResponse {
  date: string;
  description: string;
  id: number;
  persons: ControllerPersonResponse[];
  tags: ControllerTagResponse[];
}

export interface ControllerDreamsResponse {
  dreams: ControllerDreamMetaResponse[];
}

export interface ControllerPersonResponse {
  id: number;
  name: string;
}

export interface ControllerPersonsResponse {
  persons: ControllerPersonResponse[];
}

export interface ControllerTagResponse {
  id: number;
  title: string;
}

export interface ControllerTagsResponse {
  tags: ControllerTagResponse[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title No title
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  dreams = {
    /**
     * @description Get all dreams
     *
     * @name DreamsList
     * @request GET:/dreams
     */
    dreamsList: (params: RequestParams = {}) =>
      this.request<ControllerDreamsResponse, any>({
        path: `/dreams`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new dream
     *
     * @name DreamsCreate
     * @request POST:/dreams
     */
    dreamsCreate: (dreamRequestBody: ControllerDreamRequestBody, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/dreams`,
        method: "POST",
        body: dreamRequestBody,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get one dream
     *
     * @name DreamsDetail
     * @request GET:/dreams/{dreamId}
     */
    dreamsDetail: (dreamId: string, params: RequestParams = {}) =>
      this.request<ControllerDreamResponse, any>({
        path: `/dreams/${dreamId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete one dreams
     *
     * @name DreamsDelete
     * @request DELETE:/dreams/{dreamId}
     */
    dreamsDelete: (dreamId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dreams/${dreamId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Update an existing dream
     *
     * @name DreamsPartialUpdate
     * @request PATCH:/dreams/{dreamId}
     */
    dreamsPartialUpdate: (dreamId: string, dreamRequestBody: ControllerDreamRequestBody, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dreams/${dreamId}`,
        method: "PATCH",
        body: dreamRequestBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Add a person to a dream
     *
     * @name PersonsUpdate
     * @request PUT:/dreams/{dreamId}/persons
     */
    personsUpdate: (
      dreamId: string,
      query: {
        /** Name of person */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, any>({
        path: `/dreams/${dreamId}/persons`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a person from a dream
     *
     * @name PersonsDelete
     * @request DELETE:/dreams/{dreamId}/persons/{personId}
     */
    personsDelete: (dreamId: string, personId: string, params: RequestParams = {}) =>
      this.request<ControllerPersonsResponse, any>({
        path: `/dreams/${dreamId}/persons/${personId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Add a tag to a dream
     *
     * @name TagsUpdate
     * @request PUT:/dreams/{dreamId}/tags
     */
    tagsUpdate: (
      dreamId: string,
      query: {
        /** Label of tag */
        title: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ControllerTagsResponse, any>({
        path: `/dreams/${dreamId}/tags`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a tag to a dream
     *
     * @name TagsDelete
     * @request DELETE:/dreams/{dreamId}/tags/{tagId}
     */
    tagsDelete: (dreamId: string, tagId: string, params: RequestParams = {}) =>
      this.request<ControllerTagsResponse, any>({
        path: `/dreams/${dreamId}/tags/${tagId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  persons = {
    /**
     * @description Get all persons
     *
     * @name PersonsList
     * @request GET:/persons
     */
    personsList: (params: RequestParams = {}) =>
      this.request<ControllerPersonResponse[], any>({
        path: `/persons`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * @description Get all tags
     *
     * @name TagsList
     * @request GET:/tags
     */
    tagsList: (params: RequestParams = {}) =>
      this.request<ControllerTagsResponse, any>({
        path: `/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
