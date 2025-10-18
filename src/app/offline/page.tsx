export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          You're Offline
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          It looks like you've lost your internet connection. Don't worry, your
          downloaded course content is still available.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-block rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Return to Home
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Please check your internet connection and try again.
        </p>
      </div>
    </div>
  );
}
