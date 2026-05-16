import { test, expect } from '../../fixtures/fixtures.ts';
import contactsData     from '../../test-data/contacts.json' with { type: 'json' };

test('Contact Form validation and successful submission', async ({
  page,
  contactPage,
}) => {

  await page.goto('/');
  await contactPage.navigate();

  // Empty submit — error shown
  await contactPage.submit();
  await expect(contactPage.error_message).toBeVisible();

  // Missing firstName — error shown
  await contactPage.lastName_input.fill('Tester');
  await contactPage.acceptTerms();
  await contactPage.submit();
  await expect(contactPage.error_message).toBeVisible();

  // Missing lastName — error shown
  await page.reload();
  await contactPage.firstName_input.fill('Jane');
  await contactPage.acceptTerms();
  await contactPage.submit();
  await expect(contactPage.error_message).toBeVisible();

  // Missing ToS — error shown
  await page.reload();
  await contactPage.firstName_input.fill('Jane');
  await contactPage.lastName_input.fill('Tester');
  await contactPage.submit();
  await expect(contactPage.error_message).toBeVisible();

  // All fields — success
  await page.reload();
  await contactPage.fillForm(contactsData);
  await contactPage.acceptTerms();
  await contactPage.submit();
  await expect(contactPage.success_popup).toBeVisible();
});