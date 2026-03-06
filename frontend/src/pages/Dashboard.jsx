import { useState } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import IssueCard from "../components/IssueCard";

const mockIssues = [
    { id: 1, title: "Login page bug", description: "User cannot login with Google OAuth. The redirect URI is misconfigured in production.", status: "Open", priority: "High" },
    { id: 2, title: "Dashboard charts not loading", description: "Analytics charts time out when datasets exceed 10,000 data points.", status: "In Progress", priority: "Critical" },
    { id: 3, title: "Add dark mode toggle", description: "Users have requested a dark mode option that persists in localStorage.", status: "Open", priority: "Medium" },
    { id: 4, title: "Fix broken pagination", description: "Clicking Next on page 3 loops back to page 1 instead of page 4.", status: "Resolved", priority: "High" },
    { id: 5, title: "Implement CSV export", description: "Clients need to export financial summaries as CSV with date range filtering.", status: "Open", priority: "Low" },
    { id: 6, title: "Push notifications failing on Android 14", description: "FCM token registration succeeds but notifications are silently dropped.", status: "In Progress", priority: "Critical" },
    { id: 7, title: "Reduce app startup time", description: "App takes ~4 seconds to load on mid-range devices. Target is under 2 seconds.", status: "Open", priority: "Medium" },
    { id: 8, title: "CI/CD pipeline intermittent failures", description: "GitHub Actions test stage randomly fails with database connection timeout.", status: "Closed", priority: "High" },
];

function Dashboard() {
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
    });

    const filteredIssues = mockIssues.filter((issue) => {
        const matchesSearch =
            !filters.search ||
            issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            issue.description.toLowerCase().includes(filters.search.toLowerCase());

        const matchesStatus = !filters.status || issue.status === filters.status;
        const matchesPriority = !filters.priority || issue.priority === filters.priority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <FilterBar filters={filters} onFilterChange={setFilters} />
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    Showing {filteredIssues.length} of {mockIssues.length} issues
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredIssues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                </div>

                {filteredIssues.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No issues found matching your filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
