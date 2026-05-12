---
layout: default
title: Suppression de compte
lang: fr
---

# Suppression de compte

**Application :** Manevi Halka
**Développeur :** Emirhan Ayaz
**Contact :** emirhan.ayaz171@icloud.com

Vous pouvez supprimer votre compte Manevi Halka et vos données à tout moment.

## 1. Processus de suppression — 30 jours de récupération + suppression définitive

La suppression de compte se déroule en **deux étapes** :

1. **Suppression réversible (immédiate, annulable) :** lorsque vous appuyez sur « Supprimer le compte », votre compte est marqué. Les notifications push sont interrompues et votre compte devient invisible pour les autres membres.
2. **Fenêtre de récupération de 30 jours :** si vous vous reconnectez pendant cette période, votre compte est restauré avec l'ensemble de vos données intactes.
3. **Suppression définitive (automatique) :** au bout de 30 jours, une tâche cron quotidienne (pg_cron, 03:00 UTC) **supprime définitivement** votre compte et toutes les données associées. Cette étape est irréversible.

Si vous souhaitez une **suppression définitive immédiate** sans attendre les 30 jours, contactez-nous par e-mail (§4 ci-dessous).

## 2. Suppression depuis l'application (méthode recommandée)

1. Ouvrez l'application Manevi Halka
2. Connectez-vous à votre compte
3. Accédez à l'onglet **Profil**
4. Ouvrez **Paramètres → Compte et sécurité**
5. Appuyez sur le bouton rouge **« Supprimer le compte »** en bas de l'écran
6. Suivez les étapes de confirmation

## 3. Exportation de vos données avant la suppression (facultatif)

Si vous le souhaitez, vous pouvez sauvegarder l'ensemble de vos données avant la suppression :

**Profil → Paramètres → Exportation des données → Télécharger au format PDF**

Cette fonctionnalité est fournie au titre du droit à la portabilité des données prévu par le RGPD/KVKK et inclut : le profil, les adhésions aux halka, les données de progression d'adoration, les notes sur le Coran et les livres, ainsi que le statut d'abonnement.

## 4. Demande de suppression par e-mail

Si vous ne pouvez pas accéder à l'application ou si vous souhaitez une **suppression définitive immédiate**, envoyez un e-mail **depuis l'adresse associée à votre compte** :

- **E-mail :** [emirhan.ayaz171@icloud.com](mailto:emirhan.ayaz171@icloud.com)
- **Objet :** Demande de suppression de compte
- **Corps du message :** « Je demande la suppression de mon compte Manevi Halka. [Suppression immédiate / suppression réversible de 30 jours acceptée] »

Votre demande sera traitée **dans un délai de 30 jours** et nous vous informerons du résultat par e-mail.

## Données supprimées

À l'issue de la période de 30 jours (ou lors d'une demande de suppression immédiate), les éléments suivants sont définitivement supprimés :

- Adresse e-mail et identifiant de compte
- Données de profil (nom, nom d'utilisateur, photo de profil)
- Progression d'adoration (compteurs de dhikr, achèvement du Coran, suivi des prières)
- Adhésions aux halka (groupes) (les enregistrements qui vous sont attribués sont anonymisés)
- Notes sur les versets du Coran, notes de lecture de livres
- Jetons de notification push
- Statut d'abonnement

## Données pouvant être conservées

Pour les obligations légales et la prévention de la fraude, certaines données limitées peuvent être conservées sous forme anonymisée pendant **90 jours maximum** :

- Horodatage de la suppression (journal anonyme)
- Enregistrements de facturation (conformément aux obligations légales, par RevenueCat)

---

**Dernière mise à jour :** 12 mai 2026
