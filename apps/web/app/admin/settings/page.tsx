'use client';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h2>
          <p className="text-gray-500">Settings and configuration options will be available here.</p>
        </div>
      </div>
    </div>
  );
}