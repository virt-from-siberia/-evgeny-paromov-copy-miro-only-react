export { PZ_API_CONFIG } from "./config";
export { pzFetchClient, pzRqClient } from "./instance";
export type { PzApiPaths, PzApiSchemas } from "./schema";
export {
  getLoanPassportVerify,
  setLoanPassportVerify,
  useLoanPassportVerify,
} from "./requests/loans";
