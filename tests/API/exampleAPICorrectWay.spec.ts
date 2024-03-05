import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs'

test('shuffling the deck', async ({ page }) => {
    let requestApi = await page.request.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`, {});
    expect(requestApi.ok()).toBeTruthy();

    let responseBody = await requestApi.body();

    // Convert the Buffer to a JSON object
    let jsonObject = JSON.parse(responseBody.toString());

    // console.log(jsonObject);

    const jsonToValidate = {
        success: true,
        deck_id: expect.any(String),
        remaining: expect.any(Number),
        shuffled: expect.any(Boolean),
    };

    expect(jsonObject).toMatchObject(jsonToValidate);

    console.log('Deck ID:', jsonObject.deck_id);
    console.log('Shuffled:', jsonObject.shuffled);
    // Determine the directory of the current script
    const currentDirectory = __dirname;
    const relativePath = './jsons/clientStorageState.json';
    const fullPath = path.resolve(currentDirectory, relativePath);

    // Read the content of the file
    let clientStorageState = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    // Modify properties or perform other operations on clientStorageState
    clientStorageState.deckId = jsonObject.deck_id;

    // Write the updated content back to the file
    fs.writeFileSync(fullPath, JSON.stringify(clientStorageState, null, 2));

    // Continue with the rest of your code
    let id = clientStorageState.deckId;
    requestApi = await page.request.get(`https://www.deckofcardsapi.com/api/deck/${id}/draw/?count=2`, {});


    expect(requestApi.ok()).toBeTruthy();

    responseBody = await requestApi.body();

    // Convert the Buffer to a JSON object
    jsonObject = JSON.parse(responseBody.toString());

    console.log(jsonObject);

});

test('checking the deck', async ({ page }) => {
    let requestApi = await page.request.get(`https://www.deckofcardsapi.com/api/deck/cbcjr5t5nt27/draw/?count=2`, {});
    expect(requestApi.ok()).toBeTruthy();
    const responseBody = await requestApi.body();
    // Determine the directory of the current script
    const currentDirectory = __dirname;
    const expectedJsonPath = path.resolve(__dirname, './jsons/expected.json');
    const fullPath = path.resolve(currentDirectory, expectedJsonPath);

    // Read the content of the file
    const clientStorageState = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    // Use Jest's toEqual matcher to compare the actual and expected JSON
    expect(responseBody.toString()).toEqual(clientStorageState);

});
