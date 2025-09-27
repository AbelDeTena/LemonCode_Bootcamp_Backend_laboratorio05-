# Bootcamp Backend [Documental] Laboratorio 5 🍋
![CI](https://github.com/AbelDeTena/LemonCode_Bootcamp_Backend_laboratorio05/actions/workflows/ci.yml/badge.svg)

# Backend Lab: Cloud Deployments

En este laboratorio desplegamos la API REST del **Laboratorio 4** en la nube. Se realizan dos despliegues manuales y uno automático usando Render + MongoDB Atlas.

## 🧰 Stack
- Node + Express
- TypeScript
- MongoDB Atlas
- Render (manual + automático)

## 📌 Estructura de ramas
- **despliegue-manual-mock** → despliegue manual en Render con **datos mock**.
- **despliegue-manual-mongo** → despliegue manual en Render conectado a **MongoDB Atlas** (datos reales).
- **despliegue-automatico** → despliegue automático en Render con conexión a **MongoDB Atlas**.

## 🚀 Pasos básicos
1. **Clonar repo**
   ```bash
   git clone https://github.com/AbelDeTena/LemonCode_Bootcamp_Backend_laboratorio05-.git
   cd LemonCode_Bootcamp_Backend_laboratorio05-
   npm install
   ```

2. **Rama despliegue-manual-mock**
   - Render Web Service → `despliegue-manual-mock`.
   - Variables de entorno mínimas:
     ```env
     PORT=3000
     API_MOCK=true
     ```
   - URL pública Render con datos mock.

3. **Rama despliegue-manual-mongo**
   - Crear cluster en MongoDB Atlas.
   - Configurar variables en Render:
     ```env
     PORT=3000
     API_MOCK=false
     MONGODB_URI=...
     ```
   - Insertar datos en Atlas desde console-runner.
   - Probar API online.

4. **Rama despliegue-automatico**
   - Render Web Service conectado a GitHub → `despliegue-automatico`.
   - Configuración de CI/CD: auto-deploy en cada `push`.
   - Mismas variables de entorno que en `despliegue-manual-mongo`.

## 🛠️ Variables de entorno
```env
PORT=3000
API_MOCK=true|false
MONGODB_URI=  # Solo en ramas con Mongo
```

## ✅ Entrega
- Repo en GitHub con ramas `despliegue-manual-mock`, `despliegue-manual-mongo` y `despliegue-automatico`.
- Cada rama con su despliegue correspondiente en Render.

---