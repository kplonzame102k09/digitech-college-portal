# Digitech College Integrated Web Portal

A modern front-end prototype for Digitech College that brings essential academic and administrative services together in one web portal.

The project uses **HTML5, Tailwind CSS, Vanilla JavaScript, and browser LocalStorage**. It is designed as a front-end testing/prototype system and does not require a backend server or external database.

## Features

- Online enrollment
- Requirements tracking and simulated submissions
- Document requests and status tracking
- Academic grade viewing and management
- TVET competency tracking
- Student, Teacher, and Admin dashboards
- Role-based authentication and route protection
- User profiles
- Notifications
- Admin management tools
- Responsive desktop/mobile interface
- Persistent prototype data through LocalStorage
- Automatically generated permanent user IDs

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS | Responsive styling and UI |
| Vanilla JavaScript | Application logic |
| LocalStorage | Prototype data persistence |
| Lucide Icons | Interface icons |

The project intentionally does not use PHP, Laravel, React, Vue, Node.js, MySQL, Firebase, or another backend/external database.

## User Roles

### Student

Students can register, log in, manage their profile, complete enrollment information, select a strand/track, track requirements, request documents, view grades, view TVET competencies, and view notifications.

### Teacher

Teachers can log in, view assigned students, view enrollment information, manage grades, update TVET competency results, view notifications, and manage their profile.

### Admin

Admins can view system statistics and manage users, enrollment records, document requests, grades, competencies, notifications, and system settings.

Role-specific pages verify the authenticated user's role when loaded. Navigation visibility alone is not used as the access-control mechanism.

## Project Structure

```text
digitech-portal/
│
├── index.html
├── login.html
├── signup.html
├── README.md
│
├── student/
│   ├── dashboard.html
│   ├── enrollment.html
│   ├── requirements.html
│   ├── documents.html
│   ├── grades.html
│   ├── competencies.html
│   └── profile.html
│
├── teacher/
│   ├── dashboard.html
│   ├── students.html
│   ├── grades.html
│   ├── competencies.html
│   └── profile.html
│
├── admin/
│   ├── dashboard.html
│   ├── users.html
│   ├── enrollment.html
│   ├── documents.html
│   ├── grades.html
│   ├── competencies.html
│   └── settings.html
│
├── assets/
│   ├── images/
│   └── icons/
│
├── css/
│   └── custom.css
│
└── js/
    ├── auth.js
    ├── storage.js
    ├── data.js
    ├── student.js
    ├── teacher.js
    ├── admin.js
    └── app.js
```

## Authentication

The login system supports three roles.

**Student**

```text
User ID / Email
Account Password
```

**Teacher**

```text
User ID / Email
Account Password
Teacher Role Password
```

**Admin**

```text
User ID / Email
Account Password
Admin Role Password
```

The role-specific password field is dynamically shown for Teacher and Admin and hidden for Student.

## Demo Credentials

Demo role passwords:

```javascript
const ROLE_PASSWORDS = {
    admin: "Admin@123",
    teacher: "Teacher@123"
};
```

Example demo accounts:

| Role | User ID | Password | Role Password |
|---|---|---|---|
| Admin | `ADM-2026-000001` | `Admin@123` | `Admin@123` |
| Teacher | `TCH-2026-000001` | `Teacher@123` | `Teacher@123` |
| Student | `STU-2026-000001` | `Student@123` | Not required |

These are demonstration credentials only.

## Generated User IDs

New accounts receive automatically generated unique IDs, for example:

```text
STU-2026-7F42K9
TCH-2026-9A31P4
ADM-2026-5D82X1
```

The generated ID is permanent, read-only, and used as the primary relationship identifier for the user's enrollment, grades, documents, requirements, and competency records.

After successful registration, the generated ID is displayed to the user and can be copied before continuing to login.

## LocalStorage Data

The browser acts as the temporary database. Main keys include:

```text
users
currentUser
enrollments
documentRequests
grades
competencies
notifications
requirements
settings
```

Centralized helper functions are used for storage operations, including:

```javascript
saveData(key, data)
getData(key)
removeData(key)
clearData(key)
generateId()
getCurrentUser()
setCurrentUser(user)
logoutUser()
```

