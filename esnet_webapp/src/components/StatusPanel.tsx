import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Globe, Signal, Server, CircuitBoard, BarChart2, Map, Zap } from 'lucide-react';

const StatusPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-change tabs for demo
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mock data for different status tabs
  const statusData = [
    {
      title: 'Global Network',
      icon: <Globe className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Uptime', value: '99.998%', change: '+0.001%' },
        { name: 'Traffic', value: '8.32 Tbps', change: '+1.2%' },
        { name: 'Latency', value: '4.1 ms', change: '-0.3 ms' },
        { name: 'Routes', value: '1,482', change: '+3' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Backbone Peering',
      icon: <Signal className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Connections', value: '412', change: '+2' },
        { name: 'Bandwidth', value: '12.7 Tbps', change: '+0.5%' },
        { name: 'Availability', value: '99.999%', change: '0%' },
        { name: 'Exchange Points', value: '18', change: '0' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Data Centers',
      icon: <Server className="w-5 h-5" />,
      status: 'Minor Issues',
      stats: [
        { name: 'Active', value: '42/43', change: '-1' },
        { name: 'Power Usage', value: '82.4%', change: '-3.1%' },
        { name: 'Temperature', value: '22.4°C', change: '+0.2°C' },
        { name: 'Cooling', value: '94.1%', change: '-0.8%' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Infrastructure',
      icon: <CircuitBoard className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Equipment', value: '8,743', change: '+21' },
        { name: 'Maintenance', value: '3/month', change: '0' },
        { name: 'Incidents', value: '2', change: '-1' },
        { name: 'Expansions', value: '4', change: '+1' },
      ],
      chart: generateRandomPoints(24),
    },
  ];
  
  // New detailed info for network nodes visualization
  const networkNodes = [
    { id: 'NY', name: 'New York', status: 'online', connections: 18, position: { x: 30, y: 30 } },
    { id: 'SF', name: 'San Francisco', status: 'online', connections: 16, position: { x: 70, y: 20 } },
    { id: 'CHI', name: 'Chicago', status: 'online', connections: 14, position: { x: 40, y: 40 } },
    { id: 'ATL', name: 'Atlanta', status: 'online', connections: 12, position: { x: 35, y: 60 } },
    { id: 'DC', name: 'Washington DC', status: 'online', connections: 15, position: { x: 50, y: 35 } },
    { id: 'HOU', name: 'Houston', status: 'degraded', connections: 9, position: { x: 40, y: 70 } },
    { id: 'LA', name: 'Los Angeles', status: 'online', connections: 17, position: { x: 80, y: 60 } },
    { id: 'SEA', name: 'Seattle', status: 'online', connections: 13, position: { x: 75, y: 15 } },
    { id: 'MIA', name: 'Miami', status: 'online', connections: 11, position: { x: 60, y: 80 } },
  ];
  
  // Generate connection paths between nodes
  const networkConnections = generateConnections(networkNodes);
  
  // Get current active data
  const activeData = statusData[activeTab];
  
  return (
    <div className={cn(
      "glass-panel rounded-2xl overflow-hidden max-w-4xl mx-auto transition-all duration-700 transform", 
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      {/* Tab navigation */}
      <div className="flex items-center border-b border-white/10">
        {statusData.map((item, index) => (
          <button
            key={item.title}
            className={cn(
              "flex items-center space-x-2 py-4 px-5 transition-all duration-300 relative",
              activeTab === index 
                ? "text-white" 
                : "text-gray-400 hover:text-gray-200"
            )}
            onClick={() => setActiveTab(index)}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
            
            {/* Active indicator */}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-esnet-blue" />
            )}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-sm text-gray-400">System Status</div>
            <div className="text-3xl font-medium mt-1">{activeData.title}</div>
          </div>
          
          <div className="flex items-center">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm",
              activeData.status === 'Optimal' 
                ? "bg-green-500/20 text-green-400" 
                : "bg-yellow-500/20 text-yellow-400"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full mr-2",
                activeData.status === 'Optimal' ? "bg-green-400" : "bg-yellow-400"
              )} />
              {activeData.status}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {activeData.stats.map((stat) => (
                <div key={stat.name} className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">{stat.name}</div>
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className={cn(
                    "text-xs mt-1",
                    stat.change.startsWith('+') ? "text-green-400" : 
                    stat.change.startsWith('-') ? "text-red-400" : "text-gray-400"
                  )}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart */}
            <div className="h-52 relative bg-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">Performance Metrics</div>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-esnet-blue mr-2"></div>
                    <span className="text-xs text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-white/20 mr-2"></div>
                    <span className="text-xs text-gray-400">Baseline</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-4 top-12">
                <svg width="100%" height="100%" viewBox="0 0 24 10" preserveAspectRatio="none">
                  {/* Baseline */}
                  <path
                    d={`M0,${5} ${Array(25).fill(0).map((_, i) => `L${i},${5 + Math.sin(i/3) * 0.5}`).join(' ')}`}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.15"
                    strokeDasharray="0.3,0.2"
                    fill="none"
                  />
                  
                  {/* Area */}
                  <path
                    d={`M0,10 ${activeData.chart.map((p, i) => `L${i},${10-p}`).join(' ')} L24,10 Z`}
                    fill="url(#networkGradient)"
                    opacity="0.3"
                  />
                  
                  {/* Line */}
                  <path
                    d={`M0,${10-activeData.chart[0]} ${activeData.chart.map((p, i) => `L${i},${10-p}`).join(' ')}`}
                    stroke={activeTab === 0 ? '#00A3FF' : activeTab === 1 ? '#9D6EFF' : activeTab === 2 ? '#FFB336' : '#36FFB5'}
                    strokeWidth="0.2"
                    fill="none"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="networkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={activeTab === 0 ? '#00A3FF' : activeTab === 1 ? '#9D6EFF' : activeTab === 2 ? '#FFB336' : '#36FFB5'} />
                      <stop offset="100%" stopColor={activeTab === 0 ? '#00A3FF00' : activeTab === 1 ? '#9D6EFF00' : activeTab === 2 ? '#FFB33600' : '#36FFB500'} />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Current status marker */}
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-esnet-blue shadow-neon-blue transform -translate-x-2 -translate-y-6" />
              </div>
            </div>
            
            {/* Time indicators */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>24 hours ago</span>
              <span>16 hours ago</span>
              <span>8 hours ago</span>
              <span>Now</span>
            </div>
          </div>
          
          {/* Right sidebar - Network Map interactive visualization */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Map className="w-4 h-4 mr-2 text-esnet-blue" />
                <div className="text-sm font-medium">Network Map</div>
              </div>
              <div className="text-xs text-gray-400">Active Nodes</div>
            </div>
            
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-esnet-dark/90 to-esnet-darker">
              {/* Interactive Network Visualization */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="network-visualization">
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  
                  {/* Connection lines between nodes */}
                  <g className="connections">
                    {networkConnections.map((conn, idx) => (
                      <line
                        key={`conn-${idx}`}
                        x1={conn.source.position.x}
                        y1={conn.source.position.y}
                        x2={conn.target.position.x}
                        y2={conn.target.position.y}
                        stroke={conn.critical ? 'rgba(255, 179, 54, 0.6)' : 'rgba(0, 163, 255, 0.4)'}
                        strokeWidth={conn.bandwidth / 10}
                        strokeDasharray={conn.status === 'degraded' ? "1,1" : undefined}
                      >
                        <animate 
                          attributeName="stroke-opacity" 
                          values="0.4;0.8;0.4" 
                          dur="3s" 
                          repeatCount="indefinite" 
                          begin={`${Math.random() * 3}s`} 
                        />
                      </line>
                    ))}
                  </g>
                  
                  {/* Data flow animations */}
                  {networkConnections.map((conn, idx) => (
                    <circle
                      key={`flow-${idx}`}
                      r="0.7"
                      fill={conn.critical ? '#FFB336' : '#00A3FF'}
                      opacity="0.8"
                    >
                      <animateMotion
                        path={`M${conn.source.position.x},${conn.source.position.y} L${conn.target.position.x},${conn.target.position.y}`}
                        dur={`${1 + Math.random() * 3}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 2}s`}
                      />
                    </circle>
                  ))}
                  
                  {/* Network nodes */}
                  {networkNodes.map((node) => (
                    <g key={node.id} transform={`translate(${node.position.x}, ${node.position.y})`}>
                      {/* Pulsing circle background */}
                      <circle
                        r="2.5"
                        fill={node.status === 'online' ? 'rgba(54, 255, 181, 0.2)' : 'rgba(255, 179, 54, 0.2)'}
                      >
                        <animate
                          attributeName="r"
                          values="2.5;3.5;2.5"
                          dur="3s"
                          repeatCount="indefinite"
                          begin={`${Math.random() * 2}s`}
                        />
                      </circle>
                      
                      {/* Node center */}
                      <circle
                        r="1.2"
                        fill={node.status === 'online' ? '#36FFB5' : '#FFB336'}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="0.3"
                      />
                      
                      {/* Node label */}
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="white"
                        fontSize="2"
                        fontFamily="sans-serif"
                      >
                        {node.id}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              {networkNodes.map((node) => (
                <div key={node.id} className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                  <div className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'} mr-2`}></div>
                    <span>{node.name}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Zap className="w-3 h-3 mr-1" />
                    <span>{node.connections}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Activity indicator */}
        <div className="flex items-center justify-center mt-6 text-xs text-gray-400">
          <Activity className="w-3 h-3 mr-2 text-esnet-blue animate-pulse" />
          Live monitoring active
        </div>
      </div>
    </div>
  );
};

// Helper function to generate random chart points
function generateRandomPoints(count: number): number[] {
  const points = [];
  
  for (let i = 0; i < count; i++) {
    // Create a somewhat smooth curve with some random variation
    const base = Math.sin(i / (count / Math.PI) * 2) * 3 + 5;
    points.push(Math.max(1, Math.min(9, base + (Math.random() - 0.5) * 2)));
  }
  
  return points;
}

// Helper function to generate connections between nodes
function generateConnections(nodes: {
  id: string;
  name: string;
  status: string;
  connections: number;
  position: { x: number; y: number };
}[]) {
  const connections = [];
  
  // Add direct connections between major nodes
  for (let i = 0; i < nodes.length; i++) {
    // Connect to 2-3 other nodes
    const connectCount = Math.floor(Math.random() * 2) + 2;
    
    for (let j = 0; j < connectCount; j++) {
      const targetIdx = (i + j + 1) % nodes.length;
      
      // Skip if it's the same node
      if (targetIdx === i) continue;
      
      connections.push({
        source: nodes[i],
        target: nodes[targetIdx],
        bandwidth: Math.floor(Math.random() * 40) + 10, // 10-50 bandwidth
        status: Math.random() > 0.9 ? 'degraded' : 'normal',
        critical: Math.random() > 0.8,
      });
    }
  }
  
  return connections;
}

export default StatusPanel;
