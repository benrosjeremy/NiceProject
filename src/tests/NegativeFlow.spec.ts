import { test, expect } from '@playwright/test';
import { BaseTest } from '../base/BaseTest';

class NegativeFlowTest extends BaseTest {
  async run() {
    await this.navigate();
    await this.home.closePopup();
    await this.home.searchByText('מתנה לילד');
    await this.home.applyPriceFilter('-299 ש"ח');
    await this.home.applyAreaFilter('מרכז');
 

    await this.gift.selectGiftByName('BUYME ALL - מגוון אדיר במתנה אחת BUYME ALL - מגוון אדיר במתנה אחת');
    await this.gift.enterAmount('250');
    await this.gift.confirmGiftChoice();
    await this.gift.fillReceiverName('מאיר');
    await this.gift.selectEventType('יום הולדת');
    await this.gift.clickContinue();

    await this.payment.chooseEmailOption();
 
    await this.payment.fillSenderName('אבא');

    const continueBtn = this.page.getByRole('button', { name: 'המשך לתשלום' });
    await expect(continueBtn).toBeDisabled(); // ← מצופה שהכפתור לא יהיה לחיץ
  }
}

test('Flow שלילי - לא ניתן להמשיך בלי כתובת מייל', async ({ page }) => {
  const flow = new NegativeFlowTest(page);
  await flow.run();
});
