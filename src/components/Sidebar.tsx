import React from 'react';
import { 
  Home, 
  Activity, 
  Bell, 
  Server, 
  Shield, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'home',
      label: 'Global Threat Map',
      icon: Home,
      description: 'Overview of global threats'
    },
    {
      id: 'network',
      label: 'Network Traffic',
      icon: Activity,
      description: 'Live network monitoring'
    },
    {
      id: 'alerts',
      label: 'Active Alerts',
      icon: Bell,
      description: 'Security alerts & notifications'
    },
    {
      id: 'systems',
      label: 'System Status',
      icon: Server,
      description: 'Infrastructure health'
    },
    {
      id: 'incidents',
      label: 'Recent Incidents',
      icon: Shield,
      description: 'Security incident tracking'
    },
    {
      id: 'threats',
      label: 'Threat Detection',
      icon: Brain,
      description: 'Advanced threat analysis'
    }
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">CyberGuard</h2>
            <p className="text-xs text-gray-400">Security Operations</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  isActive ? 'text-white rotate-90' : 'text-gray-500 group-hover:text-gray-400'
                }`} />
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          SOC Dashboard v2.1
        </div>
      </div>
    </div>
  );
}