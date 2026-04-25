import { pzFetchClient, pzRqClient } from "../instance";
import type { PzApiPaths } from "../schema";

type SetLoanPassportVerifyBody =
  PzApiPaths["/loans/passport/verify/{loan_number}"]["post"]["requestBody"]["content"]["application/json"];

export async function getLoanPassportVerify(loanNumber: string) {
  const { data, error } = await pzFetchClient.GET(
    "/loans/passport/verify/{loan_number}",
    {
      params: {
        path: { loan_number: loanNumber },
      },
    },
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function setLoanPassportVerify(
  loanNumber: string,
  body: SetLoanPassportVerifyBody,
) {
  const { data, error } = await pzFetchClient.POST(
    "/loans/passport/verify/{loan_number}",
    {
      params: {
        path: { loan_number: loanNumber },
      },
      body,
    },
  );

  if (error) {
    throw error;
  }

  return data;
}

export function useLoanPassportVerify(loanNumber: string) {
  return pzRqClient.useQuery("get", "/loans/passport/verify/{loan_number}", {
    params: {
      path: { loan_number: loanNumber },
    },
  });
}
