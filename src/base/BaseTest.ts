import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { GiftPage } from '../pages/GiftPage';
import { PaymentPage } from '../pages/PaymentPage';

export class BaseTest {
  protected home: HomePage;
  protected gift: GiftPage;
  protected payment: PaymentPage;

  constructor(protected page: Page) {
    this.home = new HomePage(page);
    this.gift = new GiftPage(page);
    this.payment = new PaymentPage(page);
  }

  async navigate() {
    await this.page.goto('https://buyme.co.il/');
  }
}