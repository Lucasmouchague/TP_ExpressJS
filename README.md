# TP_ExpressJS
## Installation :
Prérequis :
```
nodejs
npm
sqlite3
```
A taper dans un terminal :
```
git clone https://github.com/Lucasmouchague/TP_ExpressJS.git
cd TP_ExpressJS
npm install
```
## Démarrage :
```
node app.js
```
### Routes :
|methode|route (description)|
|---|---|
|get    | /  (redirige vers /cve)|
|post   |/cve   (permet d'ajouter une CVE)|
|get   |/cve/add (permet de d'afficher la page add.html)  |
|get   |/cve/:id   (permet de recuperer une CVE par son id)|
|post   |/delete/cve   (permet de supprimer une CVE via un formulaire)|
|delete   |/deleteCve/:id   (permet de supprimer une CVE par son id)|
|patch   |/editCve/:id   (permet de modifier une CVE via son id)|
|get   |/cve   (permet d'afficher toutes les CVE)|
|post   |/edit/cve   (permet d'éditer une CVE via un formulaire)|
|post   |/addUsers   (permet d'ajouer un utilisateur via un formulaire)|
|delete   |/delUsers/:id   (permet de supprimer un utilisation via son id)|
|get   |/Users   (permet d'afficher tout les utilisateurs)|
|get   |/Users/add   (permet d'afficher le formulaire pour ajouter un utilisateur)|
|get   |/Users/delete  (permet d'afficher le formulaire pour supprimer un utilisateur) |
|get   |/sessions  (permet d'afficher le formulaire pour se connecter) |
|get   |/cve/delete   (permet d'afficher le formulaire pour supprimer une cve)|
|get  |/cve/edit   (permet d'afficher le formulaire pour éditer une CVE)|
