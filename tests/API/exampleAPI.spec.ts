import { test, expect } from '@playwright/test';
import { DeckResponse } from './DeckResponse';

test('shuffling the deck', async ({ page }) => {
  const newIssue = await page.request.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`, {});
  expect(newIssue.ok()).toBeTruthy();

  const responseBody = await newIssue.body();

  console.log(responseBody.toString())

  const deckResponse: DeckResponse = mapResponse(responseBody.toString());

  expect(deckResponse.success).toBe(true);
  expect(deckResponse.deck_id).not.toBe(null);

  console.log('Deck ID:', deckResponse.deck_id);
  console.log('Shuffled:', deckResponse.shuffled);
});

function mapResponse<T>(responseBody: string): T {
  return JSON.parse(responseBody) as T;
}


// Add here expect to match Object