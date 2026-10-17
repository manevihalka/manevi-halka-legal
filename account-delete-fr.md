---
layout: default
title: Suppression de compte
description: "Comment supprimer ton compte Manevi Halka dans l'application ou par e-mail, le délai de récupération de 30 jours et les données supprimées ou conservées."
lang: fr
---

# Suppression de compte

**Application :** Manevi Halka<br>
**Développeur :** Emirhan Ayaz<br>
**Contact :** privacy@manevihalka.app

Tu peux supprimer ton compte Manevi Halka et tes données à tout moment.

## 1. Processus de suppression : 30 jours de récupération + suppression définitive

La suppression de compte se déroule en **deux étapes** :

1. **Suppression réversible (immédiate, annulable) :** lorsque tu confirmes avec « Supprimer définitivement mon compte », ton compte est marqué. Les notifications push sont interrompues et ton compte devient invisible pour les autres membres.
2. **Fenêtre de récupération de 30 jours :** si tu te reconnectes pendant cette période, ton compte est restauré avec l'ensemble de tes données intactes.
3. **Suppression définitive (automatique) :** au bout de 30 jours, une tâche cron quotidienne (pg_cron, 03:00 UTC) **supprime définitivement** ton compte et toutes les données associées. Cette étape est irréversible.

Si tu souhaites une **suppression définitive immédiate** sans attendre les 30 jours, contacte-nous par e-mail (§4 ci-dessous).

## 2. Suppression depuis l'application (méthode recommandée)

1. Ouvre l'application Manevi Halka
2. Connecte-toi à ton compte
3. Accède à l'onglet **Profil**
4. Appuie sur **Compte & Sécurité**
5. Appuie sur la ligne rouge **« Supprimer définitivement le compte »** en bas de l'écran
6. Suis les étapes de confirmation

## 3. Exportation de tes données avant la suppression (facultatif)

Si tu le souhaites, tu peux sauvegarder l'ensemble de tes données avant la suppression :

**Profil → Compte & Sécurité → Télécharger mes données** (au format PDF)

Cette fonctionnalité est fournie au titre du droit à la portabilité des données prévu par le RGPD/KVKK et inclut : le profil, les adhésions aux halka, les données de progression d'adoration, les notes sur le Coran et les livres, ainsi que le statut d'abonnement.

## 4. Demande de suppression par e-mail

Si tu ne peux pas accéder à l'application ou si tu souhaites une **suppression définitive immédiate**, envoie un e-mail **depuis l'adresse associée à ton compte** :

- **E-mail :** [privacy@manevihalka.app](mailto:privacy@manevihalka.app)
- **Objet :** Demande de suppression de compte
- **Corps du message :** « Je demande la suppression de mon compte Manevi Halka. [Suppression immédiate / suppression réversible de 30 jours acceptée] »

Ta demande sera traitée **dans un délai de 30 jours** et nous t'informerons du résultat par e-mail.

## Données supprimées

À l'issue de la période de 30 jours (ou lors d'une demande de suppression immédiate), les éléments suivants sont définitivement supprimés :

- Adresse e-mail et identifiant de compte
- Données de profil (nom, nom d'utilisateur, photo de profil)
- Progression d'adoration (compteurs de dhikr, achèvement du Coran, suivi des prières)
- Adhésions aux halka (groupes) (les enregistrements qui te sont attribués sont anonymisés)
- Notes sur les versets du Coran, notes de lecture de livres
- Jetons de notification push
- Statut d'abonnement
- Tes enregistrements personnels sur cet appareil : tes invocations confiées
  (personnes pour qui tu pries), dhikrs d'intention et dédicaces, invocations
  favorites, progression du tesbihat, ainsi que les livres, notes et surlignages de
  ta Bibliothèque (ils sont supprimés aussitôt de l'appareil sur lequel tu
  supprimes le compte ; sur tes autres appareils, ils restent sur l'appareil concerné)

## Données pouvant être conservées

Pour les obligations légales et la prévention de la fraude, certaines données limitées peuvent être conservées sous forme anonymisée pendant **90 jours maximum** :

- Horodatage de la suppression (journal anonyme)
- Enregistrements de facturation (conformément aux obligations légales, par RevenueCat)

---

**Dernière mise à jour :** 17 octobre 2026
