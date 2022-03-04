# Installation
1. Si ce n'est pas déjà le cas installer [Git](https://git-scm.com/downloads)
2. Cloner le repo
3. Installer les dépendences npm avec
> npm run i
4. Une fois dans le repo, créer un fichier nommé .env à la racine du projet et récupérer les variables depuis le discord

# Commandes
Le projet a été conçu pour fonctionner avec 2 modes de dev.
1. dev-local (appel d'api en local)
2. dev-hosted (appel d'api sur le serveur)

La liste des commandes pour démarrer le projet en fonction est la suivante :
* Démarrer en dev-local
> npm run dev-local
* Démarrer en dev-hosted
> npm run dev-hosted

# Traduction
Le projet a été conçu pour prendre en charge la traduction de langues.

Le module utilisé pour la traduction est [i18n](https://vue-i18n.intlify.dev/guide/advanced/composition.html#basic-usage).

Tous les fichiers de traduction sont situés dans /src/locales.

Pour faciliter la création de traduction il est possible de lancer la commande suivante :
> vue ui
Cela va ouvrir une interface graphique avec toutes les informations concernant le projet.

Il suffit ensuite de naviguer dans l'onglet **Localizations**

Tous les libellés peuvent ensuite être traduits en utilisant l'ID du terme dans le fichier de traduction.
