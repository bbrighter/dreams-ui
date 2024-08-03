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

export interface EntityCategoriesResponse {
  categories: EntityCategoryResponse[];
}

export interface EntityCategoryResponse {
  id: number;
  name: string;
}

export interface EntityCountResponse {
  count: number;
  id: number;
}

export interface EntityCountsResponse {
  categories: EntityCountResponse[];
  persons: EntityCountResponse[];
}

export interface EntityDreamMetaResponse {
  date: string;
  id: number;
  visible: boolean;
}

export interface EntityDreamResponse {
  categories: EntityCategoriesResponse;
  date: string;
  description: string;
  id: number;
  persons: EntityPersonsResponse;
  visible: boolean;
}

export interface EntityDreamsResponse {
  dreams: EntityDreamMetaResponse[];
}

export interface EntityPersonResponse {
  id: number;
  name: string;
}

export interface EntityPersonsResponse {
  persons: EntityPersonResponse[];
}

export interface V1DreamRequestBody {
  date: string;
  description?: string;
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
  v1 = {
    /**
     * @description Get all categories
     *
     * @name CategoriesList
     * @request GET:/v1/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<EntityCategoriesResponse, any>({
        path: `/v1/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get all dreams
     *
     * @name DreamsList
     * @request GET:/v1/dreams
     */
    dreamsList: (params: RequestParams = {}) =>
      this.request<EntityDreamsResponse, any>({
        path: `/v1/dreams`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new dream
     *
     * @name DreamsCreate
     * @request POST:/v1/dreams
     */
    dreamsCreate: (dreamRequestBody: V1DreamRequestBody, params: RequestParams = {}) =>
      this.request<number, void>({
        path: `/v1/dreams`,
        method: "POST",
        body: dreamRequestBody,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get all dreams - inlcuding private
     *
     * @name DreamsPrivateList
     * @request GET:/v1/dreams/private
     */
    dreamsPrivateList: (params: RequestParams = {}) =>
      this.request<EntityDreamsResponse, any>({
        path: `/v1/dreams/private`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get one private dream
     *
     * @name DreamsPrivateDetail
     * @request GET:/v1/dreams/private/{dreamId}
     */
    dreamsPrivateDetail: (dreamId: string, params: RequestParams = {}) =>
      this.request<EntityDreamResponse, void>({
        path: `/v1/dreams/private/${dreamId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Toggle visiblity of a dream
     *
     * @name DreamsPrivatePartialUpdate
     * @request PATCH:/v1/dreams/private/{dreamId}
     */
    dreamsPrivatePartialUpdate: (dreamId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/dreams/private/${dreamId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * @description Get one dream
     *
     * @name DreamsDetail
     * @request GET:/v1/dreams/{dreamId}
     */
    dreamsDetail: (dreamId: string, params: RequestParams = {}) =>
      this.request<EntityDreamResponse, void>({
        path: `/v1/dreams/${dreamId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete one dreams
     *
     * @name DreamsDelete
     * @request DELETE:/v1/dreams/{dreamId}
     */
    dreamsDelete: (dreamId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/dreams/${dreamId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Update an existing dream
     *
     * @name DreamsPartialUpdate
     * @request PATCH:/v1/dreams/{dreamId}
     */
    dreamsPartialUpdate: (dreamId: string, dreamRequestBody: V1DreamRequestBody, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/dreams/${dreamId}`,
        method: "PATCH",
        body: dreamRequestBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Add a category to a dream
     *
     * @name DreamsCategoriesUpdate
     * @request PUT:/v1/dreams/{dreamId}/categories
     */
    dreamsCategoriesUpdate: (
      dreamId: string,
      query: {
        /** Name of a category */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EntityCategoriesResponse, void>({
        path: `/v1/dreams/${dreamId}/categories`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a category from a dream
     *
     * @name DreamsCategoriesDelete
     * @request DELETE:/v1/dreams/{dreamId}/categories/{categoryId}
     */
    dreamsCategoriesDelete: (dreamId: string, categoryId: string, params: RequestParams = {}) =>
      this.request<EntityCategoriesResponse, void>({
        path: `/v1/dreams/${dreamId}/categories/${categoryId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Add a person to a dream
     *
     * @name DreamsPersonsUpdate
     * @request PUT:/v1/dreams/{dreamId}/persons
     */
    dreamsPersonsUpdate: (
      dreamId: string,
      query: {
        /** Name of person */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EntityPersonsResponse, void>({
        path: `/v1/dreams/${dreamId}/persons`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a person from a dream
     *
     * @name DreamsPersonsDelete
     * @request DELETE:/v1/dreams/{dreamId}/persons/{personId}
     */
    dreamsPersonsDelete: (dreamId: string, personId: string, params: RequestParams = {}) =>
      this.request<EntityPersonsResponse, void>({
        path: `/v1/dreams/${dreamId}/persons/${personId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Get all persons
     *
     * @name PersonsList
     * @request GET:/v1/persons
     */
    personsList: (params: RequestParams = {}) =>
      this.request<EntityPersonsResponse, any>({
        path: `/v1/persons`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get count per category and person
     *
     * @name PrivateStatisticsList
     * @request GET:/v1/private/statistics
     */
    privateStatisticsList: (
      query?: {
        /** Limit of returned results */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EntityCountsResponse, any>({
        path: `/v1/private/statistics`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get count per category and person
     *
     * @name StatisticsList
     * @request GET:/v1/statistics
     */
    statisticsList: (
      query?: {
        /** Limit of returned results */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EntityCountsResponse, any>({
        path: `/v1/statistics`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
