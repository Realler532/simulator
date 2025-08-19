import { Incident, NetworkTraffic, SystemStatus, Alert } from '../types/incident';
import { ThreatDetection, AnomalyDetection } from '../types/incident';

const incidentTypes = ['malware', 'intrusion', 'ddos', 'phishing', 'data_breach', 'brute_force'] as const;
const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
const statusTypes = ['detected', 'investigating', 'contained', 'resolved'] as const;

const sampleSources = [
  '192.168.1.45',
  '10.0.0.23',
  '172.16.0.100',
  '203.0.113.5',
  '198.51.100.12',
  '192.0.2.146'
];

const sampleTargets = [
  'web-server-01',
  'database-primary',
  'mail-server',
  'file-server',
  'domain-controller',
  'api-gateway'
];

const responseActions = [
  'Block IP address',
  'Isolate affected system',
  'Update firewall rules',
  'Scan for malware',
  'Reset user credentials',
  'Enable DDoS protection',
  'Notify security team',
  'Create backup'
];

const threatTypes = ['behavioral_anomaly', 'signature_match', 'ml_detection', 'correlation_rule'] as const;
const mitreTactics = [
  'Initial Access',
  'Execution',
  'Persistence',
  'Privilege Escalation',
  'Defense Evasion',
  'Credential Access',
  'Discovery',
  'Lateral Movement',
  'Collection',
  'Command and Control',
  'Exfiltration',
  'Impact'
];

const anomalyTypes = ['traffic_spike', 'unusual_login', 'data_exfiltration', 'privilege_escalation'] as const;

export function generateRandomIncident(): Incident {
  const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
  const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
  
  return {
    id: `INC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000), // Last 24 hours
    type,
    severity,
    source: sampleSources[Math.floor(Math.random() * sampleSources.length)],
    target: sampleTargets[Math.floor(Math.random() * sampleTargets.length)],
    description: `${type.replace('_', ' ')} detected from ${sampleSources[Math.floor(Math.random() * sampleSources.length)]}`,
    status,
    responseActions: responseActions.slice(0, Math.floor(Math.random() * 3) + 1),
    affectedSystems: sampleTargets.slice(0, Math.floor(Math.random() * 2) + 1)
  };
}

export function generateNetworkTraffic(): NetworkTraffic {
  const suspicious = Math.random() < 0.15; // 15% chance of suspicious traffic
  
  return {
    timestamp: new Date(),
    source: sampleSources[Math.floor(Math.random() * sampleSources.length)],
    destination: sampleTargets[Math.floor(Math.random() * sampleTargets.length)],
    protocol: ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random() * 3)],
    bytes: Math.floor(Math.random() * 10000) + 100,
    suspicious
  };
}

export function generateSystemStatus(): SystemStatus[] {
  const components = [
    'Firewall',
    'IDS/IPS',
    'Antivirus',
    'Web Application Firewall',
    'SIEM',
    'Endpoint Protection',
    'Network Monitor',
    'Threat Intelligence'
  ];

  return components.map(component => ({
    component,
    status: Math.random() < 0.9 ? 'online' : ['offline', 'warning', 'error'][Math.floor(Math.random() * 3)] as any,
    lastCheck: new Date(Date.now() - Math.random() * 300000), // Last 5 minutes
    responseTime: Math.floor(Math.random() * 200) + 10
  }));
}

export function generateAlert(): Alert {
  const messages = [
    'Suspicious login attempt detected',
    'Malware signature found in email attachment',
    'Unusual network traffic pattern observed',
    'Failed authentication attempts exceed threshold',
    'Potential data exfiltration detected',
    'System vulnerability scan completed'
  ];

  const types = ['info', 'warning', 'error', 'critical'] as const;
  
  return {
    id: `ALT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    message: messages[Math.floor(Math.random() * messages.length)],
    type: types[Math.floor(Math.random() * types.length)],
    acknowledged: false
  };
}

export function generateThreatDetection(): ThreatDetection {
  const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
  const riskScore = Math.floor(Math.random() * 10) + 1; // 1-10
  
  const descriptions = {
    behavioral_anomaly: 'Unusual user behavior pattern detected',
    signature_match: 'Known malware signature identified',
    ml_detection: 'Machine learning model flagged suspicious activity',
    correlation_rule: 'Multiple security events correlated to indicate threat'
  };

  const indicators = [
    'Suspicious file hash',
    'Unusual network connection',
    'Privilege escalation attempt',
    'Abnormal data access pattern',
    'Suspicious process execution',
    'Unauthorized API calls'
  ];

  return {
    id: `THR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000), // Last hour
    threatType,
    description: descriptions[threatType],
    confidence,
    riskScore,
    mitreTactics: mitreTactics.slice(0, Math.floor(Math.random() * 3) + 1),
    indicators: indicators.slice(0, Math.floor(Math.random() * 3) + 1),
    source: sampleSources[Math.floor(Math.random() * sampleSources.length)],
    target: sampleTargets[Math.floor(Math.random() * sampleTargets.length)]
  };
}

export function generateAnomalyDetection(): AnomalyDetection {
  const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
  const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const deviation = Math.floor(Math.random() * 500) + 50; // 50-550% deviation
  
  const descriptions = {
    traffic_spike: 'Unusual increase in network traffic detected',
    unusual_login: 'Login attempt from unusual location or time',
    data_exfiltration: 'Potential data exfiltration activity detected',
    privilege_escalation: 'Suspicious privilege escalation attempt'
  };

  const baselines = {
    traffic_spike: '1.2GB/hour',
    unusual_login: 'Business hours only',
    data_exfiltration: '50MB/hour',
    privilege_escalation: '0 attempts/hour'
  };
  
  const observed = {
    traffic_spike: `${(1.2 * (1 + deviation / 100)).toFixed(1)}GB/hour`,
    unusual_login: 'Off-hours access',
    data_exfiltration: `${(50 * (1 + deviation / 100)).toFixed(0)}MB/hour`,
    privilege_escalation: `${Math.floor(deviation / 100)} attempts/hour`
  };
  return {
    id: `ANO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(Date.now() - Math.random() * 1800000), // Last 30 minutes
    anomalyType,
    description: descriptions[anomalyType],
    severity,
    source: sampleSources[Math.floor(Math.random() * sampleSources.length)],
    baseline: baselines[anomalyType],
    observed: observed[anomalyType],
    deviation
  };
}