# Digitech College Integrated Web Portal

A modern front-end prototype for **Digitech College** that brings student, parent, teacher, and administrative services into one role-based web portal.

The project is intentionally built as a **static HTML5 application** using **Tailwind CSS, Vanilla JavaScript, browser LocalStorage, and Lucide Icons** instead of a server-side framework or external database.

> **Important:** This project is a prototype. Authentication, authorization, uploaded files, and stored data are implemented on the client side and must not be treated as production-grade security.

---

## 📌 What This Project Does

The Digitech College Integrated Web Portal simulates a centralized college information and service system.

Instead of creating separate applications for enrollment, academic records, documents, attendance, announcements, and parent monitoring, this project combines these services into a single role-based portal.

### Main System Flow

```text
Landing Page
     ↓
Login 
     ↓
Role Selection
     ↓
Authentication
     ↓
Role Dashboard
     ├── Student
     ├── Parent
     ├── Teacher
     └── Admin
            ↓
     Shared LocalStorage
```

The application uses generated User IDs to connect users with their related records.

For example, a student's ID can be referenced by:

- Enrollment
- Grades
- Attendance
- Requirements
- Document requests
- Competencies
- Parent relationships

---

# 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and portal screens |
| **Tailwind CSS** | Responsive UI and styling |
| **Vanilla JavaScript** | Application logic, authentication, CRUD, filtering, workflows |
| **LocalStorage** | Prototype database and session storage |
| **Lucide Icons** | User interface icons |
| **Git** | Version control |
| **GitHub** | Repository hosting |
| **GitHub Pages** | Optional static deployment |

The project does **not** require:

- PHP
- Laravel
- React
- Vue
- Node.js
- MySQL
- Firebase
- A backend server

The prototype can run entirely in a web browser.

> Tailwind CSS and Lucide Icons are loaded through browser/CDN resources, so an internet connection may be required for those external assets.

---

# 📁 FOLDER Structure

```text
digitech-college-portal/
│
├── index.html
├── login.html
├── signup.html
├── README.md
├── .gitignore
│
├── admin/
│   ├── dashboard.html
│   ├── dashboard.js
│   ├── users.html
│   ├── users.js
│   ├── enrollment.html
│   ├── enrollment.js
│   ├── documents.html
│   ├── documents.js
│   ├── grades.html
│   ├── grades.js
│   ├── competencies.html
│   ├── competencies.js
│   ├── attendance.html
│   ├── announcements.html
│   ├── requirements.html
│   ├── parent-links.html
│   ├── settings.html
│   └── settings.js
│
├── student/
│   ├── dashboard.html
│   ├── enrollment.html
│   ├── requirements.html
│   ├── documents.html
│   ├── grades.html
│   ├── competencies.html
│   ├── attendance.html
│   ├── announcements.html
│   └── profile.html
│
├── teacher/
│   ├── dashboard.html
│   ├── students.html
│   ├── grades.html
│   ├── competencies.html
│   ├── attendance.html
│   ├── announcements.html
│   ├── profile.html
│   └── teacher.js
│
├── parent/
│   ├── dashboard.html
│   ├── children.html
│   ├── attendance.html
│   ├── grades.html
│   ├── documents.html
│   ├── announcements.html
│   └── profile.html
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── data.js
│   ├── features.js
│   ├── storage.js
│   └── workflows.js
│
├── css/
│   └── custom.css
│
└── assets/
    └── images/
```

The repository has expanded beyond the original basic prototype and now includes additional functionality such as:

- Parent portal
- Attendance
- Announcements
- Requirements
- Parent/student linking
- Shared workflows
- Role-specific JavaScript modules

---

# 🌐 Public Pages

## `index.html`

The public landing page introduces the Digitech College portal.

It provides the main entry point to the system and follows a modern academic website structure.

Typical sections include:

- Navigation
- Hero section
- Services
- About/institutional information
- Call to action
- Contact information
- Footer

Images and other visual assets are stored inside:

```text
assets/images/
```

---

## `login.html`

The shared login page handles authentication for all supported roles.

Users can authenticate using:

- Generated User ID
- Email
- Username

The selected role must match the account's stored role.

---
<!-- 
## `signup.html`

The registration page allows users to create new portal accounts.

Supported roles:

```text
Student
Teacher
Admin
Parent
```

The registration process can collect:

- Basic account information
- Profile information
- Profile picture
- Student information
- Parent information
- Staff information
- Account password
- Role-specific password where required

--- -->

# 👨‍🎓 Student Portal

