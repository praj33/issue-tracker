const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Issue = require("../models/Issue");

dotenv.config();

const issues = [
    {
        title: "Homepage hero banner not rendering on Safari",
        description: "The main hero banner image on the homepage fails to load on Safari 17+. Users see a blank white space instead. Likely a WebP format compatibility issue.",
        project: "Website Redesign",
        priority: "High",
        assignee: "Rahul",
        status: "Open",
    },
    {
        title: "Add dark mode toggle to navigation bar",
        description: "Users have requested a dark mode option. Add a toggle switch in the top navigation bar that persists the user's preference in localStorage.",
        project: "Website Redesign",
        priority: "Medium",
        assignee: "Ananya",
        status: "In Progress",
    },
    {
        title: "Contact form submissions not saving to database",
        description: "The contact form on the redesigned website submits successfully (200 response) but entries are not appearing in the database. Suspected issue with the form handler middleware.",
        project: "Website Redesign",
        priority: "Critical",
        assignee: "Dev",
        status: "Open",
    },
    {
        title: "Dashboard charts fail to load with large datasets",
        description: "When clients have more than 10,000 data points, the analytics charts time out and display a blank canvas. Need to implement data aggregation or pagination for chart data.",
        project: "Client Dashboard",
        priority: "High",
        assignee: "Priya",
        status: "In Progress",
    },
    {
        title: "Implement CSV export for financial reports",
        description: "Clients need to export their monthly financial summaries as CSV files. Add an export button on the reports page with date range filtering.",
        project: "Client Dashboard",
        priority: "Medium",
        assignee: "Arjun",
        status: "Open",
    },
    {
        title: "Fix broken pagination on client list view",
        description: "Clicking 'Next' on page 3 of the client list loops back to page 1 instead of showing page 4. The offset calculation in the API query is incorrect.",
        project: "Client Dashboard",
        priority: "High",
        assignee: "Rahul",
        status: "Resolved",
    },
    {
        title: "Add role-based access control to dashboard",
        description: "Currently all logged-in users see the same data. Implement role-based permissions so that admins, managers, and viewers see different dashboard sections.",
        project: "Client Dashboard",
        priority: "Critical",
        assignee: "Ananya",
        status: "Open",
    },
    {
        title: "Push notifications not received on Android 14",
        description: "Users on Android 14 devices report not receiving push notifications. The FCM token registration appears to succeed, but notifications are silently dropped.",
        project: "Mobile App",
        priority: "Critical",
        assignee: "Dev",
        status: "In Progress",
    },
    {
        title: "App crashes on login when using biometric auth",
        description: "On devices with Face ID or fingerprint sensors, the app crashes immediately after biometric authentication succeeds. Stack trace points to a null pointer in the auth callback handler.",
        project: "Mobile App",
        priority: "Critical",
        assignee: "Priya",
        status: "Open",
    },
    {
        title: "Reduce app startup time from 4s to under 2s",
        description: "The app takes ~4 seconds to load on mid-range devices. Profile and optimize the startup sequence — consider lazy loading non-critical modules and deferring analytics init.",
        project: "Mobile App",
        priority: "Medium",
        assignee: "Arjun",
        status: "Open",
    },
    {
        title: "Implement offline mode for task viewing",
        description: "Users in low-connectivity areas cannot access their tasks. Cache the last synced task list locally so users can at least view (not edit) tasks while offline.",
        project: "Mobile App",
        priority: "Low",
        assignee: "Rahul",
        status: "Closed",
    },
    {
        title: "Migrate internal wiki from Confluence to Notion",
        description: "The team has decided to move the internal knowledge base from Confluence to Notion. Export all existing pages, preserve formatting, and set up the new workspace structure.",
        project: "Internal Tools",
        priority: "Low",
        assignee: "Ananya",
        status: "In Progress",
    },
    {
        title: "CI/CD pipeline fails intermittently on test stage",
        description: "The GitHub Actions pipeline randomly fails at the test stage with a database connection timeout. Suspected issue with the shared test database being overloaded during parallel runs.",
        project: "Internal Tools",
        priority: "High",
        assignee: "Dev",
        status: "Open",
    },
    {
        title: "Set up automated daily database backups",
        description: "Currently database backups are done manually every week. Implement a cron job that runs daily at 2 AM, creates a mongodump, and uploads it to an S3 bucket with 30-day retention.",
        project: "Internal Tools",
        priority: "Medium",
        assignee: "Priya",
        status: "Resolved",
    },
    {
        title: "Upgrade Node.js from v16 to v20 across all services",
        description: "Node.js 16 has reached end-of-life. Upgrade all microservices to Node.js 20 LTS, update Dockerfiles, test for breaking changes, and update CI configurations.",
        project: "Internal Tools",
        priority: "High",
        assignee: "Arjun",
        status: "Closed",
    },
];

const seedIssues = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for seeding...");

        await Issue.deleteMany();
        console.log("Existing issues cleared.");

        const created = await Issue.insertMany(issues);
        console.log(`${created.length} issues seeded successfully!`);

        process.exit(0);
    } catch (error) {
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedIssues();
