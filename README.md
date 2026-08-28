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