The Student Portal provides students with access to their academic and college-service information.

## Student Pages

| Page | Description |
|---|---|
| Dashboard | Overview of enrollment, grades, competencies, activity, and notifications |
| Enrollment | Enrollment information and status |
| Requirements | Student requirements and submission records |
| Documents | College document requests |
| Grades | Published academic grades |
| Competencies | TVET competency results and progress |
| Attendance | Attendance records |
| Announcements | College announcements |
| Profile | Student profile information |

Student pages are designed to display records associated with the currently authenticated student's User ID.

---

# 👨‍👩‍👧 Parent Portal

The Parent Portal provides parents or guardians with a family-oriented workspace.

Parents can monitor linked student accounts.

## Parent Pages

| Page | Description |
|---|---|
| Dashboard | Overview of linked children and recent information |
| My Children | View connected student accounts |
| Attendance | Monitor children's attendance |
| Grades | Monitor children's grades |
| Documents | Monitor document requests |
| Announcements | View college announcements |
| Profile | Manage parent profile |

A parent can potentially have multiple linked students.

Example:

```text
Parent Account
      │
      ├── Student A
      ├── Student B
      └── Student C
```

This allows the parent dashboard to aggregate information from multiple student accounts.

---

# 👨‍🏫 Teacher Portal

The Teacher Portal provides faculty members with tools for managing assigned students and academic information.

## Teacher Pages

| Page | Description |
|---|---|
| Dashboard | Faculty overview and statistics |
| Students | Assigned student roster |
| Grades | Manage student grades |
| Competencies | Manage competency assessments |
| Attendance | Manage attendance |
| Announcements | View/access announcements |
| Profile | Teacher profile |
| Notifications | System updates |

The teacher dashboard is designed around:

- Assigned students
- Academic statistics
- Grade management
- Competency assessment
- Attendance
- Review queues

---

# 👨‍💼 Admin Portal

The Admin Portal provides system-wide administrative management.

## Admin Pages

| Page | Description |
|---|---|
| Dashboard | Overall system statistics |
| Users | Manage users |
| Enrollment | Review and manage enrollment |
| Documents | Manage document requests |
| Grades | Manage academic records |
| Competencies | Manage competencies |
| Attendance | Manage attendance |
| Announcements | Manage announcements |
| Requirements | Manage requirements |
| Parent Links | Manage parent/student relationships |
| Settings | System/data management |

Where implemented, administrative modules support operations such as:

- Search
- Filtering
- Sorting
- Viewing
- Editing
- Deleting
- Status changes
- Record management

---

# 🔐 Authentication and Role Protection

Authentication is primarily handled through:

```text
js/auth.js
js/storage.js
```

The authentication flow is:

```text
Enter ID / Email / Username
            ↓
Find Account
            ↓
Check Selected Role
            ↓
Check Account Password
            ↓
Check Role Password
            ↓
Create Current Session
            ↓
Redirect to Dashboard
```

---

## Role-Specific Passwords

The current prototype requires an additional role password for:

- Admin
- Teacher

Example configuration:

```javascript
const ROLE_PASSWORDS = {
    admin: "Admin@123",
    teacher: "Teacher@123"
};
```

Students and parents do not require the additional role password.

The role-password field is dynamically displayed when Admin or Teacher is selected.

---

## Route Protection

Portal pages verify the authenticated user.

The application checks:

```text
Is the user logged in?
        ↓
Is the user role allowed?
        ↓
Allow page
```

If the user is not authenticated:

```text
Protected Page
      ↓
No currentUser
      ↓
Login Page
```

If the user has the wrong role, the application redirects them toward the appropriate dashboard.

> This is client-side route protection and is **not equivalent to secure server-side authorization**.

---

# 🆔 Generated User IDs

New accounts receive generated unique IDs based on their role.

Example:

```text
STU-2026-7F42K9
PRT-2026-4B81Q2
TCH-2026-9A31P4
ADM-2026-5D82X1
```

## ID Prefixes

| Role | Prefix |
|---|---|
| Student | `STU` |
| Parent | `PRT` |
| Teacher | `TCH` |
| Admin | `ADM` |

The system checks existing user records before accepting a generated ID.

The User ID serves as an important relationship identifier between accounts and records.

---

# 💾 LocalStorage Architecture

Because this is a front-end-only prototype, the browser's LocalStorage acts as the application's temporary database.

Important storage keys include:

```text
users
currentUser
enrollments
documentRequests
grades
competencies
notifications
announcements
attendance
auditLogs
requirements
parentLinkRequests
settings
```

