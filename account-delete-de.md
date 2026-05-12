---
layout: default
title: Konto löschen
lang: de
---

# Konto löschen

**App:** Manevi Halka
**Entwickler:** Emirhan Ayaz
**Kontakt:** emirhan.ayaz171@icloud.com

Sie können Ihr Konto und Ihre Daten in der Manevi-Halka-App jederzeit löschen.

## 1. Löschvorgang – 30 Tage Widerruf + endgültige Löschung

Die Kontolöschung erfolgt in **zwei Stufen**:

1. **Vorläufige Löschung (soft-delete, sofort, widerrufbar):** Mit dem Antippen von „Konto löschen" wird Ihr Konto entsprechend markiert. Push-Benachrichtigungen werden eingestellt, und Ihr Konto ist für andere Mitglieder nicht mehr sichtbar.
2. **30-tägiges Widerrufsfenster:** Wenn Sie sich innerhalb dieses Zeitraums erneut anmelden, wird Ihr Konto mit sämtlichen Daten vollständig wiederhergestellt.
3. **Endgültige Löschung (automatisch):** Nach Ablauf der 30 Tage löscht ein täglich ausgeführter Cron-Auftrag (pg_cron, 03:00 UTC) Ihr Konto und alle zugehörigen Daten **endgültig**. Dieser Schritt ist unwiderruflich.

Wenn Sie eine **sofortige endgültige Löschung** ohne die 30-tägige Wartefrist wünschen, kontaktieren Sie uns bitte per E-Mail (siehe §4 unten).

## 2. Löschen über die App (empfohlene Methode)

1. Öffnen Sie die Manevi-Halka-App
2. Melden Sie sich mit Ihrem Konto an
3. Wechseln Sie zum Tab **Profil**
4. Öffnen Sie **Einstellungen → Konto und Sicherheit**
5. Tippen Sie unten auf die rote Schaltfläche **„Konto löschen"**
6. Folgen Sie den Schritten zur Bestätigung

## 3. Datenexport vor der Löschung (optional)

Auf Wunsch können Sie sämtliche Ihrer Daten vor der Löschung sichern:

**Profil → Einstellungen → Datenexport → Als PDF herunterladen**

Diese Funktion wird im Rahmen des Rechts auf Datenübertragbarkeit nach GDPR/KVKK bereitgestellt und umfasst folgende Inhalte: Profil, Halka-Mitgliedschaften, Fortschrittsdaten zu den Gottesdienstaktivitäten, Notizen zu Koran/Büchern sowie den Abonnementstatus.

## 4. Löschanfrage per E-Mail

Sollten Sie keinen Zugriff auf die App haben oder eine **sofortige endgültige Löschung** wünschen, senden Sie eine E-Mail **von der mit Ihrem Konto verknüpften E-Mail-Adresse**:

- **E-Mail:** [emirhan.ayaz171@icloud.com](mailto:emirhan.ayaz171@icloud.com)
- **Betreff:** Antrag auf Kontolöschung
- **Inhalt:** „Ich beantrage die Löschung meines Manevi-Halka-Kontos. [Sofortige Löschung / 30-tägige vorläufige Löschung in Ordnung]"

Ihre Anfrage wird **innerhalb von 30 Tagen** bearbeitet, und wir teilen Ihnen das Ergebnis per E-Mail mit.

## Daten, die gelöscht werden

Nach Ablauf der 30-tägigen Frist (oder bei sofortiger Löschungsanfrage) werden folgende Daten endgültig entfernt:

- E-Mail-Adresse und Konto-Kennung
- Profildaten (Name, Benutzername, Profilbild)
- Gottesdienstfortschritt (Dhikr-Zählungen, Koranlektüre, Gebetsverfolgung)
- Halka- (Gruppen-) Mitgliedschaften (Ihnen zugeordnete Aufzeichnungen werden anonymisiert)
- Notizen zu Koranversen, Notizen zu Buchlektüren
- Push-Benachrichtigungs-Token
- Abonnementstatus

## Daten, die aufbewahrt werden können

Aufgrund gesetzlicher Pflichten und zur Betrugsprävention können eingeschränkte Daten in anonymisierter Form bis zu **90 Tage** aufbewahrt werden:

- Zeitpunkt der Löschung (anonymes Protokoll)
- Abrechnungsdaten (gesetzlich vorgeschrieben durch RevenueCat)

---

**Zuletzt aktualisiert:** 12. Mai 2026
