import React from 'react';
import { useState } from 'react';
import { Shield, Activity, AlertTriangle, Network, Database, Users } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ThreatMap } from './ThreatMap';
import { IncidentList } from './IncidentList';
import { NetworkMonitor } from './NetworkMonitor';
import { SystemStatus } from './SystemStatus';
import { AlertPanel } from './AlertPanel';
import { UserProfile } from './UserProfile';
import { useIncidentData } from '../hooks/useIncidentData';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { incidents, networkTraffic, systemStatus, alerts, isMonitoring, toggleMonitoring } = useIncidentData();
  const { user, hasPermission } = useAuth();
  const [activeView, setActiveView] = useState('home');

  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;
  const highIncidents = incidents.filter(i => i.severity === 'high').length;
  const activeIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const onlineSystemsCount = systemStatus.filter(s => s.status === 'online').length;

  const stats = [
    {
      title: 'Active Threats',
      value: activeIncidents,
      icon: Shield,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Critical Incidents',
      value: criticalIncidents,
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      title: 'Systems Online',
      value: `${onlineSystemsCount}/${systemStatus.length}`,
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Network Traffic',
      value: `${networkTraffic.length}`,
      icon: Network,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ];

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {hasPermission('view_incidents') && <ThreatMap incidents={incidents} />}
          </div>
        );
      case 'network':
        return hasPermission('view_systems') ? <NetworkMonitor networkTraffic={networkTraffic} /> : null;
      case 'alerts':
        return hasPermission('view_alerts') ? <AlertPanel alerts={alerts} /> : null;
      case 'systems':
        return hasPermission('view_systems') ? <SystemStatus systems={systemStatus} /> : null;
      case 'incidents':
        return hasPermission('view_incidents') ? <IncidentList incidents={incidents} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col">
      {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <div>
                <h1 className="text-2xl font-bold text-white">
                  {activeView === 'home' && 'Global Threat Map'}
                  {activeView === 'network' && 'Network Traffic Monitor'}
                  {activeView === 'alerts' && 'Active Alerts'}
                  {activeView === 'systems' && 'System Status'}
                  {activeView === 'incidents' && 'Recent Incidents'}
                </h1>
              {user && (
                <p className="text-sm text-gray-400">
                  Welcome back, {user.firstName}
                </p>
              )}
            </div>
            </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-sm text-gray-300">
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
              </span>
            </div>
            {hasPermission('manage_systems') && (
              <button
                onClick={toggleMonitoring}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isMonitoring 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isMonitoring ? 'Pause' : 'Resume'} Monitoring
              </button>
            )}
            <UserProfile />
          </div>
        </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}