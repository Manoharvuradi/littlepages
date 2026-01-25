'use client';

import StatsCard from "../../../components/admin/StatsCard";


export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Analytics & Reports</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard title="Revenue This Month" value="$45,231" icon="💰" trend={{ value: '12%', isPositive: true }} />
          <StatsCard title="Orders This Month" value="328" icon="📦" trend={{ value: '8%', isPositive: true }} />
          <StatsCard title="Avg Order Value" value="$138" icon="💵" trend={{ value: '3%', isPositive: false }} />
          <StatsCard title="Customer Retention" value="84%" icon="🔄" trend={{ value: '5%', isPositive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-500">Advanced analytics and reporting features will be available here.</p>
        </div>
      </div>
    </div>
  );
}