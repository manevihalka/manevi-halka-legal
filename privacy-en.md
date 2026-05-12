---
layout: default
title: Privacy Policy
lang: en
---

# Privacy Policy

**Effective date:** May 3, 2026
**Last updated:** May 12, 2026

Manevi Halka ("the App", "we", "us") values your privacy. This policy explains
what information we collect when you use the App, how we use it, and what
rights you have.

---

## 1. Data Controller

**Name:** Emirhan Ayaz
**Email:** emirhan.ayaz171@icloud.com
**App:** Manevi Halka

---

## 2. Information We Collect

### 2.1. Information you provide directly

- **Account info:** Email address, full name, profile picture (optional)
- **Authentication:** If you use Sign in with Apple or Google, the identity
  token from the respective service
- **Preferences:** App language, theme, notification preferences
- **User content:** Group descriptions you create, custom dhikr texts,
  Quran verse notes, book reading notes
- **Completion certificates:** When you complete a Hatim, Cevshen, or book, a PDF certificate is generated **locally on your device** (never uploaded to our servers, stays on your device for sharing)

### 2.2. Automatically collected information

- **Progress data:** Quran page progress, completed tasks, hatim count,
  dhikr counters, Cevshen knot completions
- **Notification token:** Device token for push notifications (Apple APNs /
  Google FCM)
- **Location:** Only your device's current location, used to compute prayer
  times. **Location data is not sent to or stored on our servers** — used
  only on-device for calculation.
- **Subscription info:** If you have a Premium subscription: term, plan
  type, store (App Store / Play Store), subscription status

### 2.3. Information we do NOT collect

- Credit card / payment details (handled by Apple/Google — never visible to us)
- Health data
- Sensitive personal data (except religion — voluntarily provided through use
  of the app, given the nature of tracking Islamic practices)

---

## 3. How We Use Your Information

- To provide core app functionality (group tracking, task distribution,
  progress recording)
- To send reminders (task deadline, streak warning, milestone celebration)
- To verify Premium subscription status
- To diagnose errors and performance issues (anonymous technical data)
- To meet legal obligations
- To improve user experience (aggregated/anonymous analytics)

**We do not use your data for advertising.** We do not sell your data to
ad networks.

---

## 4. Third-Party Services

We use the following third-party services to provide our service:

| Service | Purpose | Data |
|---------|---------|------|
| **Supabase** ([privacy](https://supabase.com/privacy)) | Database, auth, server functions | Account, progress, all app data |
| **RevenueCat** ([privacy](https://www.revenuecat.com/privacy)) | Subscription management | User ID, subscription status |
| **Apple Push Notification Service** | iOS push notifications | Device token |
| **Google Firebase Cloud Messaging** | Android push notifications | Device token |
| **Expo** ([privacy](https://expo.dev/privacy)) | Push notification infrastructure | Device token |
| **Apple Sign In** | OAuth login | Apple ID, email, name |
| **Google Sign In** | OAuth login | Google ID, email, name |
| **Sentry** ([privacy](https://sentry.io/privacy/)) | Error reporting, crash tracking | Anonymous error logs, stack traces, device/OS info |
| **PostHog** ([privacy](https://posthog.com/privacy)) | Product analytics (opt-out available) | Anonymous usage events (no PII), hosted on EU servers |

---

## 5. Data Retention

- **Active account:** Data is retained as long as your account is active
- **Account deletion:** Your account is first marked as **soft-deleted**. You can **restore your account within 30 days** by signing in again. After 30 days, an automated cron job (pg_cron) **permanently deletes** all your personal data. If you want immediate permanent deletion, contact us by email. Only accounting/subscription records that must legally be retained may be kept (anonymized)
- **Notification logs:** Auto-deleted after 30 days
- **Audit logs:** Retained for 12 months for security and compliance

---

## 6. Your Rights (GDPR / KVKK)

Under GDPR (EU) and KVKK (Turkey), you have these rights:

- **Access:** Learn what data we store about you
- **Rectification:** Update inaccurate information (via app's profile screen)
- **Erasure:** Delete your account and all data (in-app:
  Profile → Settings → Account Security → Delete My Account)
- **Portability:** Request a copy of your data. **In-app:** Profile → Settings → Data Export downloads all your data as a PDF
- **Object:** Object to specific processing activities. **Analytics opt-out** is available anytime: Profile → Settings → Privacy → Analytics (default on)
- **Complaint:** File a complaint with your data protection authority

For requests: **emirhan.ayaz171@icloud.com**

---

## 7. Children

The App is not intended for children under 13. We do not knowingly collect
data from users under 13. If you believe your child has provided us data,
please contact us — we will delete it immediately.

App Store age rating: **4+**
(Islamic content — no aggressive/inappropriate content)

---

## 8. Security

- All data is transmitted over HTTPS/TLS
- Database access is protected by Row-Level Security (RLS) policies
- Passwords are hashed with bcrypt (Supabase Auth standard)
- Auth tokens are short-lived and stored in secure device areas
  (iOS Keychain / Android Keystore)
- Server access is restricted by 2FA + IP allow-list (developer account)

No system is 100% secure. While we cannot guarantee absolute security,
we will notify affected users and authorities within 72 hours of
discovering a data breach.

---

## 9. Cross-Border Data Transfer

Supabase and our other service providers may host servers in the EU and US.
For data transferred outside the European Economic Area, GDPR Article 46
"Standard Contractual Clauses" apply.

---

## 10. Cookies / Local Storage

The App is a mobile app and does not use web cookies. However, the following
data is stored locally on your device:

- Session token (for login, in Keychain/Keystore)
- Preference settings (language, theme)
- Cached data (for offline use)
- Notification counters
- Widget data (UserDefaults / SharedPreferences)

Deleting your account or uninstalling the app removes this data.

---

## 11. Changes to This Policy

We may update this policy from time to time. For significant changes,
we will send an in-app notification. The effective date is shown at the top.

---

## 12. Contact

For questions:

**Email:** emirhan.ayaz171@icloud.com
**Subject:** Manevi Halka — Privacy

We respond within 15 days.
