# Smart Daily Task Manager

Simple to-do list app we made for our DevOps group assignment. Built using just HTML, CSS and JavaScript — nothing complex.

## About the Project

This was a team project for our module where we had to build a web app while following proper DevOps practices like branching, pull requests, CI/CD, etc. We decided to go with a task manager since it covers enough functionality without being too complicated.

You can add tasks, mark them done, undo if you made a mistake, delete them, and filter between active/completed ones. All the data gets saved in the browser's local storage so it stays even after you close the tab.

**Netlify** — https://visionary-creponne-27fde6.netlify.app

**GitHub Pages** — https://bhashimadhu.github.io/todo-list-devops-assignment/

Both are working and anyone can access them.

## Team Members

| Name | Student ID | Role |
|------|-----------|------|
| Upekshika Madhubhashini | ITBIN-2414-0019 | DevOps / Release Manager |
| Kavindi Dilsara | ITBIN-2414-0022 | JavaScript Developer |
| Udeesha Akshari | ITBNM-2313-0069 | Frontend Developer |

## Technologies

- HTML5, CSS3, JavaScript
- Git & GitHub for version control
- GitHub Actions (CI/CD)
- GitHub Pages and Netlify for deployment
- VS Code
- Browser Local Storage

## What the App Does

- Add tasks by clicking the button or pressing Enter
- Mark tasks as completed
- Undo if you accidentally completed something
- Delete tasks
- Filter tasks — show all, only active, or only completed
- Shows how many tasks you have in total, how many are active, how many are done
- Progress bar that updates as you complete stuff
- Saves everything to local storage so refreshing wont lose your data
- Works on mobile too

## Folder Structure

```
todo-list-devops-assignment/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── style.css
│   └── scripts/
│       └── app.js
├── tests/
│   └── app.test.js
├── .gitignore
├── README.md
└── package.json
```

## How We Used Branches

We didnt just push everything to main directly. Each person worked on their own branch and then we used pull requests to merge.

- `main` — production branch, only tested code goes here
- `develop` — integration branch where we combined everyones work first
- `feature/devops-setup` — Student 1 worked on CI/CD and deployment configs here
- `feature/task-functionality` — Student 2 did all the JavaScript here
- `feature/ui-design` — Student 3 built the UI and CSS here
- `feature/heading-student2` and `feature/heading-student3` — these were for the merge conflict part
- `docs/final-readme` — documentation

Every branch went through PR > review > approval before merging. We made sure nobody just pushed directly to main or develop without review.

## What Each Person Did

### Student 1 (DevOps / Release Manager)

She created the GitHub repository and added the other two members as collaborators. She set up the main and develop branches, wrote the CI workflow (`ci.yml`) that runs tests automatically, and also the deploy workflow (`deploy.yml`) for GitHub Pages. She reviewed and approved the PRs from the other members, managed the release process, and also handled the Netlify setup — connecting the repo, configuring the publish directory, making it public, all that. After deploying she tested both platforms on desktop and on her phone to make sure everything looked fine.

### Student 2 (JavaScript Developer)

She wrote all the core JavaScript logic. This includes adding tasks, marking them complete, the undo feature, deleting tasks, the filtering system (all/active/completed), the task counter that shows stats at the top, and the local storage integration so data persists after refresh. She also added Enter key support so you dont have to click the button every time. For the merge conflict demo part of the assignment she changed the heading in index.html on her branch.

### Student 3 (Frontend Developer)

She built the entire HTML structure and designed everything with CSS. The layout, the input section, filter buttons, task list area, the stat cards at the top — all of that was her work. She also made it responsive so it looks proper on phones and tablets, not just desktop. She tested the UI on different screen sizes and orientations. For the merge conflict part she also changed the same heading on her branch, and then she was the one who resolved the conflict.

## The Merge Conflict

This was something we had to do intentionally for the assignment — create a merge conflict and resolve it.

Student 2 changed the `<h1>` heading in `src/index.html` to "Daily Task Manager" on her branch. Student 3 changed the same heading to "Smart To-Do Manager" on her branch. When we tried to merge both into develop, Git flagged it as a conflict since both of them edited the same line.

We discussed it and decided to combine both versions into "Smart Daily Task Manager" which actually sounded better anyway. Committed the resolution and moved on.

## CI/CD

### CI Workflow (ci.yml)

This runs automatically whenever someone pushes code or opens a pull request. It checks if the project files exist, sets up Node.js, installs dependencies with `npm install`, and runs `npm test`. If anything fails it shows up in the PR so we know before merging.

### GitHub Pages Deployment (deploy.yml)

When code gets pushed to main, this workflow picks up the files from the `src/` folder and deploys them to GitHub Pages. It handles the configuration and publishing automatically.

### Netlify

We also connected the repo to Netlify. It watches the main branch and whenever theres a new commit it automatically redeploys. We set the publish directory to `src` and left the build command empty since we dont have a build step. The site is public.

Netlify settings:
- Branch: main
- Base directory: (empty)
- Build command: (empty)
- Publish directory: src

## Running Locally

Clone the repo:
```bash
git clone https://github.com/bhashimadhu/todo-list-devops-assignment.git
cd todo-list-devops-assignment
```

Install dependencies and run tests:
```bash
npm install
npm test
```

To view the app, just open `src/index.html` in your browser. Or if you have VS Code you can use the Live Server extension. Another option is:
```bash
npx serve src
```

## Local Storage

Tasks are stored in the browsers local storage, not on any server. So if you refresh the page or close and reopen the browser, your tasks will still be there. But if you open the app on a different device or different browser, you wont see the same tasks because local storage is specific to each browser.

We verified this works by adding a task, refreshing, and checking that it was still showing. Also checked the data in browser DevTools under Application > Local Storage.

## Responsive Design

The app was designed to work on desktops, laptops, tablets and phones (both Android and iPhone). We tested portrait and landscape orientations.

Things we specifically checked:
- Header doesnt break on smaller screens
- The stat cards stack vertically on mobile instead of staying in a row
- Input field works well on touch screens
- No horizontal scrolling issues
- Buttons are big enough to tap on mobile

## Testing

We tested the app manually for all the features — adding tasks with button click and enter key, completing tasks, undoing, deleting, all three filter options, counter updates, progress bar, local storage saving and restoring, responsive layout on desktop and mobile, and checked for any console errors. We also tested both deployed versions (GitHub Pages and Netlify) and accessed them from different accounts and devices to make sure they work publicly.

## PR Workflow

This is the process we followed for every feature:

1. Create a feature branch from develop
2. Write the code and commit changes
3. Push the branch to GitHub
4. Open a Pull Request
5. Another team member reviews the code
6. PR gets approved
7. Merge into develop
8. Test everything together
9. Final merge into main
10. Automatic deployment happens

## Git Commands

Some of the commands we used throughout the project:

```bash
git status
git checkout -b feature/branch-name
git add .
git commit -m "commit message"
git push -u origin feature/branch-name
git checkout main
git pull origin main
git push origin main
```

## Links

- Repository: https://github.com/bhashimadhu/todo-list-devops-assignment
- Netlify: https://visionary-creponne-27fde6.netlify.app
- GitHub Pages: https://bhashimadhu.github.io/todo-list-devops-assignment/

## Status

Everything is done — development, testing, CI pipeline is passing, both GitHub Pages and Netlify deployments are live, mobile responsiveness is verified, and public access is enabled.

---

Built with ❤️ using HTML, CSS & JavaScript