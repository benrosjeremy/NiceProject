
import { test, expect } from '@playwright/test';
import { BaseTest } from '../base/BaseTest';

class NewBuyTest extends BaseTest {
  async run() {
    await this.navigate();
    
    await this.page.locator('#ember1569').click();
    await this.page.getByRole('link', { name: 'BUYME ALL - מגוון אדיר במתנה אחת' }).click();
    
    await this.page.getByPlaceholder('הכנס סכום').click();
    await this.page.getByPlaceholder('הכנס סכום').fill('500');
    await this.page.getByRole('button', { name: 'בחירה' }).click();
    
    await this.page.getByRole('combobox', { name: 'שם מקבל המתנה' }).click();
    await this.page.getByRole('combobox', { name: 'שם מקבל המתנה' }).fill('avi');
    
 
    await this.page.getByRole('combobox').filter({ hasText: 'לאיזה אירוע?' }).locator('span').click();
    await this.page.getByRole('option', { name: 'חג פסח' }).locator('span').click();

    await this.page.getByRole('button', { name: 'המשך' }).click();
    await this.page.locator('div:nth-child(2) > .circle-area > .method-icon > .circle').click();
    
  
    await this.page.locator('#email').click();
    await this.page.locator('#email').fill('benrosjeremy@gmail.com');
    
   
    await this.page.getByRole('combobox', { name: 'שם שולח המתנה, באפשרותך לחזור אחורה ולהגדיר מתי ובאיזה אופן לשלוח את המתנה' }).click();
    await this.page.getByRole('combobox', { name: 'שם שולח המתנה, באפשרותך לחזור אחורה ולהגדיר מתי ובאיזה אופן לשלוח את המתנה' }).fill('beny');
    
    await this.page.getByRole('button', { name: 'המשך לתשלום' }).click();
    
    const greetingPopup = this.page.getByRole('dialog').locator('div').filter({ hasText: 'היי, טוב לראות אותך' }).nth(3);
    await greetingPopup.waitFor({ state: 'visible', timeout: 10000 });
    await expect(greetingPopup).toBeVisible();
    await greetingPopup.click();
  }
}

test('חיפוש מתנה עם סינון, מילוי פרטים והגעה למסך ברכה', async ({ page }) => {
  const flow = new NewBuyTest(page);
  await flow.run();
});
