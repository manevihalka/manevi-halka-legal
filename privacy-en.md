---
layout: default
title: Privacy Policy
lang: en
---

# Privacy Policy

**Effective date:** May 3, 2026
**Last updated:** August 25, 2026

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
- **Cross-device backup:** The personal worship records and reading preferences you
  keep while signed in are backed up on our servers so they are not lost when you
  change devices. This backup includes: **your prayer and supererogatory (nafl)
  tracking records**, your prayer tracking and reminder preferences, your Qur'an
  bookmarks, your last reading position in the Qur'an and Jawshan, your reader
  preferences (secondary translation language, mushaf font style) and your
  in-progress dhikr counts. **Only you can access this backup**; members of your
  circles, circle admins and other users cannot see it (protected by row-level
  access rules in the database). The backup is deleted when you delete your account.
  **Your location coordinates are NOT included in this backup** and remain only on
  your device
- **User content:** Group descriptions you create, custom dhikr texts,
  Quran verse notes, book reading notes
- **One-time circle (dedication):** The title and dedication text of any one-time
  circle you create. You are responsible for any third-party information (e.g., a
  name) you enter in the dedication text
- **Dhikr list sharing:** You can share your personal dhikr list with others via a share
  code/link. When you share, a copy (snapshot) of your list at that moment is stored with
  the share code; recipients can add the list to their own library. You can revoke a share
  at any time
- **Completion certificates:** When you complete a Hatim, Cevshen, or book, a PDF certificate is generated **locally on your device** (never uploaded to our servers, stays on your device for sharing)
- **Report records:** When you use the in-app "Report" feature, your report
  (the reporting account ID, the reported group/member/event, the selected
  reason, and your optional note) is stored on our servers. These records are
  used solely to review the report and prevent abuse, are never shared with
  third parties, and are deleted or anonymized within a reasonable period
  after the review is completed

- **Shared practice check-ins:** If you join a circle's shared practice (prayer
  tracking, memorisation/review, supplication) **of your own accord**, the day
  and unit you mark (for example "maghrib, 22 August") is stored on our servers.
  Only **that circle's admin** can see this record; other members of the circle
  and other users cannot. Joining is a separate, explicit act: being a member of
  a circle does NOT enrol you in a shared practice, you have to join the task as
  well. When you leave the task or leave the circle, these check-ins are
  **deleted immediately**.
  **Your personal prayer tracking on the home screen is entirely separate and
  is never transferred here.** The two markings are independent: marking a
  prayer on your personal card does not mark the circle task, and nobody,
  including the admin, can see your personal record (see the "Cross-device
  backup" item above)

### 2.2. Automatically collected information

- **Progress data:** Quran page progress, completed tasks, hatim count,
  dhikr counters, Cevshen knot completions, your Cetele (memorization) progress and review schedule
- **Notification token:** Device token for push notifications (Apple APNs /
  Google FCM)
- **Location:** Only your device's current location, used to compute prayer
  times and the qibla direction. **Location data is not sent to or stored on our servers** — used
  only on-device for calculation. So that the app can notice you have moved and offer
  prayer times for your new city, the last known coordinate is stored **on your device
  only**; it is deleted when you clear your account data.
- **Subscription info:** If you have a Premium subscription: term, plan
  type, store (App Store / Play Store), subscription status

### 2.3. Information we do NOT collect

- Credit card / payment details (handled by Apple/Google — never visible to us)
- Health data
- Sensitive personal data (except religion — voluntarily provided through use
  of the app, given the nature of tracking Islamic practices)

---

### 2.4. Joining from the web without an account (manevihalka.app)

If you do not have the app, you can open a circle's invitation link on
**manevihalka.app** and take on a portion, or contribute to a shared dhikr,
without creating an account. In that case we collect **only** the following:

- **A random identifier generated in your browser.** It is kept in your browser's
  local storage. The identifier itself is **not stored** on our servers; only an
  irreversible digest of it (SHA-256) is kept. It serves one purpose: so that you
  can see your own portion when you return to the same link
- **Your interface language** (to show the page in the right language)
- **The portion you took on** (page or chapter range) and whether you marked it finished
- **The count you added** to a shared dhikr
- **First-seen and last-seen timestamps**
- **A name, if you choose to give one.** It is optional and never a condition
  for anything: taking on a portion, contributing, marking it finished — all of
  it works without a name. If you leave it blank you appear in the circle as
  "Guest". You can remove a name you gave from the same page later
- **To limit abuse:** your IP address is **never written in raw form**; an
  irreversible digest of it (SHA-256) is kept with a counter, and those records are
  **deleted automatically after 1 hour**

**Not collected:** email, phone number, account, location. A name is taken only
if you type one. The page carries
**no** advertising, analytics or tracking tools, and makes no request to any third
party (every file it uses is served from our own servers).

If you gave no name, the circle's administrator and members **cannot see who you
are**; they only see that the portion was taken on, or that a contribution was
added to the count. If you gave a name, they see that name alongside the portion
you took and what you contributed.

Clearing your browser's site data removes the identifier and severs the link to
your portion. If you wish to access or erase this data, simply send us your
identifier; without it we have no way to locate the record.

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

- **Shared practice check-ins:** Check-ins are kept for **180 days**, then
  permanently deleted by a daily automated job. If you leave the task or the
  circle, your check-ins are deleted immediately, without waiting for that period
- **Active account:** Data is retained as long as your account is active
- **Account deletion:** Your account is first marked as **soft-deleted**. You can **restore your account within 30 days** by signing in again. After 30 days, an automated cron job (pg_cron) **permanently deletes** all your personal data. If you want immediate permanent deletion, contact us by email. Only accounting/subscription records that must legally be retained may be kept (anonymized)
- **Completed one-time circles:** When a one-time circle ends, a summary
  (participant count, work completed) is archived; individual task details are cleared
- **Inactive circles:** Circles with no activity for a long time are automatically
  frozen and later archived (content is kept, active task distribution stops)
- **Empty, abandoned circles:** Circles that have been inactive for more than 90 days,
  have at most one member and contain no reading/task content are permanently deleted
  by a weekly automated job
- **Unused guest accounts:** Guest accounts with no linked identity (email/Google/Apple)
  that remain unused for 90 days and have no circle memberships, event participation,
  family plan or subscription are marked for deletion and go through the permanent
  deletion process above after 30 days
- **Shared dhikr lists:** A snapshot created when you share a dhikr list continues to be
  kept for those who added it to their library, even if you delete your account; however,
  your name as the sharer is anonymized when your account is deleted
- **Notification logs:** Auto-deleted after 30 days
- **Audit logs:** Retained for 12 months for security and compliance

- **Web participation without an account:** A guest record belongs to the circle
  it was created in. When that circle is deleted after it ends (24 hours after its
  end date), the guest record, the portion taken and the contributed count are
  permanently deleted with it. Abuse counters are deleted after 1 hour

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

**Website (manevihalka.app):** The account-free participation page uses no
cookies, but stores **a single value** in your browser's local storage: the random
identifier described above (section 2.4). Nothing is written for analytics or
advertising. Clearing your browser's site data also removes this value.

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
