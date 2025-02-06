# 📂 Folder Tree Structure CLI

## 📝 Description
This is a back-end technical test from **OVEN**. This CLI application follows **Object-Oriented Programming (OOP)** principles and is designed to **store and manage files and folders efficiently**.

## 🚀 Getting Started

### 📌 Prerequisites
Ensure you have the following installed before running the application:
- **Node.js** (version 16 or later)
- **NPM** (comes with Node.js)

### 📦 Dependencies
The application requires the following npm packages:
- [`chalk`](https://www.npmjs.com/package/chalk) (`^5.4.1`) – for colored terminal output.
- [`inquirer`](https://www.npmjs.com/package/inquirer) (`^12.4.1`) – for interactive CLI prompts.

## ⚙ Installation

1. **Clone the repository**  
   ```sh
   git clone https://github.com/minhpho8202/OvenBackendTestTask.git
   cd OvenBackendTestTask
   ```
2. **Install dependencies**  
   ```sh
   npm install
   ```

## ▶ Usage
To start the CLI application, run:
```sh
npm start
```

### 🎯 Features
✅ **Add folders** 📂  
✅ **Add files** 📄  
✅ **Remove folders/files** 🗑  
✅ **Search for folders/files by name** 🔍  
✅ **Display folder structure as a tree** 📜  
✅ **Interactive CLI menu**  

---

## 📖 Example Commands

### 📌 Menu
```sh
? Choose an action:
❯ 📂 Add folder  
  📄 Add file  
  🗑 Remove folder  
  🗑 Remove file  
  🔍 Search file  
  🔍 Search folder  
  📜 Show folder structure  
```

### 📂 Adding a Folder
```sh
📂 Add folder  
Name: My Folder  
Parent folder (blank = root):  
✔ Folder "My Folder" is added successfully!  
```

### 📄 Adding a File
```sh
📄 Add file  
Name: my_file.txt  
Content: "This is a sample file."  
Parent folder (blank = root): My Folder  
✔ File "my_file.txt" is added successfully!  
```

### 📜 Displaying Folder Structure
```sh
📜 Show folder structure  

📂 Root  
 ├── 📂 My Folder  
 │   ├── 📄 my_file.txt  
```

---

✨ **Happy coding!** ✨ 🚀