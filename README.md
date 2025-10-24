# App-FullStack
# 🚗 Voiture Shop

## 📘 Description
*Voiture Shop* est une application *Full Stack* permettant de gérer une liste de voitures (affichage, ajout, modification et suppression).  
Le projet est composé de deux parties principales :
- *Backend :* Spring Boot + Spring Data REST (API RESTful)
- *Frontend :* React.js + Axios pour la communication avec l’API

---

## 🧩 Fonctionnalités principales
✅ Afficher la liste des voitures  
✅ Ajouter une nouvelle voiture  
✅ Modifier les informations d’une voiture  
✅ Supprimer une voiture  
✅ Communication entre le frontend et le backend via Axios  
✅ Gestion du CORS entre Spring Boot et React  

---

## 🏗️ Structure du projet

SpringDataRest/
│
├── src/
│ ├── main/
│ │ ├── java/org/cours/SpringDataRest/
│ │ │ ├── Voiture.java
│ │ │ ├── VoitureRepo.java
│ │ │ ├── VoitureController.java
│ │ │ └── SpringDataRestApplication.java
│ │ └── webapp/reactjs/
│ │ ├── package.json
│ │ ├── src/
│ │ │ ├── App.jsx
│ │ │ ├── Components/
│ │ │ │ ├── ListeVoitures.jsx
│ │ │ │ ├── Voiture.jsx
│ │ │ │ └── FormVoiture.jsx
│ │ │ └── index.js
│ │ └── public/
│ │ └── index.html
│ └── resources/
│ └── application.properties
│
└── pom.xml

yaml
Copier le code

---

## ⚙️ Installation et exécution

### 🔹 1. Cloner le projet
```bash
git clone https://github.com/<ton-nom-utilisateur>/voiture-shop.git
cd voiture-shop
🔹 2. Lancer le Backend (Spring Boot)
🧰 Prérequis :
Java 17+

Maven

▶️ Étapes :
bash
Copier le code
cd SpringDataRest
mvn spring-boot:run
Le backend démarre sur :
👉 http://localhost:8080

🔹 3. Lancer le Frontend (React)
🧰 Prérequis :
Node.js + npm

▶️ Étapes :
bash
Copier le code
cd src/main/webapp/reactjs
npm install
npm start
Le frontend démarre sur :
👉 http://localhost:5174

🔗 API Endpoints
Méthode	Endpoint	Description
GET	/api/voitures	Liste toutes les voitures
POST	/api/voitures	Ajoute une nouvelle voiture
PUT	/api/voitures/{id}	Met à jour une voiture existante
DELETE	/api/voitures/{id}	Supprime une voiture

🧠 Explication du cycle de vie React
Dans le composant ListeVoitures.jsx :

componentDidMount() est utilisé pour appeler l’API dès que le composant est monté.

Axios gère les requêtes HTTP vers le backend.

Les méthodes editVoiture() et deleteVoiture() permettent respectivement la modification et la suppression d’une voiture.

🛠️ Technologies utilisées
🌐 Backend :
Spring Boot

Spring Data JPA

Spring Web

H2 / MySQL Database

Spring Data REST

💻 Frontend :
React.js

Axios

JavaScript (ES6+)

HTML / CSS

🚀 Exemple de configuration du CORS
Dans VoitureController.java :

java
Copier le code
@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api")
public class VoitureController {
    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }
}
