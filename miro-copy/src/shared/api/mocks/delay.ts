import { delay } from "msw";

export const MOCK_API_DELAY_MS = import.meta.env.DEV ? 500 : 0;

export async function withMockDelay() {
  if (MOCK_API_DELAY_MS <= 0) {
    return;
  }

  await delay(MOCK_API_DELAY_MS);
}
