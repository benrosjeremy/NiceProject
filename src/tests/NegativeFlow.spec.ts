// tests/NegativeFlow.spec.ts
import { test, expect } from '@playwright/test';
import { BaseTest } from '../base/BaseTest';

class NegativeFlowTest extends BaseTest {
  async run() {
    await this.navigate();
    await this.home.closePopup();

    // חיפוש מתנה "מתנה לילד"
    await this.home.searchByText('מתנה לילד');

    // סינון לפי סכום ואזור
    await this.home.applyPriceFilter('-299 ש"ח');
    await this.home.applyAreaFilter('מרכז');

    // בחירת המתנה עם סלקטור מדויק
    await this.gift.selectGiftByName('BUYME ALL - מגוון אדיר במתנה אחת');

    // מילוי סכום שגוי (לא מספר)
    await this.gift.enterAmount('dfd');

    // הצגת הודעת שגיאה: "ערך זה צריך להיות מספר"
    await this.page.locator('#parsley-id-12').getByText('ערך זה צריך להיות מספר').click();

    // מילוי סכום תקני
    await this.gift.enterAmount('250');
    await this.gift.confirmGiftChoice();

    // מילוי פרטי מקבל המתנה
    await this.gift.fillReceiverName('מאיר');
    await this.gift.selectEventType('יום הולדת');
    await this.gift.clickContinue();

    // מילוי שם שולח המתנה
    await this.payment.fillSenderName('אבא');
    
    // מילוי כתובת מייל שגויה
    await this.payment.fillReceiverEmail('avi');  // כתובת מייל לא תקנית
    
    // הצגת הודעת שגיאה: "ערך זה צריך להיות כתובת אימייל"
    await this.page.locator('#parsley-id-16').getByText('ערך זה צריך להיות כתובת אימייל').click();

    // מילוי כתובת מייל תקנית
    await this.payment.fillReceiverEmail('benrosjeremy@gmail.com');
    
    // לחיצה על כפתור "המשך לתשלום"
    await this.payment.continueToPayment();

    // בדוק אם הגענו למסך "כניסה ל-BUYME"
    const loginPopup = this.page.locator('div.box #ember2827 span:has-text("כניסה ל-BUYME")');
    await loginPopup.waitFor({ state: 'visible', timeout: 10000 });
    await expect(loginPopup).toBeVisible();
  }
}

test('Flow שלילי - לא ניתן להמשיך בלי כתובת מייל תקינה', async ({ page }) => {
  const flow = new NegativeFlowTest(page);
  await flow.run();
});
