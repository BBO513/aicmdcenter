
interface NavbarProps {
  user: any
  onSignOut: () => void
}

export default function Navbar({ user, onSignOut }: NavbarProps) {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                AI Command Center
              </h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="/dashboard"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name || user?.email}
              </span>
            </div>
            <div className="ml-4">
              <button
                onClick={onSignOut}
                className="bg-white text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
