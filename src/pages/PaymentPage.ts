import { BasePage } from '../base/BasePage';

export class PaymentPage extends BasePage {
  async chooseEmailOption() {
    await this.page.locator('div:nth-child(2) > .circle-area > .method-icon > .circle').click();
    await this.page.getByRole('checkbox', { name: 'מייל' }).click();
  }

  async fillReceiverEmail(email: string) {
    await this.page.getByPlaceholder('מייל מקבל/ת המתנה').fill(email);
  }

  async fillSenderName(name: string) {
    const senderField = this.page.getByRole('combobox', { name: /שם שולח המתנה/ });
    await senderField.fill(name);
    await senderField.press('Enter');
  }

  async continueToPayment() {
    await this.page.getByRole('button', { name: 'המשך לתשלום' }).click();
  }
}