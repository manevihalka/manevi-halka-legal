---
layout: default
title: Konto löschen
description: "Wie du dein Konto bei Manevi Halka in der App oder per E-Mail löschst, die 30-tägige Wiederherstellungsfrist und was gelöscht oder aufbewahrt wird."
lang: de
---

# Konto löschen

**App:** Manevi Halka<br>
**Entwickler:** Emirhan Ayaz<br>
**Kontakt:** privacy@manevihalka.app

Du kannst dein Konto und deine Daten in der Manevi-Halka-App jederzeit löschen.

## 1. Löschvorgang – 30 Tage Widerruf + endgültige Löschung

Die Kontolöschung erfolgt in **zwei Stufen**:

1. **Vorläufige Löschung (soft-delete, sofort, widerrufbar):** Wenn du mit „Mein Konto endgültig löschen" bestätigst, wird dein Konto entsprechend markiert. Push-Benachrichtigungen werden eingestellt, und dein Konto ist für andere Mitglieder nicht mehr sichtbar.
2. **30-tägiges Widerrufsfenster:** Wenn du dich innerhalb dieses Zeitraums erneut anmeldest, wird dein Konto mit sämtlichen Daten vollständig wiederhergestellt.
3. **Endgültige Löschung (automatisch):** Nach Ablauf der 30 Tage löscht ein täglich ausgeführter Cron-Auftrag (pg_cron, 03:00 UTC) dein Konto und alle zugehörigen Daten **endgültig**. Dieser Schritt ist unwiderruflich.

Wenn du eine **sofortige endgültige Löschung** ohne die 30-tägige Wartefrist wünschst, kontaktiere uns bitte per E-Mail (siehe §4 unten).

## 2. Löschen über die App (empfohlene Methode)

1. Öffne die Manevi-Halka-App
2. Melde dich mit deinem Konto an
3. Wechsle zum Tab **Profil**
4. Tippe auf **Konto & Sicherheit**
5. Tippe unten auf die rote Zeile **„Konto endgültig löschen"**
6. Folge den Schritten zur Bestätigung

## 3. Datenexport vor der Löschung (optional)

Auf Wunsch kannst du sämtliche deiner Daten vor der Löschung sichern:

**Profil → Konto & Sicherheit → Meine Daten herunterladen** (als PDF)

Diese Funktion wird im Rahmen des Rechts auf Datenübertragbarkeit nach GDPR/KVKK bereitgestellt und umfasst folgende Inhalte: Profil, Halka-Mitgliedschaften, Fortschrittsdaten zu den Gottesdienstaktivitäten, Notizen zu Koran/Büchern sowie den Abonnementstatus.

## 4. Löschanfrage per E-Mail

Solltest du keinen Zugriff auf die App haben oder eine **sofortige endgültige Löschung** wünschen, sende eine E-Mail **von der mit deinem Konto verknüpften E-Mail-Adresse**:

- **E-Mail:** [privacy@manevihalka.app](mailto:privacy@manevihalka.app)
- **Betreff:** Antrag auf Kontolöschung
- **Inhalt:** „Ich beantrage die Löschung meines Manevi-Halka-Kontos. [Sofortige Löschung / 30-tägige vorläufige Löschung in Ordnung]"

Deine Anfrage wird **innerhalb von 30 Tagen** bearbeitet, und wir teilen dir das Ergebnis per E-Mail mit.

## Daten, die gelöscht werden

Nach Ablauf der 30-tägigen Frist (oder bei sofortiger Löschungsanfrage) werden folgende Daten endgültig entfernt:

- E-Mail-Adresse und Konto-Kennung
- Profildaten (Name, Benutzername, Profilbild)
- Gottesdienstfortschritt (Dhikr-Zählungen, Koranlektüre, Gebetsverfolgung)
- Halka- (Gruppen-) Mitgliedschaften (dir zugeordnete Aufzeichnungen werden anonymisiert)
- Notizen zu Koranversen, Notizen zu Buchlektüren
- Push-Benachrichtigungs-Token
- Abonnementstatus
- Deine persönlichen Einträge auf diesem Gerät: deine anvertrauten Bittgebete
  (Personen, für die du betest), Absichts-Dhikr und Widmungen, Lieblingsbittgebete,
  dein Tesbihat-Fortschritt sowie Bücher, Notizen und Markierungen in deiner
  Bibliothek (sie werden auf dem Gerät, auf dem du das Konto löschst, sofort
  entfernt; auf deinen anderen Geräten bleiben sie dort)

## Daten, die aufbewahrt werden können

Aufgrund gesetzlicher Pflichten und zur Betrugsprävention können eingeschränkte Daten in anonymisierter Form bis zu **90 Tage** aufbewahrt werden:

- Zeitpunkt der Löschung (anonymes Protokoll)
- Abrechnungsdaten (gesetzlich vorgeschrieben durch RevenueCat)

---

**Zuletzt aktualisiert:** 17. Oktober 2026
