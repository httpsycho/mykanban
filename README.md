# 🗂 MyKanban

**MyKanban** is a pet project built from scratch to demonstrate frontend development skills.  
It allows users to manage tasks using the **Kanban methodology**, with support for **drag-and-drop**, **dark/light themes**, and **multilingual interface**.

---

## 📌 Overview

**MyKanban** is a personal pet project created to demonstrate essential frontend development skills in a clear and practical format.  
It features task management based on the Kanban methodology, with drag-and-drop interactions, multilingual support, theme switching, and global state handling.  
The goal was to build a clean and responsive interface that showcases thoughtful architecture and user experience.

---

## 🧾 Table of Contents

- [📸 Preview](#-preview)
- [📦 Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [⚙️ Installation](#-installation)
- [🔐 Demo Authorization](#-demo-authorization)
- [🌍 Language Support](#-language-support)
- [📡 Demo API Functions](#-demo-api-functions)
- [🧪 Additional Demo: Task Fetching](#-additional-demo-task-fetching)
- [📁 Folder Structure](#-folder-structure)
- [🚀 Future Improvements](#-future-improvements)
- [🙌 Contribution](#-contribution)
- [📄 License](#-license)

---

## ✨ Features

### ✅ Task Interaction

- 📝 Add, edit, delete, and pin tasks
- 🎯 Prioritize tasks: Low / Medium / High
- ↕ Sort tasks by **date** or **priority**
- 🧲 Drag & drop tasks between columns
- 🔒 Restriction: tasks can’t move to **Done** unless in **In Progress**

### 💡 UI & UX

- 🎬 Smooth transitions and **shake animation** on invalid actions
- 🌓 Toggle between dark and light themes
- 🌐 Multilingual interface (English / Russian)

### 🔐 Authorization

- 👤 Local login with username and password _(demo only)_

### 💾 State Persistence

- 💽 Save tasks to `localStorage`
- 🌍 Optional demo API methods (POST / DELETE via JSONPlaceholder)

---

## 🛠️ Tech Stack (Built with Vite)

- **JavaScript (ES6+) / JSX**
- **React** — functional components and hooks
- **Zustand** — global state management
- **@dnd-kit/core** — modern drag-and-drop support
- **react-i18next** — internationalization and language switching
- **Axios** — demo API interaction (GET, POST, DELETE)
- **TextareaAutosize** — auto-resizing input fields
- **Custom dropdowns and modals**
- **CSS3** — BEM methodology, responsive layout, light/dark themes
- **LocalStorage API** — persistent client-side data

---

## 🖼️ Preview

### 🌞 Light Theme

![Light Preview](/public/images/preview-kanban-light-theme.png)

### 🌚 Dark Theme

![Dark Preview](/public/images/preview-kanban-dark-theme.png)

### 🎬 Live Demo (GIF)

![Kanban Demo](/public/images/mykanban-demo.gif)

### ➕ Add New Task

![Add Task Form](/public/images/feature-task-add-form.png)

### 🖱 Drag and Drop

![Drag Preview](/public/images/feature-drag-preview.png)

### ✏️ Edit Task

![Edit Mode](/public/images/feature-task-edit-mode.png)

### 🔽 Sort Tasks

![Sorting Menu](/public/images/feature-column-sorting-menu.png)

### 🏷 Change Task Priority

![Priority Dropdown](/public/images/feature-task-priority-dropdown.png)

### 👤 User Menu

![User Menu](/public/images/feature-user-menu-dropdown.png)

### 🔐 Login Form (Light & Dark)

![Login Screen Light Preview](/public/images/preview-login-light-theme.png)  
![Login Screen Dark Preview](/public/images/preview-login-dark-theme.png)

---

## 📦 Installation

To run this project locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/httpsycho/mykanban.git

# 2. Navigate into the project directory
cd mykanban

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 🔐 Demo Authorization

Use the following credentials to log in:

```bash
Username: admin
Password: 1234
```

---

## 🌐 Language Support

- English (default)
- Russian

> Language can be toggled from the header.

---

## 🧪 Demo API Functions

Located in `taskStore.js`. These use **axios** to send mock requests to [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `demoAddTaskToServer()`
- `demoDeleteTaskFromServer()`

> These functions are for demonstration purposes only and not part of the core app logic.

---

## 🔄 Additional Demo: Task Fetching

**Component:** `TodoFetcher.jsx`  
Fetches and displays a small list of tasks using **axios** and `useEffect`.

> Used to test API integration and display results.

---

## 📁 Folder Structure (Simplified)

<details>
<summary>Click to expand</summary>

```
public/
└── images/           # UI previews and SVG icons
    └── icons/        # Icons for light/dark themes

src/
├── components/       # Main UI components
│   ├── App.jsx
│   ├── Header.jsx
│   ├── KanbanBoard.jsx
│   ├── KanbanColumn.jsx
│   ├── TaskCard.jsx
│   ├── Login.jsx
│   ├── UserMenu.jsx
│   ├── SortDropdown.jsx
│   ├── DragOverlayCard.jsx
│   ├── TodoFetcher.jsx
│   ├── DemoApiCalls.jsx
│   └── ...
├── i18n/             # Internationalization
│   └── locales/
│       ├── en/translation.json
│       └── ru/translation.json
├── authStore.js      # Auth state (Zustand)
├── taskStore.js      # Task state and logic
├── App.jsx           # Root component
├── App.css           # Main styling
├── main.jsx          # App entry point
└── index.html        # HTML template
```

</details>

---

## 🚧 Future Improvements

- Add unit and integration tests
- Integrate real backend with authentication and database
- Add task comments
- Further polish responsive layout

---

## 🤝 Contribution

This is a personal project and not currently accepting contributions.  
Feel free to fork it or use parts of the code for learning.

---

## 📃 License

Licensed under the **MIT License** — free to use for any personal or commercial purpose.

---