---

# `js/storage.js`

The storage module provides shared LocalStorage functions.

Examples:

```javascript
saveData(key, data)
getData(key, fallback)
removeData(key)
clearData(key)
generateId(prefix)
generateUserId(role)
getCurrentUser()
setCurrentUser(user)
logoutUser()
getProfilePhoto(user)
setProfilePhoto(photo, user)
loadProfileElements()
```

The shared functionality is exposed through:

```javascript
window.DG
```

This allows different pages to access the same data model.

---

# 🔗 Data Relationships

The portal is designed around IDs rather than array positions.

For example:

## Enrollment

```javascript
{
    id: "ENR-2026-001",
    studentId: "STU-2026-7F42K9",
    status: "Submitted",
    strand: "ICT",
    schoolYear: "2026-2027"
}
```

## Grade

```javascript
{
    id: "GRD-2026-001",
    studentId: "STU-2026-7F42K9",
    subject: "Programming",
    grade: 1.25
}
```

## Document Request

```javascript
{
    id: "DOC-2026-001",
    studentId: "STU-2026-7F42K9",
    documentType: "Form 137",
    status: "Pending"
}
```

## Competency

```javascript
{
    id: "CMP-2026-001",
    studentId: "STU-2026-7F42K9",
    competency: "Programming",
    status: "Competent"
}
```

Because the same `studentId` can be used across multiple collections, different dashboards can display connected information.

---

# 📝 Enrollment Module

Enrollment is one of the central modules of the portal.

Enrollment information can include:

- Student information
- Personal information
- Birth date
- Address
- Contact information
- Guardian information
- Grade level
- Strand/track
- School year
- TVET program
- Qualification
- Training information

## Enrollment Status

```text
Draft
Submitted
Under Review
Approved
Rejected
Enrolled
```

Administrators can review enrollment records through:

```text
admin/enrollment.html
```

---

# 📄 Requirements Module

The Requirements module represents documents that students may need during enrollment or related college processes.

Examples:

- Birth Certificate
- Report Card
- Good Moral Certificate
- Identification documents
- Other supporting requirements

The current implementation is primarily a:

```text
Front End
   +
LocalStorage
```

simulation.

It is **not secure server-side document storage**.

---

# 📑 Document Requests

Students can request college documents such as:

- Form 137
- Good Moral Certificate
- Transcript of Records
- Diploma

A request can contain:

- Document type
- Purpose
- Number of copies
- Notes
- Date
- Status

## Request Status

```text
Pending
Processing
Ready for Release
Released
Rejected
```

Administrators can manage requests through the Admin portal.

---

# 📊 Grades Module

The Grades module represents academic records.

A grade record may contain:

- Student
- Subject
- Subject code
- Teacher
- Semester
- School year
- Grade
- Remarks

The intended access model is:

```text
Student
    ↓
View own grades

Teacher
    ↓
Manage assigned student grades

Admin
    ↓
Manage system grade records
```

---

# 🎯 Competencies Module

The Competencies module supports TVET competency and qualification tracking.

Possible competency states:

```text
Not Started
In Progress
Competent
Not Yet Competent
```

Records can include:

- Student
- Competency
- Assessment date
- Status
- Remarks

Student dashboards can display overall competency progress.

---

# 🕐 Attendance Module

Attendance is implemented as a shared portal feature.

Attendance pages are available for:

- Students
- Teachers
- Admins
- Parents

The available actions depend on the authenticated role.

Attendance records use the shared:

```text
attendance
```

LocalStorage collection.

This allows different portals to access the same prototype attendance data.

---

# 📢 Announcements and Notifications

Announcements provide a centralized way of distributing college information.

The portal can display:

- Announcements
- Notifications
- Recent updates
- Notification counts
- Unread badges

The shared data model contains:

```text
announcements
notifications
```

---

# 👪 Parent-Student Linking

Parent/student relationships are managed through:

```text
parentLinkRequests
```

A relationship can look like:

```text
Parent
  │
  ├── Student A
  │      ├── Grades
  │      ├── Attendance
  │      ├── Enrollment
  │      └── Documents
  │
  ├── Student B
  │      ├── Grades
  │      ├── Attendance
  │      └── Enrollment
  │
  └── Student C
```

This allows the Parent portal to present information from connected student accounts.

---

# 🧩 Shared JavaScript Architecture

The `js/` directory contains application-wide functionality.

## `js/storage.js`

Responsible for:

- LocalStorage
- Sessions
- User IDs
- Record IDs
- Profile photos
- Current user
- Logout