Data survives normal page refreshes and logout during prototype testing.

## Data Relationships

Records reference users by their generated IDs rather than array indexes.

Example enrollment:

```javascript
{
    id: "ENR-2026-001",
    studentId: "STU-2026-7F42K9",
    status: "Submitted",
    strand: "ICT",
    schoolYear: "2026-2027"
}
```

Example grade:

```javascript
{
    id: "GRD-2026-001",
    studentId: "STU-2026-7F42K9",
    subject: "Programming",
    grade: 1.25
}
```

Example document request:

```javascript
{
    id: "DOC-2026-001",
    studentId: "STU-2026-7F42K9",
    documentType: "Form 137",
    status: "Pending"
}
```

Example competency:

```javascript
{
    id: "CMP-2026-001",
    studentId: "STU-2026-7F42K9",
    competency: "Programming",
    status: "Competent"
}
```

## Student Modules

### Dashboard

Displays enrollment status, document requests, academic performance, competency progress, recent activity, and notifications.

### Enrollment

Supports student information, birth date, address, contact information, guardian information, grade level, strand, track, school year, and TVET program/qualification/training information.

Enrollment statuses:

```text
Draft
Submitted
Under Review
Approved
Rejected
Enrolled
```

### Requirements

Provides a front-end simulation for Birth Certificate, Report Card, Good Moral Certificate, ID, and other supporting documents. Actual server-side file uploading is outside the scope of this prototype.

### Document Requests

Students can request Form 137, Good Moral Certificate, Transcript of Records, and Diploma. Requests support purpose, number of copies, notes, date, and status tracking.

Request statuses:

```text
Pending
Processing
Ready for Release
Released
Rejected
```

### Grades

Students can view subject, subject code, teacher, semester, school year, grade, and remarks. Students are restricted to their own records.

### TVET Competencies

Tracks qualification, competency, status, assessment date, and remarks.

Possible statuses:

```text
Not Started
In Progress
Competent
Not Yet Competent
```

An overall competency progress indicator is provided.

## Teacher Modules

Teacher navigation includes:

```text
Dashboard
Students
Grades
Competencies
Profile
Notifications
Logout
```

Teachers can view assigned students and manage appropriate grade and competency information.

## Admin Modules

Admin navigation includes:

```text
Dashboard
Users
Enrollment
Documents
Grades
Competencies
Notifications
Settings
Logout
```

Management screens support common operations such as searching, filtering, sorting, viewing, editing, deleting, and updating statuses where implemented.

## Design

The portal's visual direction is based on the supplied Digitech College `index.html` reference. It uses a clean modern academic style with:

- Green Digitech branding
- Slate neutral backgrounds
- White cards
- Rounded corners
- Subtle borders and shadows
- Responsive layouts
- Lucide icons
- Clear typography hierarchy
- Desktop and mobile navigation
- Dashboard statistics cards
- Status badges
- Tables and forms
- Modal dialogs and toast notifications

The landing page follows the reference structure of Navigation, Hero, Services, About, Call to Action, Contact, and Footer, while authenticated pages extend the same design language into the three role dashboards.

## Running the Project

No build process is required.

Open the following file in a modern browser:

```text
index.html
```

You can also serve the project directory with a simple static HTTP server during development. The application does not require a backend server.

## Resetting Prototype Data

Application data is stored in browser LocalStorage. To completely reset a test environment, clear the site's LocalStorage through the browser developer tools. The Admin Settings area can also provide prototype data-management/reset functions where implemented.

## Security Notice

This is a **front-end prototype/testing system**. LocalStorage authentication is **not secure production authentication**. Client-side credentials and role checks can be inspected or modified by a user.

Requirement uploads are also simulated rather than secure server-side uploads.

For production use, the project would require a secure backend, server-side authentication and authorization, password hashing, database storage, secure file handling, HTTPS, validation, audit logging, backups, and other security controls.

## Browser Compatibility

The project targets modern browsers with support for ES6+ JavaScript, LocalStorage, Clipboard API, modern CSS, and responsive layouts.

Recommended browsers include current versions of Chrome, Edge, Firefox, and Safari.

## Purpose

The portal demonstrates how Digitech College's academic and administrative services can be integrated into a single modern web interface while preserving persistent relationships between users and their academic/service records.

