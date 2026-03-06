import { useState, useEffect } from "react";
import { fetchIssues } from "../services/api";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import IssueCard from "../components/IssueCard";

function Dashboard() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
    });

    useEffect(() => {
        const loadIssues = async () => {
            try {
                setLoading(true);
                const { data } = await fetchIssues();
                setIssues(data);
                setError(null);
            } catch (err) {
                setError("Failed to load issues. Make sure the backend is running.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadIssues();
    }, []);

    const filteredIssues = issues.filter((issue) => {
        const matchesSearch =
            !filters.search ||
            issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            (issue.description && issue.description.toLowerCase().includes(filters.search.toLowerCase()));

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

                {loading && (
                    <div className="text-center py-16">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-r-transparent"></div>
                        <p className="mt-3 text-gray-500">Loading issues...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <p className="text-sm text-gray-500 mb-4">
                            Showing {filteredIssues.length} of {issues.length} issues
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredIssues.map((issue) => (
                                <IssueCard key={issue._id} issue={issue} />
                            ))}
                        </div>

                        {filteredIssues.length === 0 && (
                            <div className="text-center py-16 text-gray-400">
                                <p className="text-lg">No issues found matching your filters.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