---

## `js/auth.js`

Responsible for:

- Login
- Authentication
- Role validation
- Role passwords
- Route protection
- Logout

Important functions include:

```javascript
rolePasswordRequired(role)
requireRole(roles)
authUser(value, password, role, rolePassword)
logout()
setupRolePassword(select, container, input, label)
```

The authentication API is exposed through:

```javascript
window.AUTH
```

---

## `js/data.js`

Contains shared/default application data used by the prototype.

---

## `js/app.js`

Contains common application and UI behavior.

---

## `js/features.js`

Contains reusable feature-level functionality.

---

## `js/workflows.js`

Contains shared workflow logic for multi-step and cross-module operations.

---

# 📦 Role-Specific JavaScript

Some modules contain their own JavaScript files.

Examples:

```text
admin/dashboard.js
admin/users.js
admin/enrollment.js
admin/documents.js
admin/grades.js
admin/competencies.js
admin/settings.js

teacher/teacher.js
```

This keeps larger module-specific logic separated from the shared application layer.

---

# 🎨 UI and Design System

The portal uses a consistent modern academic interface.

The design system includes:

- Digitech green branding
- Slate/neutral backgrounds
- White cards
- Rounded components
- Subtle borders
- Soft shadows
- Responsive layouts
- Dashboard statistics
- Status badges
- Tables
- Forms
- Modal dialogs
- Toast notifications
- Lucide icons
- Mobile navigation
- Light/dark theme support

The Teacher dashboard focuses on:

```text
Faculty
  ↓
Assigned Students
  ↓
Grades
  ↓
Competencies
  ↓
Attendance
```

The Parent dashboard focuses on:

```text
Parent
  ↓
Linked Children
  ↓
Academic Information
  ↓
Attendance
  ↓
Documents
  ↓
Announcements
```

---

# 🔑 Demo Credentials

The current prototype uses the following role passwords:

```text
Admin Role Password:   Admin@123
Teacher Role Password: Teacher@123
```

Example accounts:

| Role | Example User ID | Account Password | Role Password |
|---|---|---|---|
| Admin | `ADM-2026-000001` | `Admin@123` | `Admin@123` |
| Teacher | `TCH-2026-000001` | `Teacher@123` | `Teacher@123` |
| Student | `STU-2026-000001` | `Student@123` | Not required |
| Parent | `PRT-2026-000001` | `Parent@123` | Not required |

> ⚠️ These credentials are for prototype/demo purposes only.

---

# ▶️ Running the Project

The project does not require a build process.

## Option 1 — Open Directly

Open:

```text
index.html
```

with a modern browser.

---

## Option 2 — Use a Local Server

Using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A local server is recommended because it provides more reliable handling of relative paths and browser behavior.

---

# 🚀 GitHub Pages

Because the project consists of static HTML, CSS, and JavaScript, it can be deployed through GitHub Pages.

Typical configuration:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

GitHub Pages can host the front end, but it does not provide the backend/database functionality required by a production college information system.

LocalStorage remains specific to each browser/device.

---

# 🧹 Resetting Test Data

Since the prototype uses LocalStorage, test data can be reset from the browser.

You can clear the site's LocalStorage through browser developer tools.

Where implemented, Admin Settings can also provide data-management/reset functionality.

The following collections may be removed:

```text
users
currentUser
enrollments
grades
attendance
documentRequests
requirements
competencies
notifications
announcements
parentLinkRequests
settings
```

---

# ⚠️ Security Limitations

This project is a **front-end prototype**, not a production student information system.

## Authentication Is Not Secure

Passwords are stored in browser-accessible LocalStorage.

A technically capable user can inspect or modify the stored information.

---

## Authorization Is Not Secure

Role protection is performed using JavaScript.

For example:

```text
Admin
Teacher
Student
Parent
```

The browser determines which interface is displayed.

This cannot prevent someone from modifying client-side JavaScript.

---

## LocalStorage Is Not a Central Database

Every browser/device has its own LocalStorage.

For example:

```text
Computer A
   ↓
LocalStorage A

Computer B
   ↓
LocalStorage B
```

The data does not automatically synchronize.

---

## File Handling Is Not Secure Server Storage

Any prototype file handling should not be considered equivalent to:

- Secure file storage
- Server-side validation
- Access-controlled files
- Cloud storage
- Database-backed documents

---

## Demo Credentials Are Public

Credentials displayed in this README are intentionally for testing.

They must not be used for real accounts.

---

# 🏗 Recommended Production Architecture

