import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class GiftPage extends BasePage {
  // async selectGiftByName(name?: string) {
  //   if (name) {
  //     await this.page.getByText(name, { exact: false }).click();
  //   } else {
  //     const gift = this.page.locator('#ember1319 > span'); // ← מה שאתה גילית
  //     await gift.click();
  //   }
  // }
  async selectGiftByName(name?: string) {
    if (name) {
      const gift = this.page.locator(`span.name.bm-subtitle-1:has-text("${name}")`);
      await gift.waitFor({ state: 'visible', timeout: 10000 });  // הוספנו המתנה עד שהאלמנט יהיה זמין
      await gift.click();
    } else {
      const gift = this.page.locator('#ember1319 > span'); // ← מה שאתה גילית
      await gift.click();
    }
  }

  async enterAmount(amount: string) {
    await this.page.getByPlaceholder('הכנס סכום').fill(amount);
  }

  async confirmGiftChoice() {
    const confirmLinks = this.page.locator('a:has-text("תמצאו לי מתנה")');
    await confirmLinks.first().waitFor({ state: 'visible', timeout: 10000 });
    await confirmLinks.first().click();
  }

  
  
  
  
  async fillReceiverName(name: string) {
    await this.page.getByRole('combobox', { name: 'שם מקבל המתנה' }).fill(name);
  }

  async selectEventType(eventLabel: string) {
    await this.page.getByRole('combobox').filter({ hasText: 'לאיזה אירוע?' }).click();
    await this.page.getByRole('option', { name: eventLabel }).locator('span').click();
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: 'המשך' }).click();
  }
}