# Bug Report — SchemeServe QA Tech Test

Bugs identified through manual exploratory testing of the application
running at http://localhost:5173

---

## BUG-001 — Duplicate navigation link

**Severity:** Low
**Component:** Navigation bar
**Steps to reproduce:**
1. Open the application at http://localhost:5173
2. Look at the navigation bar

**Expected:** Each navigation link leads to a distinct page
**Actual:** "Inventory List" and "Further details" both navigate
to the same Inventory List page — "Further details" appears to
be a duplicate entry

---

## BUG-002 — Inventory page loads slower than all other pages

**Severity:** Medium
**Component:** Inventory page
**Steps to reproduce:**
1. Click between Catalogue, Inventory List and Inventory pages
2. Compare load times

**Expected:** All pages load at a similar speed
**Actual:** The Inventory page takes noticeably longer to load
compared to all other pages in the application

---

## BUG-003 — Purchase quantity input accepts letters and special characters

**Severity:** High
**Component:** Catalogue page — Purchase modal
**Steps to reproduce:**
1. Go to Catalogue and select any item from the dropdown
2. Click the Purchase button
3. Type `abc` or `-5` in the quantity input box
4. Click Submit

**Expected:** A validation error is shown — only positive numbers allowed
**Actual:** The purchase is submitted successfully with an invalid
quantity and no error message is displayed to the user

---

## BUG-004 — Purchase modal can be submitted with empty quantity

**Severity:** High
**Component:** Catalogue page — Purchase modal
**Steps to reproduce:**
1. Go to Catalogue and select any item from the dropdown
2. Click the Purchase button
3. Clear the quantity input box so it is empty
4. Click Submit

**Expected:** A validation error is shown — quantity is required
**Actual:** The purchase is submitted with an empty quantity and
no error message is shown to the user

## BUG-005 — General Ledger account titles wobble when typing in search box

**Severity:** Low
**Component:** Reports page — General Ledger tab
**Steps to reproduce:**
1. Go to Reports page
2. Click the General Ledger tab
3. Click the search box and start typing any character

**Expected:** Account titles remain stable and still while filtering
**Actual:** The account titles visibly wobble/jump on screen
as each character is typed in the search box — this is a
poor user experience and suggests a layout/rendering issue
during the filter animation

---