## License

This project is a Digitech College portal prototype intended for development, demonstration, and testing purposes.


# Git and GitHub Deployment

This section explains how to upload and publish the Digitech College Portal using Git, GitHub, VSCodium, and GitHub Pages.

## 1. Install Git

Make sure Git is installed on the computer.

Check the installed version:

```bash
git --version
```

If Git is installed correctly, the terminal will display the installed Git version.

---

## 2. Open the Project in VSCodium

Open the Digitech College Portal project folder in VSCodium.

Example project location:

```text
~/Downloads/digitech-college-portal/digitech-portal
```

Open the VSCodium terminal:

```text
Terminal → New Terminal
```

Verify that the terminal is inside the project folder:

```bash
pwd
```

Then check the project files:

```bash
ls
```

The project should contain files such as:

```text
index.html
login.html
README.md
assets/
```

---

## 3. Initialize the Local Git Repository

Initialize Git inside the project folder:

```bash
git init
```

This creates a hidden `.git` directory that allows Git to track changes to the project.

---

## 4. Configure Git Identity

Before creating the first commit, configure the Git username and email.

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Verify the configuration:

```bash
git config --global user.name
git config --global user.email
```

The email should preferably be the email associated with the GitHub account or a GitHub-provided `noreply` address.

---

## 5. Create a `.gitignore` File

Create a `.gitignore` file in the project root to prevent unnecessary or sensitive files from being uploaded.

Example:

```gitignore
.vscode/
.idea/
node_modules/
.env
.env.*
*.log
.DS_Store
Thumbs.db
```

Do not upload passwords, API keys, database credentials, or other sensitive information.

---

## 6. Check the Git Repository Status

Run:

```bash
git status
```

Git will display files that are not currently being tracked.

---

## 7. Add the Project Files

Add all project files to Git:

```bash
git add .
```

Check the status again:

```bash
git status
```

The files should now appear under:

```text
Changes to be committed
```

---

## 8. Create the Initial Commit

Create the first Git commit:

```bash
git commit -m "Initial Digitech College Portal"
```

A commit creates a snapshot of the project that can be stored in the Git history.

---

## 9. Rename the Branch to `main`

Rename the current branch to `main`:

```bash
git branch -M main
```

Verify the branch:

```bash
git branch
```

The output should show:

```text
* main
```

---

## 10. Create a GitHub Repository

Sign in to GitHub and create a new repository.

Example:

```text
Repository name:
digitech-college-portal
```

For a GitHub Pages project using a GitHub Free account, use a public repository.

Because the project already exists locally, do not initialize the GitHub repository with another README, `.gitignore`, or license.

The GitHub repository should initially be empty.

---

## 11. Connect the Local Repository to GitHub

Copy the HTTPS URL of the newly created GitHub repository.

Example:

```text
https://github.com/USERNAME/digitech-college-portal.git
```

Add it as the `origin` remote:

```bash
git remote add origin https://github.com/USERNAME/digitech-college-portal.git
```

Verify the remote:

```bash
git remote -v
```

The result should look similar to:

```text
origin  https://github.com/USERNAME/digitech-college-portal.git (fetch)
origin  https://github.com/USERNAME/digitech-college-portal.git (push)
```

---

## 12. Push the Project to GitHub

Upload the local `main` branch to GitHub:

```bash
git push -u origin main
```

The `-u` option connects the local `main` branch with the remote `main` branch.

After the upload is complete, refresh the GitHub repository.

The project should now appear on GitHub:

```text
digitech-college-portal/
├── index.html
├── login.html
├── README.md
├── assets/
├── css/
└── js/
```

---

## 13. Enable GitHub Pages

To publish the website:

1. Open the GitHub repository.
2. Go to **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, select:

   * Source: **Deploy from a branch**
   * Branch: **main**
   * Folder: **/ (root)**
5. Click **Save**.

GitHub Pages will automatically build and deploy the website.

---

## 14. Access the Published Website

After deployment, GitHub Pages will provide a website address similar to:

```text
https://USERNAME.github.io/digitech-college-portal/
```

The exact URL depends on the GitHub username and repository name.

The `index.html` file serves as the main entry point of the website.

---

## 15. Updating the Website

