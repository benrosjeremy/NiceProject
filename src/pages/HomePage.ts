import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {
  async closePopup() {
    const closeBtn = this.page.getByRole('button', { name: 'כפתור סגירה' });
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
    }
  }

  async searchByText(text: string) {
    await this.page.getByRole('combobox', { name: 'כאן אפשר לחפש מתנה' }).click();
    await this.page.getByRole('combobox', { name: 'כאן אפשר לחפש מתנה' }).fill(text);
    await this.page.getByRole('button', { name: 'חיפוש', exact: true }).click();
  }

  async searchByCategory() {
    await this.page.getByRole('img', { name: /אתר המתנות והחוויות הגדול בישראל/ }).locator('div').first().click();
  }

  async applyPriceFilter(priceLabel: string) {
    await this.page.getByRole('combobox').filter({ hasText: 'סכום' }).click();
    await this.page.getByRole('option', { name: priceLabel }).click();
  }

  async applyAreaFilter(areaLabel: string) {
    await this.page.getByRole('combobox').filter({ hasText: 'אזור' }).click();
    await this.page.getByRole('option', { name: areaLabel }).click();
  }

//   async clickSearchButton() {
//     await this.page.getByRole('button', { name: 'חיפוש', exact: true }).click();
//   }
}
