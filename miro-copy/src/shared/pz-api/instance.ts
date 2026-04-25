import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { PZ_API_CONFIG } from "./config";
import type { PzApiPaths } from "./schema";

export const pzFetchClient = createFetchClient<PzApiPaths>({
  baseUrl: PZ_API_CONFIG.BASE_URL,
});

export const pzRqClient = createClient(pzFetchClient);
