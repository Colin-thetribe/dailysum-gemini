# 🔍 Ajout des endpoints de recherche pour les éditeurs et les villes

## Description
Ajout de deux nouveaux endpoints pour faciliter la recherche d'éditeurs et de villes dans l'application.

### 🔄 Nouveaux endpoints
- `/editor/search` : Recherche d'éditeurs par titre
- `/city/search` : Recherche de villes par label

### ⚙️ Caractéristiques communes
- Recherche minimale de 3 caractères
- Limite de 10 résultats par requête
- Recherche insensible à la casse (icontains)
- Réponse optimisée avec `values()`

### 📝 Format des réponses
**Editor search :**
```json
{
    "items": [
        {"id": 1, "title": "Editeur exemple"}
    ]
}
```

**City search :**
```json
{
    "items": [
        {"id": 1, "label": "Paris", "zipcode": "75000"}
    ]
}
```