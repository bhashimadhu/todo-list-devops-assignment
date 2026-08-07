# ✨ Smart Daily Task Manager

> A clean, minimal to-do list app built with plain HTML, CSS & JS — no frameworks, no fuss.

---

## 📌 What's This About?

So basically, we had a group assignment where the goal was to build a simple task manager app while also learning how to work as a team using Git, GitHub, CI/CD pipelines, and all that DevOps stuff.

We went with a straightforward **To-Do List** — you can add tasks, check them off, undo, delete, filter... the usual. But the cool part is everything saves to Local Storage, so your tasks don't just vanish when you refresh the page 💾

---

## 🌐 Live Demo

Wanna try it out? Here you go 👇

| Platform | Link |
|----------|------|
| 🟢 Netlify | [visionary-creponne-27fde6.netlify.app](https://visionary-creponne-27fde6.netlify.app) |
| 🔵 GitHub Pages | [bhashimadhu.github.io/todo-list-devops-assignment](https://bhashimadhu.github.io/todo-list-devops-assignment/) |

Both links are live & publicly accessible — feel free to mess around with it!

---

## 👥 The Team

| # | Name | Student ID | What They Did |
|---|------|-----------|---------------|
| 1 | Upekshika Madhubhashini | ITBIN-2414-0019 | DevOps / Release Manager |
| 2 | Kavindi Dilsara | ITBIN-2414-0022 | JavaScript Developer |
| 3 | Udeesha Akshari | ITBNM-2313-0069 | Frontend Developer |

---

## 🛠️ Tech Stack

Nothing too fancy here — we kept things simple on purpose:

- `HTML5` → page structure
- `CSS3` → styling & responsiveness
- `JavaScript` → all the logic
- `Git` + `GitHub` → version control & collaboration
- `GitHub Actions` → CI/CD automation
- `GitHub Pages` + `Netlify` → hosting
- `VS Code` → our go-to editor
- `LocalStorage API` → persisting task data in the browser

---

## ⚡ Features

Here's what the app can actually do:

- ➕ Add new tasks (button click or just hit **Enter**)
- ✅ Mark tasks as done
- ↩️ Undo completed tasks if you change your mind
- 🗑️ Delete tasks you don't need anymore
- 🔍 Filter by: **All** | **Active** | **Completed**
- 📊 See total / active / completed counts at a glance
- 📈 Progress bar shows how much you've knocked out
- 💾 Everything saves to LocalStorage — survives page refreshes
- 📱 Works on phones, tablets, laptops, desktops — you name it

---

## 📁 Project Structure

```
todo-list-devops-assignment/
│
├── .github/
│   └── workflows/
│       |── ci.yml          ← runs tests on push & PRs
│       └── deploy.yml      ← deploys to GitHub Pages
│
├── src/
│   ├── index.html          ← main page
│   ├── styles/
│   │   └── style.css       ← all the styling
│   └── scripts/
│       └── app.js          ← all the JS logic
│
├── tests/
│   └── app.test.js         ← test file
│
├── .gitignore
├── README.md               ← you're reading this :)
└── package.json
```

---

## 🌿 Branch Strategy

We didn't just dump everything on `main` — we actually followed a proper branching workflow:

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `develop` | Where we merged & tested everything first |
| `feature/devops-setup` | Student 1's DevOps config work |
| `feature/task-functionality` | Student 2's JS logic |
| `feature/ui-design` | Student 3's frontend & CSS |
| `feature/heading-student2` | Used for the merge conflict demo |
| `feature/heading-student3` | Also part of the conflict demo |
| `docs/final-readme` | This documentation you're reading now |

> Every feature went through a Pull Request → Code Review → Approval cycle before merging. No yolo pushes to main 😄

---

## 🧑‍💻 Who Did What

### Student 1 — DevOps / Release Manager 🔧

She pretty much handled the entire infrastructure side of things:

- Set up the GitHub repo & added everyone as collaborators
- Created the `main` and `develop` branches
- Wrote both CI and deployment workflows (GitHub Actions)
- Reviewed & merged the team's PRs
- Handled the final release
- Got GitHub Pages + Netlify deployments working
- Made sure everything was publicly accessible
- Tested on both desktop & mobile after deploying

### Student 2 — JavaScript Developer 💻

All the actual task logic came from her:

- Adding tasks, completing them, undoing, deleting
- The filtering system (all / active / completed)
- Task counter + stats display
- LocalStorage save & restore
- Enter key support for quick task entry
- She also helped set up the merge conflict for the demo

### Student 3 — Frontend Developer 🎨

Made everything look good & work on every screen size:

- Built the HTML layout from scratch
- Designed the TaskFlow dashboard UI with CSS
- Created the stat cards at the top
- Made the whole thing responsive (phones, tablets, etc.)
- Tested the UI across different devices & orientations
- Resolved the intentional merge conflict

---

## 💥 Merge Conflict — How We Handled It

This was actually a required part of the assignment — we had to *intentionally* create a merge conflict and then resolve it.

**What happened:**

Student 2 changed the main heading in `index.html` to:
```
Daily Task Manager
```

Student 3 changed the same heading to:
```
Smart To-Do Manager
```

Git obviously wasn't happy about that 😅 — classic conflict on the same line.

**How we fixed it:**

We talked it out as a team and combined both into:
```
Smart Daily Task Manager
```

Then committed the resolution with a proper message. Done ✅

---

## ⚙️ CI/CD Pipeline

### 🔄 Continuous Integration (`ci.yml`)

Triggers on every push & PR. Here's what it does:

1. Checks if the required files are there
2. Sets up Node.js
3. Runs `npm install`
4. Runs `npm test`
5. Reports pass ✅ or fail ❌

### 🚀 GitHub Pages Deployment (`deploy.yml`)

Kicks in when code hits `main`:

1. Pulls the repo
2. Configures Pages
3. Uploads the `src/` folder
4. Publishes → gives us a live URL

### 🌍 Netlify Deployment

This one's automatic too — Netlify watches the `main` branch:

- New commit → new deploy (no manual steps needed)
- Publishes whatever's in the `src/` directory
- Gives us a `.netlify.app` URL

**Netlify config we used:**

| Setting | Value |
|---------|-------|
| Branch | `main` |
| Base directory | *(empty)* |
| Build command | *(empty)* |
| Publish directory | `src` |
| Visibility | Public |

---

## 🏁 Getting Started (Local Setup)

If you wanna run this locally, here's how:

**1 →** Clone the repo
```bash
git clone https://github.com/bhashimadhu/todo-list-devops-assignment.git
```

**2 →** Go into the folder
```bash
cd todo-list-devops-assignment
```

**3 →** Open in VS Code (optional but recommended)
```bash
code .
```

**4 →** Install dependencies
```bash
npm install
```

**5 →** Run the tests
```bash
npm test
```

**6 →** Launch the app

Either open `src/index.html` directly in your browser, use **Live Server** in VS Code, or run:
```bash
npx serve src
```

---

## 💾 About Local Storage

Your tasks don't live on a server or database — they're stored right in your browser's LocalStorage.

What that means in practice:
- ✔️ Tasks survive page refreshes & browser restarts
- ✔️ Data stays until you clear browser data
- ⚠️ Tasks on one device won't show up on another device
- ⚠️ Different browsers = different task lists

We tested this by adding a task → refreshing → confirming it was still there → checking the data in DevTools. Worked perfectly 👌

---

## 📱 Responsive Design

We made sure this thing looks decent everywhere:

- 🖥️ Desktop & laptop screens
- 📱 Android phones & iPhones
- 📲 Tablets in portrait & landscape mode

Specifically tested for:
- Header alignment not breaking on small screens
- Stats cards stacking properly on mobile
- Input field being usable on touchscreens
- No weird horizontal scrolling
- Buttons being tappable without frustration

---

## 🧪 What We Tested

Pretty much everything, honestly:

| Area | What We Checked |
|------|----------------|
| Adding tasks | Button click + Enter key |
| Task actions | Complete ✅, Undo ↩️, Delete 🗑️ |
| Filters | All, Active, Completed tabs |
| Counters | Total, Active, Completed — all updating correctly |
| Progress | Percentage bar updating live |
| Storage | LocalStorage saving & restoring properly |
| Layout | Desktop + Mobile responsiveness |
| Console | No JS errors in browser DevTools |
| Deployment | GitHub Pages ✅, Netlify ✅ |
| Access | Tested from different accounts & devices |

---

## 🔀 Our PR Workflow

This is basically how every feature made it into the final product:

```
 🌿 Create feature branch
     ↓
 💻 Write code & commit
     ↓
 📤 Push to GitHub
     ↓
 📝 Open a Pull Request
     ↓
 👀 Team reviews the code
     ↓
 ✅ Gets approved
     ↓
 🔀 Merged into develop
     ↓
 🧪 Integration testing
     ↓
 🚀 Final merge into main
     ↓
 🌐 Auto-deployed to production!
```

---

## 📋 Common Git Commands We Used

Here's a quick reference for the commands that came up the most:

```bash
# check what's changed
git status

# create & switch to a new branch
git checkout -b feature/branch-name

# stage everything
git add .

# commit with a message
git commit -m "Add meaningful commit message"

# push a feature branch for the first time
git push -u origin feature/branch-name

# switch back to main
git checkout main

# pull the latest from main
git pull origin main

# push final changes
git push origin main
```

---

## 🔗 Quick Links

| What | Where |
|------|-------|
| 📦 GitHub Repo | [github.com/bhashimadhu/todo-list-devops-assignment](https://github.com/bhashimadhu/todo-list-devops-assignment) |
| 🌐 Netlify | [visionary-creponne-27fde6.netlify.app](https://visionary-creponne-27fde6.netlify.app) |
| 🌐 GitHub Pages | [bhashimadhu.github.io/todo-list-devops-assignment](https://bhashimadhu.github.io/todo-list-devops-assignment/) |

---

## 📊 Project Status

| Milestone | Status |
|-----------|--------|
| Development | ✅ Done |
| Testing | ✅ Done |
| CI Pipeline | ✅ Passing |
| GitHub Pages | ✅ Live |
| Netlify | ✅ Live |
| Mobile Support | ✅ Verified |
| Public Access | ✅ Enabled |

---

## 🎯 Wrapping Up

This project was a great way to get hands-on experience with real-world development workflows. We learned how to collaborate through Git branches & PRs, handle merge conflicts without panicking, automate testing with GitHub Actions, and deploy to two different platforms.

The app itself is nothing groundbreaking — it's a to-do list, after all — but the *process* we followed to build it mirrors what actual dev teams do in industry. And honestly, that was the whole point of the assignment 🙌

---

Built with ❤️ using HTML, CSS & JavaScript