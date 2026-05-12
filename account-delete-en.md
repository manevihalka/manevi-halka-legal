---
layout: default
title: Account Deletion
lang: en
---

# Account Deletion

**App:** Manevi Halka
**Developer:** Emirhan Ayaz
**Contact:** emirhan.ayaz171@icloud.com

You may delete your Manevi Halka account and data at any time.

## 1. Deletion Flow — 30-Day Recovery + Permanent Deletion

Account deletion is a **two-step process**:

1. **Soft-delete (immediate, reversible):** Tapping "Delete Account" marks your account. Push notifications stop, and your account becomes invisible to other members.
2. **30-day recovery window:** If you sign in again during this period, your account is restored with all your data intact.
3. **Permanent deletion (automatic):** After 30 days, a daily cron job (pg_cron, 03:00 UTC) **permanently deletes** your account and all associated data. This step is irreversible.

If you want **immediate permanent deletion** without the 30-day wait, contact us by email (§4 below).

## 2. Delete From Within The App (Recommended)

1. Open the Manevi Halka app
2. Sign in to your account
3. Go to the **Profile** tab
4. Open **Settings → Account & Security**
5. Tap the red **"Delete Account"** button at the bottom
6. Follow the confirmation steps

## 3. Export Your Data Before Deletion (Optional)

If you wish, back up all your data before deletion:

**Profile → Settings → Data Export → Download as PDF**

This feature is provided under GDPR/KVKK data portability rights and includes: profile, halka memberships, worship progress, Quran/book notes, and subscription status.

## 4. Request Deletion by Email

If you cannot access the app or want **immediate permanent deletion**, send an email **from the address associated with your account**:

- **Email:** [emirhan.ayaz171@icloud.com](mailto:emirhan.ayaz171@icloud.com)
- **Subject:** Account Deletion Request
- **Body:** "I request deletion of my Manevi Halka account. [Immediate / 30-day soft-delete is fine]"

Your request will be processed **within 30 days** and you will be notified of the outcome by email.

## Data That Is Deleted

After the 30-day period (or upon immediate deletion request), the following is permanently removed:

- Email address and account identifier
- Profile data (name, username, profile picture)
- Worship progress (dhikr counts, Quran completion, prayer tracking)
- Halka (group) memberships (records attributed to you are anonymized)
- Quran verse notes, book reading notes
- Push notification tokens
- Subscription status

## Data That May Be Retained

For legal obligations and fraud prevention, limited data may be retained in an anonymized form for up to **90 days**:

- Deletion timestamp (anonymous log)
- Billing records (as legally required by RevenueCat)

---

**Last updated:** May 12, 2026
