const statusColors = {
    Open: "bg-green-100 text-green-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-blue-100 text-blue-800",
    Closed: "bg-gray-100 text-gray-800",
};

const priorityColors = {
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
    Critical: "bg-red-200 text-red-900",
};

function IssueCard({ issue }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col gap-3 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                {issue.title}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-2">
                {issue.description || "No description provided."}
            </p>

            {(issue.project || issue.assignee) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    {issue.project && (
                        <span>📁 {issue.project}</span>
                    )}
                    {issue.assignee && (
                        <span>👤 {issue.assignee}</span>
                    )}
                </div>
            )}

            <div className="flex items-center gap-2 mt-auto pt-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[issue.status] || "bg-gray-100 text-gray-700"}`}>
                    {issue.status}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[issue.priority] || "bg-gray-100 text-gray-700"}`}>
                    {issue.priority}
                </span>
            </div>
        </div>
    );
}

export default IssueCard;
