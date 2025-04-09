// tests/NegativeFlow.spec.ts
import { test, expect } from '@playwright/test';
import { BaseTest } from '../base/BaseTest';

class NegativeFlowTest extends BaseTest {
  async run() {
    await this.navigate();
    await this.home.closePopup();

  
    const giftImage = this.page.locator('.bottom span.name.bm-subtitle-1:has-text("מתנות לחג - המלצות הנבחרת")')
    await giftImage.click();

    await this.gift.selectGiftByName('טרקטורוני עמק חפר');

    // הכנסת ערך לא נכון
    await this.gift.enterAmount('asas');
await this.page.locator('button[gtm="בחירה"]').click();


    
    const amountError = await this.page.locator('#parsley-id-12').getByText('ערך זה צריך להיות מספר');

    await expect(amountError).toBeVisible(); 

   
    await this.gift.enterAmount('155');
    await this.gift.confirmGiftChoice();


    await this.gift.fillReceiverName('avi');
    await this.gift.selectEventType('חג פסח');
    await this.gift.clickContinue();

    
    await this.payment.fillSenderName('dany');
    
    // מילוי כתובת מייל שגויה
    await this.payment.fillReceiverEmail('avi');
    const emailError = await this.page.locator('#parsley-id-16').getByText('ערך זה צריך להיות כתובת אימייל');
    await expect(emailError).toBeVisible(); 

   
    await this.payment.fillReceiverEmail('benrosjeremy@gmail.com');
    
    
    await this.payment.continueToPayment();

    // בדוק אם הגענו למסך "כניסה ל-BUYME"
    const loginPopup = this.page.locator('#ember1101 div').filter({ hasText: 'כניסה ל-BUYME' }).nth(3);
    await loginPopup.waitFor({ state: 'visible', timeout: 10000 });
    await expect(loginPopup).toBeVisible();
  }
}

test('Flow שלילי - לא ניתן להמשיך בלי כתובת מייל תקינה', async ({ page }) => {
  const flow = new NegativeFlowTest(page);
  await flow.run();
});
