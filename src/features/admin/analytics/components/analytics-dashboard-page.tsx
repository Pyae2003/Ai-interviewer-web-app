import React from 'react'
import AnalyticsDashboard from './analytics-dashboard'
import { getAnalytics } from '../query/get-analytics';

const AnalyticsDashboardPage = async () => {
      const analytics = await getAnalytics();

  return (
    <div>
        <AnalyticsDashboard {...analytics} />
    </div>
  )
}

export default AnalyticsDashboardPage