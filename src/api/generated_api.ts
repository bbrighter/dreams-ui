/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ControllerCategoryListResponse {
  categories: ControllerCategoryResponse[];
}

export interface ControllerCategoryResponse {
  count?: number;
  id: number;
  name: string;
  type: string;
}

export interface ControllerCountByCat {
  categoryId: number;
  count: number;
}

export interface ControllerDreamListResponse {
  dreams: ControllerDreamResponse[];
}

export interface ControllerDreamResponse {
  categories: ControllerCategoryResponse[];
  date: string;
  description: string;
  finalized: boolean;
  id: number;
  rating?: number;
}

export interface ControllerMergeCategoriesParams {
  newName: string;
  sourceCategoryId: number;
  targetCategoryId: number;
}

export interface ControllerPostCategoryRequestBody {
  categoryType: string;
  name: string;
}

export interface ControllerPostDreamRequest {
  date: string;
  description: string;
}

export interface ControllerStatistic {
  categories: ControllerCountByCat[];
  dreamCount: number;
  month: string;
}

export interface ControllerStatistics {
  statistics: ControllerStatistic[];
}

export interface ControllerUpdateDreamRequest {
  date?: string;
  description?: string;
  rating?: number;
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

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

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
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
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

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
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

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
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
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  categories = {
    /**
     * @description Get all categories
     *
     * @name CategoriesList
     * @request GET:/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<ControllerCategoryListResponse, any>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a category. Must be contained in no dreams.
     *
     * @name DeleteCategories
     * @request DELETE:/categories/:id
     */
    deleteCategories: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/categories/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Change the name of a category.
     *
     * @name IdNamePartialUpdate
     * @request PATCH:/categories/:id/name
     */
    idNamePartialUpdate: (
      id: string,
      query: {
        /** New name for this category */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/categories/${id}/name`,
        method: "PATCH",
        query: query,
        ...params,
      }),

    /**
     * @description Change the type of a category.
     *
     * @name IdTypePartialUpdate
     * @request PATCH:/categories/:id/type
     */
    idTypePartialUpdate: (
      id: string,
      query: {
        /** New type for this category */
        type: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/categories/${id}/type`,
        method: "PATCH",
        query: query,
        ...params,
      }),

    /**
     * @description Merge two categories.
     *
     * @name MergeCreate
     * @request POST:/categories/merge
     */
    mergeCreate: (
      mergeCategoriesParams: ControllerMergeCategoriesParams,
      params: RequestParams = {},
    ) =>
      this.request<ControllerCategoryListResponse, any>({
        path: `/categories/merge`,
        method: "POST",
        body: mergeCategoriesParams,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get count per category and person
     *
     * @name WithCountList
     * @request GET:/categories/with-count
     */
    withCountList: (params: RequestParams = {}) =>
      this.request<ControllerCategoryListResponse, any>({
        path: `/categories/with-count`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  countCategories = {
    /**
     * @description Get count per month
     *
     * @name MonthlyList
     * @request GET:/count-categories/monthly
     */
    monthlyList: (params: RequestParams = {}) =>
      this.request<ControllerStatistics, any>({
        path: `/count-categories/monthly`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  dreams = {
    /**
     * @description Get all dreams
     *
     * @name DreamsList
     * @request GET:/dreams
     */
    dreamsList: (params: RequestParams = {}) =>
      this.request<ControllerDreamListResponse, any>({
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
    dreamsCreate: (
      postDreamRequest: ControllerPostDreamRequest,
      params: RequestParams = {},
    ) =>
      this.request<number, void>({
        path: `/dreams`,
        method: "POST",
        body: postDreamRequest,
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
      this.request<ControllerDreamResponse, void>({
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
      this.request<any, void>({
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
    dreamsPartialUpdate: (
      dreamId: string,
      updateDreamRequest: ControllerUpdateDreamRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/dreams/${dreamId}`,
        method: "PATCH",
        body: updateDreamRequest,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Add a new person or category to a dream
     *
     * @name CategoriesCreate
     * @request POST:/dreams/{dreamId}/categories
     */
    categoriesCreate: (
      dreamId: string,
      params: ControllerPostCategoryRequestBody,
      requestParams: RequestParams = {},
    ) =>
      this.request<number, void>({
        path: `/dreams/${dreamId}/categories`,
        method: "POST",
        body: params,
        type: ContentType.Json,
        format: "json",
        ...requestParams,
      }),

    /**
     * @description Add an exiting person or category to a dream
     *
     * @name CategoriesUpdate
     * @request PUT:/dreams/{dreamId}/categories/{categoryId}
     */
    categoriesUpdate: (
      dreamId: string,
      categoryId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/dreams/${dreamId}/categories/${categoryId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Delete a category or person from a dream
     *
     * @name CategoriesDelete
     * @request DELETE:/dreams/{dreamId}/categories/{categoryId}
     */
    categoriesDelete: (
      dreamId: string,
      categoryId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/dreams/${dreamId}/categories/${categoryId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Finalize a dream
     *
     * @name FinalizePartialUpdate
     * @request PATCH:/dreams/{dreamId}/finalize
     */
    finalizePartialUpdate: (dreamId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/dreams/${dreamId}/finalize`,
        method: "PATCH",
        ...params,
      }),
  };
}