If the prototype is eventually converted into a real college information system, the existing front end can become the presentation layer of a secure full-stack architecture.

```text
HTML
Tailwind CSS
JavaScript
      │
      ↓
Secure Backend API
      │
      ↓
Authentication
Authorization
      │
      ↓
Relational Database
      │
      ↓
Secure File Storage
```

A production version should implement:

- Server-side authentication
- Password hashing
- Server-side authorization
- Secure sessions/tokens
- HTTPS
- Database constraints
- Database transactions
- Input validation
- Input sanitization
- Secure file uploads
- Access-controlled file storage
- Audit logging
- Backups
- Data recovery
- Rate limiting
- Secure secrets management
- Account recovery
- Centralized database
- Multi-user synchronization

The current project can serve as the **front-end/UI foundation** for this future architecture.

---

# 🔄 Development Workflow

Recommended development process:

```text
Edit HTML / JS / CSS
        ↓
Run the portal locally
        ↓
Test affected role
        ↓
Check browser console
        ↓
Check LocalStorage
        ↓
Test related workflows
        ↓
Commit changes
        ↓
Push to GitHub
        ↓
Deploy with GitHub Pages
```

Useful Git commands:

```bash
git status

git add .

git commit -m "Describe the change"

git push

git log --oneline

git branch

git remote -v
```

---

# 🧪 Testing Roles

The system should be tested separately for each role.

## Student

Test:

```text
Login
Dashboard
Enrollment
Requirements
Documents
Grades
Competencies
Attendance
Announcements
Profile
Logout
```

---

## Parent

Test:

```text
Login
Dashboard
Children
Attendance
Grades
Documents
Announcements
Profile
Logout
```

---

## Teacher

Test:

```text
Login
Dashboard
Students
Grades
Competencies
Attendance
Announcements
Profile
Logout
```

---

## Admin

Test:

```text
Login
Dashboard
Users
Enrollment
Documents
Grades
Competencies
Attendance
Announcements
Requirements
Parent Links
Settings
Logout
```

---

# 🔄 Data Flow Example

A typical student workflow can look like this:

```text
Student Signs Up
       ↓
Generate Student ID
       ↓
Store User
       ↓
Student Logs In
       ↓
Create currentUser
       ↓
Student Opens Enrollment
       ↓
Create Enrollment Record
       ↓
Store studentId
       ↓
Admin Reviews Enrollment
       ↓
Admin Changes Status
       ↓
Student Dashboard Reads Updated Status
```

Because all of these records use the same LocalStorage data layer, the prototype can demonstrate an integrated workflow without requiring a backend.

---

# 🎓 Project Purpose

The Digitech College Integrated Web Portal demonstrates how common academic and administrative services can be combined into one modern web interface.

The project provides four major perspectives:

```text
Student
   ↓
Academic and Student Services

Parent
   ↓
Family / Student Monitoring

Teacher
   ↓
Teaching and Assessment Management

Admin
   ↓
System-Wide Management
```

The shared LocalStorage architecture demonstrates how these different perspectives can work with connected records.

---

# 📚 Intended Use

This project is suitable for:

- Academic projects
- Capstone/project demonstrations
- UI/UX demonstrations
- Front-end development
- Role-based system prototypes
- Web portal demonstrations
- Workflow testing
- System design
- Early-stage information system development

It is especially useful for demonstrating how a future full-stack college information system could be structured.

---

# 📌 Project Status

**Current Status: Front-End Prototype**

The project is an evolving Digitech College Integrated Web Portal prototype.

Current implementation focuses on:

```text
✅ Modern responsive interface
✅ Role-based portals
✅ Student portal
✅ Parent portal
✅ Teacher portal
✅ Admin portal
✅ Login system
✅ Signup system
✅ Generated User IDs
✅ Role-specific passwords
✅ LocalStorage data layer
✅ Enrollment
✅ Requirements
✅ Document requests
✅ Grades
✅ Competencies
✅ Attendance
✅ Announcements
✅ Notifications
✅ Parent/student linking
✅ Profile management
```

The project should **not yet be considered production-ready**.

Before real-world deployment, authentication, authorization, database storage, file management, synchronization, and security must be moved to a properly secured backend.

---

# 📄 License / Project Status

This project is a **Digitech College Integrated Web Portal prototype** intended for development, testing, demonstration, and academic/project presentation.

It is an evolving project and may continue to receive changes, improvements, new modules, bug fixes, and architectural updates.

**Built as a modern front-end prototype using HTML5, Tailwind CSS, Vanilla JavaScript, and LocalStorage.**