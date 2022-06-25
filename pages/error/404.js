const PageNotFound = () => {
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 flex h-screen">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-rose-400 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a
                  href="/home"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-400 hover:bg-rose-600 focus:outline-none"
                >
                  Go back home
                </a>
                <a
                  href="/support"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-rose-600 bg-rose-100 hover:bg-rose-200 focus:outline-none"
                >
                  Contact support
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}

export default PageNotFound;