After making changes to the project in VSCodium, check the changes:

```bash
git status
```

Add the changes:

```bash
git add .
```

Create a new commit:

```bash
git commit -m "Update portal design"
```

Push the changes:

```bash
git push
```

GitHub Pages will automatically deploy the updated version.

The normal development workflow is:

```text
Edit files
    ↓
Test locally
    ↓
git status
    ↓
git add .
    ↓
git commit -m "Description of changes"
    ↓
git push
    ↓
GitHub
    ↓
GitHub Pages
    ↓
Updated website
```

---

## 16. Useful Git Commands

### Check repository status

```bash
git status
```

### Add all changes

```bash
git add .
```

### Commit changes

```bash
git commit -m "Your commit message"
```

### Push changes

```bash
git push
```

### View branches

```bash
git branch
```

### View commit history

```bash
git log --oneline
```

### View GitHub remote

```bash
git remote -v
```

### View configured Git identity

```bash
git config --global user.name
git config --global user.email
```

---

## 17. Complete Initial Git Setup

For a new project, the complete process can be summarized as:

```bash
# Navigate to the project
cd ~/Downloads/digitech-college-portal/digitech-portal

# Initialize Git
git init

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Add files
git add .

# Create initial commit
git commit -m "Initial Digitech College Portal"

# Rename branch
git branch -M main

# Connect GitHub repository
git remote add origin https://github.com/USERNAME/digitech-college-portal.git

# Upload project
git push -u origin main
```

After the initial setup, only the following commands are normally needed to update the project:

```bash
git add .
git commit -m "Update website"
git push
```

## 18. LocalStorage and GitHub Pages

The Digitech College Portal uses browser `LocalStorage` for prototype data.

GitHub Pages can host the HTML, CSS, and JavaScript files while the LocalStorage data remains inside the visitor's browser.

However, LocalStorage is not a shared database. Data stored by one user or device is not automatically available to another user or device.

Therefore, the current GitHub Pages deployment is intended for a prototype or demonstration. A production college portal would require a backend server and shared database for authentication, student records, enrollment, grades, documents, messaging, and other persistent data.
## Recent UI Improvements

### Login Page

The login page was redesigned with a modern green-themed interface while keeping the existing authentication logic unchanged.

Improvements include:

* Soft white-to-green gradient background
* Subtle blurred green background effects
* Modern Lucide icons
* Improved typography and spacing
* Cleaner role-based login interface
* Responsive layout for desktop and mobile devices
* Improved visual hierarchy for login information
* Existing LocalStorage authentication preserved

### Signup Page

The signup page was updated to match the visual style of the login page.

Improvements include:

* Modern white, emerald, and green color palette
* Soft gradient header section
* Decorative background effects
* Improved account information layout
* Separate sections for student and staff information
* Lucide icons for better visual identification
* Improved input field spacing and appearance
* Modern account creation button
* Improved success modal
* Responsive design for smaller screens

### Logic Preservation

The signup functionality was preserved during the redesign. No database or authentication logic was intentionally changed.

The following existing functionality remains:

* User registration
* Automatic User ID generation
* Email duplication checking
* Username duplication checking
* Password confirmation validation
* Teacher role password validation
* Admin role password validation
* Student information handling
* Staff information handling
* LocalStorage data persistence
* Account creation success modal
* User ID copying
* Redirect to the login page

The redesign focuses on the **frontend presentation and user experience**, while the existing JavaScript functionality remains intact.

> **Note:** This project uses browser LocalStorage as a prototype data store. It is intended for demonstration and educational purposes and should not be considered production-level authentication or data security.

### ADD A LOGO DESIGN 

Instead of using Lucide Icons, changed it in to png type image for logo of Digitech College Web Portal.
Improve the User Interface by adding a image type png. 

Add a logo in design in the Login page for better Login UI.

![alt text](<Screenshot from 2026-08-29 14-00-38.png>)
![alt text](<assets/images/Screenshot from 2026-08-29 14-00-51.png>)
![alt text](<assets/images/Screenshot from 2026-08-29 14-00-56.png>)

### ADD A PROFILE PHOTO
 Add a profile pciture or photo entry in the Signup page. 
 Add the profile photo visibility to all the pages. 
  