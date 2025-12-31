
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getTopHeadlines } from '../../src/api/newsApi';

let response: any;
let body: any;
let children: any;
function extractChildren(body: any): any[] {
  if (!body?.response?.sections) return [];

  const sections = body.response.sections;

  // sections is an object with dynamic keys (tnn_xxx)
  for (const key of Object.keys(sections)) {
    const section = sections[key];
    if (Array.isArray(section?.children)) {
      return section.children;
    }
  }

  return [];
}


Given('the Times Now news API is available', async () => {});

When('I request the top headlines', async () => {
  response = await getTopHeadlines();
  body = await response.json();
});

Then('the response status should be {int}', async (status: number) => {
  expect(response.status()).toBe(status);
});

// body structure includes a `children` array (may be under different keys or inside response.sections)
Then('the response should contain news articles', async () => {
  const children = extractChildren(body);
console.log('Response children:'+children);
  console.log('Children length:', children.length);
  expect(Array.isArray(children)).toBeTruthy();
  expect(children.length).toBeGreaterThan(0);

  children.forEach(article => {
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('storyUrl');
    expect(article.status).toBe('ACTIVE');
    console.log('Article Title:', article.title);
  });
});
