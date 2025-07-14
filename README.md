
# Farms-simOmomene

This project contains both the **frontend** and **backend** plus **db** folders. UPDATED WITH PATCH ANIMAL FARM!

---

## How to run the app locally 

1. **Unzip** the project folder `farms-simOmomene`

---

## 🗃️ Import SQL Dump into Local MySQL Database

To set up the local database using the provided SQL dump:

---

### 1. Open your terminal and log into MySQL:

```bash
mysql -u root -p
```
> Enter your MySQL root password when prompted.

---

### 2. Create the database:

```sql
CREATE DATABASE IF NOT EXISTS Omomene CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

### 3. Import the SQL dump

> ⚠️ Use **CMD**  — not PowerShell — for this step. You might face problems with french character encoding using terminal. 
Best action is to load the sqldump.sql directly into MySQL workbench to avoid character encoding problems. Else,

Open a new terminal in the root of the project folder, then run:

```bash
mysql -u root -p Omomene < db/sqldump.sql
```

> If you're using PowerShell(not adviced), use this instead:

```powershell
Get-Content .\db\sqldump.sql | mysql -u root -p Omomene
```

---

Once done, your local MySQL database will be ready with all tables and data.

### .env file setup (place in backend/ folder)

Create a file named `.env` in the backend folder if not there with the following content: replace password with your db password

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=Omomene
PORT=5000
```

---


### Terminal 1: Start the backend

```bash
cd backend
npm install
node app.js
```

---

### Terminal 2: Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---




