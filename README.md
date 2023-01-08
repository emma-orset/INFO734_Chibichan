# INFO734_Chibichan
Projet FullStack de Emma ORSET, Salma OUKZIZ et Kaoutar BOURABI

## Introduction

Pour commencer, ce projet a été réalisé dans le cadre de notre apprentissage en études d'informatique.

Le but de ce projet était de créer un site web pour la gestion de patrons de conceptions d'activités manuelles telles que le crochet, la couture, les bracelets brésiliens, la broderie, etc.

Le projet a été imaginé par Emmma, qui est présidente du club Poly'Art de l'école, et qui aimerait bien retrouver plus facilement tous les patrons qu'elle utilise.

Afin de prendre en compte les attentes du professeurs, nous avons ajouté la possibilité de se connecter en tant que membre.

Beaucoup d'éffort ont été menés pour rendre ce projet fonctionnel.

Dans un premier temps, nous allons vous expliquer comment faire tourner le programme sur votre machine personnelle, puis nous expliquerons les fonctionnalités globales du site, ensuite nous parlerons des difficultés que nous avons rencontrées, et pour finir nous énumérerons tout ce que nous voulons ajouter au site plus tard.

## Lancement du projet

Pour ce projet, nous avons utilisé une base de données MongoDB. Afin que le professeur puisse acceder aux données préremplies directement, nous avons laissé les codes d'accès sur github, et nous avons configuré notre base de données pour qu'elle soit accessible par tout le monde.
Quand le professeur aura terminé sa notation, nous enlèverons les accès à la base de données et nous expliquerons comment ajouter les vôtres.

Pour lancer le projet, il faut d'abord télécharger le projet ou bien le cloner avec git.

Ensuite, à la racine du projet, il faut faire :
```
npm install
```
Puis :

```
npm start
```

Cela va lancer la partie backend du site.

Pour lancer la partie frontend, il suffit d'ouvrir un nouveau terminal et écrire :
```
cd client
```

Quand vous êtes sur le dossier client, reprenez les mêmes commandes que pour le backend, c-à-d :
```
npm install
npm start
```

Si tout se passe bien vous allez pouvoir naviguer sur le site !
[http://localhost:3000/](http://localhost:3000/)

## Fonctionnalités

Lorsque vous arrivez sur le site, vous êtes un utilisateur non connecté. Vous pouvez déjà voir les patrons, les rechercher, les filtrer, voir les commentaires, et même télécharger les PDF des patrons.
Le site vous invite à vous connecter si vous avez déjà un compte, ou bien vous inscrire.
Attention, vous ne pouvez pas utiliser le même pseudo qu'un autre membre, ou la même adresse mail. Votre mot de passe doit faire plus de 6 charactère.

Lorsque vous êtes connecté, vous devenez membre. Un membre peut faire plus de chose que l'utilisateur :
- commenter un patron
- supprimer et modifier ses commentaires
- aimer un patron (ou ne plus l'aimer)
- aimer un commentaire (ou ne plus l'aimer) (il ne peut pas aimer son propre commentaire)
- voir la liste des patrons qu'il aime
- télécharger les WORD des patrons (s'ils existent)
- modifier son profil (ou le supprimer)

Vous ne pouvez pas créer un compte administrateur sur le site car ce dernier doit être créé depuis la base de données en modifiant l'attribut "admin" du membre.
Ainsi, le compte admin est celui-ci :
email : admin@gmail.com
mot de passe : password

L'administrateur peut faire plus de chose que le membre : 
- ajouter, modifier, supprimer un patron
- modifier et supprimer les commentaires de n'importe qui

## Difficultés rencontrées

Nous avons eu beaucoup de difficultés pendant ce projet. La première étape était de bien débuter le projet. Comme nous n'avions aucune connaissance en MongoDB, nous avons mis un peu de temps à comprendre, mais finalement c'est plutôt bien ! 

L'upload d'images avec multer était la partie la plus compliquée de notre application. Au départ, nous voulions que l'utilisateur puisse ajouter des images à son commentaire, mais après avoir passé 4 journées entières dessus, nous avons abandonné cette fonctionnalité qui n'était pas vitale au site.

L'apprentissage de React et l'utilisation de Redux a aussi été une tâche difficile.

Finalement, même si nous avons mis beaucoup de temps pour faire notre site web, et que nous avons beaucoup perdu de temps sur les erreurs, nous avons fait en sorte de finir les parties les plus importantes. 

La seule chose que nous n'avons pas eu le temps de gérer, ce sont les erreurs en front. Certaines erreurs ont été traitées en front, mais pas toutes. Par contre, toutes les erreurs sont gérées en backend, donc même si le front ne renvoie pas d'erreur mais qu'il y en avait une, la requête n'est pas envoyé à la base de données et lorsqu'on recharge la page, on peut voir que la modification ne s'est pas effectuée en base de données.

## Dans le futur

Outre le fait de gérer les erreurs en front, nous avons pour projet de rajouter beaucoup de fonctionnalités, et aussi de nettoyer notre code et le commenter.
Malgrés les centaines d'heures passées sur ce projet, il n'est pas complet, mais il est fonctionnel sur ce qui est implémenté.

Dans un premier temps, il faudrait modifier le CSS pour le rendre plus joli et plus responsive. Le site est ergonomique mais pas très joli.
Ensuite, voici les focntionnalité que nous voudrions ajouter :
- envoyer un mail pour vérifier l'adresse mail
- envoyer un mail pour récupérer le mot de passe
- faire en sorte que les membres puissent ajouter maximum 20 images à leur commentaire
- L'admin doit pouvoir supprimer des membres
- on voudrait que les membres puissent répondre directement à des commentaires (commenter des commentaires)
- pour le moment, les commentaires sont tous affichés, on voudrait mettre un "voir plus" pour éviter d'afficher 100 commentaires d'un coup

## Conclusion

Comme nous le disions, ce code n'est pas complet, pas assez commenté, et pas très propre, néanmoins il marche et nous sommes fières de ce que nous avons pu faire en aussi peu de temps. 
Nous espérons que vous apprécierez notre travail, tout autant que nous avons apprécié le réaliser.
