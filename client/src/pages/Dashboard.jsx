import React, { useState } from "react";
import {
  Users,
  Pill,
  Phone,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Activity,
  Shield,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  BarChart3,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  // Simple static data
  const medicineRequests = [
    {
      id: 1,
      name: "Vinay singh Baghel",
      type: "Medicine",
      phone: "555-4321",
      date: "2024-06-04",
      status: "Pending",
      medicine: "Blood Pressure Medicine",
      urgency: "High"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      type: "Medicine",
      phone: "555-4322",
      date: "2024-06-05",
      status: "In Progress",
      medicine: "Diabetes Medicine",
      urgency: "Medium"
    },
    {
      id: 3,
      name: "Priya Sharma",
      type: "Medicine",
      phone: "555-4323",
      date: "2024-06-06",
      status: "Completed",
      medicine: "Heart Medicine",
      urgency: "Low"
    }
  ];

  const volunteers = [
    {
      id: 1,
      name: "Arpit singh",
      phone: "555-1111",
      email: "arpit@example.com",
      availability: "Weekdays, 9am-5pm",
      status: "Active",
      completedTasks: 15,
      rating: 4.8
    },
    {
      id: 2,
      name: "Frank Miller",
      phone: "555-2222",
      email: "frank@example.com",
      availability: "Weekends, 10am-2pm",
      status: "Active",
      completedTasks: 8,
      rating: 4.5
    },
    {
      id: 3,
      name: "Sarah Johnson",
      phone: "555-3333",
      email: "sarah@example.com",
      availability: "Evenings, 6pm-9pm",
      status: "Inactive",
      completedTasks: 3,
      rating: 4.2
    }
  ];

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent">
            ElderHelp Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Monitor and manage medicine deliveries and volunteer activities
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-white/10 rounded-2xl p-2 backdrop-blur-sm border border-gray-200/50 dark:border-white/20">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'requests', label: 'Medicine Requests', icon: Pill },
              { id: 'volunteers', label: 'Volunteers', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 rounded-xl p-3">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{medicineRequests.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/20 rounded-xl p-3">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{volunteers.filter(v => v.status === 'Active').length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Volunteers</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/20 rounded-xl p-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{medicineRequests.filter(r => r.status === 'Pending').length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 rounded-xl p-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Active</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">System Status</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recent Requests
                </h3>
                <div className="space-y-3">
                  {medicineRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{req.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{req.medicine}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Active Volunteers
                </h3>
                <div className="space-y-3">
                  {volunteers.filter(v => v.status === 'Active').slice(0, 3).map((vol) => (
                    <div key={vol.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{vol.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{vol.availability}</div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {vol.completedTasks} tasks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Pill className="w-6 h-6 text-blue-600" />
                Medicine Requests
              </h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Request
              </button>
            </div>
            
            <div className="space-y-4">
              {medicineRequests.map((req) => (
                <div key={req.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 rounded-full p-2">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{req.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{req.medicine}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.urgency === 'High' ? 'bg-red-100 text-red-700' :
                        req.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {req.urgency}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {req.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {req.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                Volunteers
              </h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Volunteer
              </button>
            </div>
            
            <div className="space-y-4">
              {volunteers.map((vol) => (
                <div key={vol.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{vol.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{vol.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vol.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {vol.status}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        ⭐ {vol.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {vol.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {vol.availability}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      {vol.completedTasks} tasks
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Request Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Total Requests</span>
                  <span className="font-bold">{medicineRequests.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Pending</span>
                  <span className="font-bold text-yellow-600">{medicineRequests.filter(r => r.status === 'Pending').length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Completed</span>
                  <span className="font-bold text-green-600">{medicineRequests.filter(r => r.status === 'Completed').length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Volunteer Performance
              </h3>
              <div className="space-y-3">
                {volunteers.map((vol) => (
                  <div key={vol.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">{vol.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{vol.completedTasks} tasks</div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      ⭐ {vol.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;