function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
            <h1 className="text-xl font-bold tracking-wide">🐛 Issue Tracker</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                + New Issue
            </button>
        </nav>
    );
}

export default Navbar;
