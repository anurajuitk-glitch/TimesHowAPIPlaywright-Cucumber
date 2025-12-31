
import { request } from '@playwright/test';

export async function getTopHeadlines() {
  const context = await request.newContext();
  return context.get(
    'https://apiprod.timesnownews.com/request/articlelist?msid=87844847&pageno=1&itemcount=15&megamenu=true&seopath=india',
    {
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY || ''
      }
    }
  );
}
