# Smart Daily Task Manager

## Project Description

Smart Daily Task Manager is a responsive To-Do List Application developed using HTML, CSS, and JavaScript.

The application allows users to add, complete, undo, delete, and filter their daily tasks. Tasks are saved in the browser using Local Storage, so they remain available even after the page is refreshed.

The project was developed as a team collaboration assignment using Git, GitHub, feature branches, Pull Requests, GitHub Actions, GitHub Pages, and Netlify.

---

## Live Deployment

### Netlify Deployment

[Open Smart Daily Task Manager on Netlify](https://visionary-creponne-27fde6.netlify.app)

```text
https://visionary-creponne-27fde6.netlify.app
```

### GitHub Pages Deployment

[Open Smart Daily Task Manager on GitHub Pages](https://bhashimadhu.github.io/todo-list-devops-assignment/)

```text
https://bhashimadhu.github.io/todo-list-devops-assignment/
```

---

## Team Members

| Student | Full Name | Student ID | Role |
|---|---|---|---|
| Student 1 | Upekshika Madhubhashini | ITBIN-2414-0019 | DevOps / Release Manager |
| Student 2 | Kavindi Dilsara | ITBIN-2414-0022 | JavaScript Developer |
| Student 3 | Udeesha Akshari | ITBNM-2313-0069 | Frontend Developer |

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Actions
- GitHub Pages
- Netlify
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
- Display active and completed task counts
- Display task completion progress
- Save tasks using Local Storage
- Restore saved tasks after refreshing the page
- Responsive mobile-friendly design
- Clean and modern TaskFlow user interface

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

Each student completed their work using a separate feature branch. Completed changes were reviewed through Pull Requests before being merged into the integration and production branches.

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
- Connected the GitHub repository to Netlify
- Configured the Netlify production deployment
- Enabled public visitor access for the Netlify website
- Verified desktop and mobile production deployments

### Student 2 – JavaScript Developer

- Implemented task creation functionality
- Implemented task completion functionality
- Implemented undo functionality
- Implemented task deletion functionality
- Added task filtering
- Added the task counter
- Added active and completed task statistics
- Added Local Storage support
- Added Enter-key support
- Ensured task data remains after page refresh
- Participated in the merge conflict demonstration

### Student 3 – Frontend Developer

- Created the HTML structure
- Created the task input interface
- Added the task filter buttons
- Created the task list container
- Designed the application using CSS
- Created the TaskFlow dashboard interface
- Added task statistics cards
- Added the responsive mobile layout
- Tested the user interface on desktop and mobile
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
- Installs the required dependencies
- Runs the project test command
- Detects test failures
- Reports whether the workflow passed or failed

### Continuous Deployment with GitHub Pages

The `deploy.yml` workflow runs when completed code is pushed or merged into the `main` branch.

It performs the following actions:

- Downloads the repository files
- Configures GitHub Pages
- Uploads the files inside the `src` folder
- Publishes the website using GitHub Pages
- Provides a publicly accessible production URL

### Continuous Deployment with Netlify

The GitHub repository is also connected to Netlify.

Netlify performs the following actions:

- Monitors the `main` branch
- Detects new commits pushed to GitHub
- Automatically starts a new deployment
- Publishes the files inside the `src` directory
- Provides a public `netlify.app` production URL
- Supports automatic redeployment after future updates

Netlify deployment configuration:

```text
Production Branch: main
Base Directory: Empty
Build Command: Empty
Publish Directory: src
Production Visibility: Public
```

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

### 4. Install Project Dependencies

```bash
npm install
```

### 5. Run the Tests

```bash
npm test
```

### 6. Run the Application

Open the following file using Live Server:

```text
src/index.html
```

Alternatively, run a simple local server:

```bash
npx serve src
```

Open the localhost URL shown in the terminal.

The application can also be opened by directly opening:

```text
src/index.html
```

in a web browser.

---

## Local Storage

The application uses Browser Local Storage to save task information.

This means:

- Tasks remain available after refreshing the page
- Tasks remain available after closing and reopening the browser
- Data is saved separately for each browser and device
- Tasks created on one device do not automatically appear on another device
- Clearing browser data removes the saved tasks

Local Storage was tested by:

1. Adding a new task
2. Refreshing the browser
3. Confirming that the task remained visible
4. Checking the saved task data using Browser Developer Tools

---

## Responsive Design

The application was designed to support:

- Desktop computers
- Laptops
- Tablets
- Android mobile devices
- iPhones
- Portrait orientation
- Landscape orientation

The responsive design was tested for:

- Proper header alignment
- Responsive statistics cards
- Mobile-friendly task input
- Readable task information
- Properly aligned action buttons
- No unwanted horizontal scrolling
- Correct spacing on smaller screens

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
- Total task counter updates
- Active task counter updates
- Completed task counter updates
- Progress percentage updates
- Local Storage persistence
- Responsive desktop layout
- Responsive mobile layout
- Browser console errors
- GitHub Pages production deployment
- Netlify production deployment
- Public access from another account
- Public access from another device

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
Integration Testing
      ↓
Final Merge into Main
      ↓
Automatic Production Deployment
```

---

## Git Commands Used

### Check Repository Status

```bash
git status
```

### Create a Feature Branch

```bash
git checkout -b feature/branch-name
```

### Stage Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Add meaningful commit message"
```

### Push a Feature Branch

```bash
git push -u origin feature/branch-name
```

### Switch to Main Branch

```bash
git checkout main
```

### Pull Latest Changes

```bash
git pull origin main
```

### Push Final Changes

```bash
git push origin main
```

---

## Deployment Platforms

### GitHub Pages

```text
https://bhashimadhu.github.io/todo-list-devops-assignment/
```

### Netlify

```text
https://visionary-creponne-27fde6.netlify.app
```

Both deployments provide public access to the Smart Daily Task Manager application.

---

## Repository

GitHub Repository:

```text
https://github.com/bhashimadhu/todo-list-devops-assignment
```

---

## Live Websites

Netlify Production Website:

```text
https://visionary-creponne-27fde6.netlify.app
```

GitHub Pages Production Website:

```text
https://bhashimadhu.github.io/todo-list-devops-assignment/
```

---

## Project Status

```text
Development: Completed
Testing: Completed
GitHub Actions CI: Passed
GitHub Pages Deployment: Published
Netlify Deployment: Published
Mobile Responsiveness: Verified
Public Access: Enabled
```

---

## Conclusion

The Smart Daily Task Manager project successfully demonstrates team-based software development using Git and DevOps practices.

The project includes separate feature branches, meaningful commits, Pull Requests, code reviews, merge conflict resolution, automated testing, Continuous Integration, and automated production deployment.

The completed application is publicly available through both GitHub Pages and Netlify.