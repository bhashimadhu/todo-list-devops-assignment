# Smart Daily Task Manager

## Project Description

Smart Daily Task Manager is a responsive To-Do List Application developed using HTML, CSS, and JavaScript.

The application allows users to add, complete, undo, delete, and filter their daily tasks. Tasks are saved in the browser using Local Storage, so they remain available even after the page is refreshed.

---

## Live Deployment

[Open Smart Daily Task Manager](https://bhashimadhu.github.io/todo-list-devops-assignment/)

Live Website URL:

```text
https://bhashimadhu.github.io/todo-list-devops-assignment/
```

---

## Team Members

| Student | Full Name | Student ID | Role |
|---|---|---|---|
| Student 1 | Upekshika Madhubhashini | ITBIN-2414-0019| DevOps / Release Manager |
| Student 2 | Kavindi Dilsara | ITBIN-2414-0022 | JavaScript Developer |
| Student 3 | Udeesha Akshari | ITBNM-2313-0123 | Frontend Developer |

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Actions
- GitHub Pages
- Visual Studio Code
- Browser Local Storage

---

## Application Features

- Add new tasks
- Add tasks using the Enter key
- Mark tasks as completed
- Undo completed tasks
- Delete tasks
- Filter all tasks
- Filter active tasks
- Filter completed tasks
- Display the total task count
- Save tasks using Local Storage
- Responsive mobile-friendly design

---

## Project Structure

```text
todo-list-devops-assignment/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── style.css
│   └── scripts/
│       └── app.js
│
├── tests/
│   └── app.test.js
│
├── .gitignore
├── README.md
└── package.json
```

---

## Branch Strategy

The project uses the following Git branch structure:

- `main` – Final production branch
- `develop` – Team integration branch
- `feature/devops-setup` – Student 1 DevOps work
- `feature/task-functionality` – Student 2 JavaScript work
- `feature/ui-design` – Student 3 frontend work
- `feature/heading-student2` – Merge conflict demonstration
- `feature/heading-student3` – Merge conflict resolution
- `docs/final-readme` – Final project documentation

---

## Individual Contributions

### Student 1 – DevOps / Release Manager

- Created the public GitHub repository
- Added team members as collaborators
- Created the `main` and `develop` branches
- Created the DevOps feature branch
- Configured the Continuous Integration workflow
- Configured the GitHub Pages deployment workflow
- Reviewed team members' Pull Requests
- Approved and merged completed changes
- Managed the final release process
- Deployed the application using GitHub Pages

### Student 2 – JavaScript Developer

- Implemented task creation functionality
- Implemented task completion functionality
- Implemented undo functionality
- Implemented task deletion functionality
- Added task filtering
- Added the task counter
- Added Local Storage support
- Added Enter-key support
- Participated in the merge conflict demonstration

### Student 3 – Frontend Developer

- Created the HTML structure
- Created the task input interface
- Added the task filter buttons
- Created the task list container
- Designed the application using CSS
- Added the responsive mobile layout
- Tested the user interface
- Resolved the intentional merge conflict

---

## Merge Conflict Demonstration

An intentional merge conflict was created when Student 2 and Student 3 edited the same heading in the `src/index.html` file.

Student 2 changed the heading to:

```text
Daily Task Manager
```

Student 3 changed the heading to:

```text
Smart To-Do Manager
```

Git detected a merge conflict because both students changed the same line.

The team reviewed both changes and resolved the conflict by combining the two headings into:

```text
Smart Daily Task Manager
```

The conflict resolution was committed using a meaningful commit message.

---

## CI/CD Process

The project uses GitHub Actions for Continuous Integration and Continuous Deployment.

### Continuous Integration

The `ci.yml` workflow runs when code is pushed or when a Pull Request is created.

It performs the following checks:

- Checks whether the required project files exist
- Configures Node.js
- Runs the project test command
- Reports whether the workflow passed or failed

### Continuous Deployment

The `deploy.yml` workflow runs when completed code is pushed or merged into the `main` branch.

It performs the following actions:

- Downloads the repository files
- Configures GitHub Pages
- Uploads the files inside the `src` folder
- Publishes the website using GitHub Pages

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bhashimadhu/todo-list-devops-assignment.git
```

### 2. Open the Project Folder

```bash
cd todo-list-devops-assignment
```

### 3. Open the Project in Visual Studio Code

```bash
code .
```

### 4. Run the Application

Open the following file using Live Server:

```text
src/index.html
```

Alternatively, open `src/index.html` directly in a web browser.

---

## Application Testing

The application was tested for the following functions:

- Task creation using the Add Task button
- Task creation using the Enter key
- Task completion
- Completed task undo
- Task deletion
- All-task filtering
- Active-task filtering
- Completed-task filtering
- Task counter updates
- Local Storage persistence
- Responsive mobile layout
- Browser console errors

---

## Pull Request Workflow

The team followed this collaboration process:

```text
Feature Branch
      ↓
Commit Changes
      ↓
Push to GitHub
      ↓
Create Pull Request
      ↓
Code Review
      ↓
Approval
      ↓
Merge into Develop
      ↓
Final Merge into Main
```

---

## Repository

GitHub Repository:

```text
https://github.com/bhashimadhu/todo-list-devops-assignment
```

## Live Website

```text
https://bhashimadhu.github.io/todo-list-devops-assignment/
```