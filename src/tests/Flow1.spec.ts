// tests/ValidateGiftSearch.spec.ts
import { test, expect } from '@playwright/test';
import { BaseTest } from '../base/BaseTest';

class ValidateGiftSearch extends BaseTest {
  async run() {
    await this.navigate();
    await this.home.closePopup();
    await this.home.applyPriceFilter('-299 ש"ח');
    await this.home.applyAreaFilter('מרכז');
    // await this.home.clickSearchButton();
    await this.home.searchByText('לילד');

    const confirmLink = this.page.locator('a:has-text("תמצאו לי מתנה")');
    await confirmLink.waitFor({ state: 'visible', timeout: 10000 });
    await confirmLink.click();

    const giftElement = this.page.locator('div.bottom span.name.bm-subtitle-1:has-text("BUYME BABY- מגוון מתנות לידה")');
    await giftElement.waitFor({ state: 'visible', timeout: 10000 });
    await expect(giftElement).toBeVisible();
    await giftElement.click();

    const loginPopup = this.page.locator('div.box #ember2827 span:has-text("כניסה ל-BUYME")');
    await loginPopup.waitFor({ state: 'visible', timeout: 10000 });
    await expect(loginPopup).toBeVisible();
  }
}

test('חיפוש מתנה וסינון לפי ילד עם וידוא תוצאה והגעה למסך כניסה', async ({ page }) => {
  const flow = new ValidateGiftSearch(page);
  await flow.run();
});
