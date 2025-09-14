import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Modal,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Badge
} from '@mui/material';
import {
  Security,
  LocationOn,
  Phone,
  EmergencyRecording,
  FileDownload,
  BatteryFull,
  Battery50,
  Battery20,
  Warning,
  Analytics,
  Refresh,
  LocalPolice
} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Add CSS for custom markers
const style = document.createElement('style');
style.textContent = `
  .custom-div-icon {
    background: transparent !important;
    border: none !important;
  }
`;
document.head.appendChild(style);

// Mock data (same as before)
const mockTourists = [
    {
    id: 1,
    name: 'Sarah Johnson',
    nationality: 'USA',
    lat: 28.6139,
    lng: 77.2090,
    status: 'safe',
    batteryLevel: 85,
    lastSeen: '2 minutes ago',
    photo: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=SJ',
    emergencyContact: '+1-555-0123',
    recentLocations: [
      { time: '10:30 AM', lat: 28.6140, lng: 77.2091, status: 'safe' },
      { time: '10:25 AM', lat: 28.6138, lng: 77.2088, status: 'safe' },
      { time: '10:20 AM', lat: 28.6135, lng: 77.2085, status: 'safe' }
    ]
  }
  // ... (keep your mock data the same)
];

const mockAlerts = [
  // ... (keep your mock data the same)
]

// Heatmap data for demo
const heatmapData = [
  { lat: 28.6140, lng: 77.2090, intensity: 0.8 },
  { lat: 28.6145, lng: 77.2100, intensity: 0.6 },
  { lat: 28.6120, lng: 77.2075, intensity: 0.4 },
  { lat: 28.6160, lng: 77.2120, intensity: 0.7 },
  { lat: 28.6100, lng: 77.2050, intensity: 0.5 }
];

// Analytics data
const analyticsData = [
  { type: 'Panic Button', count: 5 },
  { type: 'Inactivity', count: 3 },
  { type: 'Geofence', count: 2 },
  { type: 'Low Battery', count: 4 },
  { type: 'Emergency', count: 1 }
];

function App() {
  const [tourists, setTourists] = useState(mockTourists);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const mapRef = useRef(null);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTourists(prevTourists => {
        const updatedTourists = [...prevTourists];
        const randomIndex = Math.floor(Math.random() * updatedTourists.length);
        const tourist = updatedTourists[randomIndex];
        
        // Simulate status changes
        const statuses = ['safe', 'alert', 'inactive'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (newStatus !== tourist.status) {
          tourist.status = newStatus;
          tourist.lastSeen = 'Just now';
          
          // Add new alert if status changed to alert
          if (newStatus === 'alert') {
            const newAlert = {
              id: Date.now(),
              touristId: tourist.id,
              type: 'Status Change',
              severity: 'medium',
              timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              }),
              description: `Tourist status changed to ${newStatus}`,
              tourist: tourist
            };
            setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 9)]);
          }
        }
        
        // Update battery level
        tourist.batteryLevel = Math.max(5, tourist.batteryLevel + (Math.random() - 0.5) * 10);
        
        return updatedTourists;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return '#4CAF50';
      case 'alert': return '#F44336';
      case 'inactive': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#F44336';
      case 'high': return '#FF9800';
      case 'medium': return '#FFEB3B';
      case 'low': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getBatteryIcon = (level) => {
    if (level > 60) return <BatteryFull />;
    if (level > 30) return <Battery50 />;
    return <Battery20 />;
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setSelectedTourist(alert.tourist);
    setMapCenter([alert.tourist.lat, alert.tourist.lng]);
  };

  const handleMarkerClick = (tourist) => {
    setSelectedTourist(tourist);
    setSelectedAlert(null);
  };

  const generateEFIR = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('E-FIR Report', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Tourist: ${selectedTourist.name}`, 20, 40);
    pdf.text(`Nationality: ${selectedTourist.nationality}`, 20, 50);
    pdf.text(`Location: ${selectedTourist.lat}, ${selectedTourist.lng}`, 20, 60);
    pdf.text(`Status: ${selectedTourist.status}`, 20, 70);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 80);
    pdf.save(`EFIR_${selectedTourist.name}_${Date.now()}.pdf`);
  };

  const MapComponent = () => {
    const map = useMap();
    
    useEffect(() => {
      if (mapCenter && map) {
        map.setView(mapCenter, 15);
      }
    }, [mapCenter, map]);

    return null;
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Security sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TouristSafe Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, height: 'calc(100vh - 64px)' }}>
        {/* Left Sidebar - Alerts/Analytics */}
        <Paper sx={{ width: 350, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Warning />} label="Alerts" />
            <Tab icon={<Analytics />} label="Analytics" />
          </Tabs>
          
          {activeTab === 0 ? (
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
              <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
                Real-time Alerts
                <Badge badgeContent={alerts.length} color="error" sx={{ ml: 1 }} />
              </Typography>
              <List>
                {alerts.map((alert) => (
                  <ListItem
                    key={alert.id}
                    button
                    onClick={() => handleAlertClick(alert)}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: selectedAlert?.id === alert.id ? '#e3f2fd' : 'white'
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: getSeverityColor(alert.severity)
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.tourist.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {alert.type} - {alert.timestamp}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            sx={{
                              backgroundColor: getSeverityColor(alert.severity),
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Alerts by Type
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Tourist Status Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h4" color="success.main">
                      {tourists.filter(t => t.status === 'safe').length}
                    </Typography>
                    <Typography variant="body2">Safe</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h4" color="error.main">
                      {tourists.filter(t => t.status === 'alert').length}
                    </Typography>
                    <Typography variant="body2">In Alert</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h4" color="text.secondary">
                      {tourists.filter(t => t.status === 'inactive').length}
                    </Typography>
                    <Typography variant="body2">Inactive</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant="h4" color="warning.main">
                      {tourists.filter(t => t.batteryLevel < 20).length}
                    </Typography>
                    <Typography variant="body2">Low Battery</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        {/* Main Map Area */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <MapContainer
            center={[28.6139, 77.2090]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapComponent />
            
            {tourists.map((tourist) => (
              <Marker
                key={tourist.id}
                position={[tourist.lat, tourist.lng]}
                icon={createCustomIcon(getStatusColor(tourist.status))}
                eventHandlers={{
                  click: () => handleMarkerClick(tourist)
                }}
              >
                <Popup>
                  <Box>
                    <Typography variant="h6">{tourist.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tourist.nationality} • {tourist.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Battery: {Math.round(tourist.batteryLevel)}%
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleMarkerClick(tourist)}
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Controls */}
          <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                />
              }
              label="Heatmap"
            />
          </Box>
        </Box>
      </Box>

      {/* Tourist Detail Modal */}
      <Modal
        open={!!selectedTourist}
        onClose={() => setSelectedTourist(null)}
        aria-labelledby="tourist-detail-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflow: 'auto'
          }}
        >
          {selectedTourist && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: '50%', mr: 2 }}
                  image={selectedTourist.photo}
                  alt={selectedTourist.name}
                />
                <Box>
                  <Typography variant="h4">{selectedTourist.name}</Typography>
                  <Typography variant="h6" color="text.secondary">
                    {selectedTourist.nationality}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(selectedTourist.status),
                        mr: 1
                      }}
                    />
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {selectedTourist.status}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {selectedTourist.lat.toFixed(4)}, {selectedTourist.lng.toFixed(4)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last seen: {selectedTourist.lastSeen}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getBatteryIcon(selectedTourist.batteryLevel)}
                        <Typography sx={{ ml: 1 }}>Battery</Typography>
                      </Box>
                    </Typography>
                    <Typography variant="h4" color={selectedTourist.batteryLevel < 20 ? 'error.main' : 'success.main'}>
                      {Math.round(selectedTourist.batteryLevel)}%
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Recent Locations
              </Typography>
              <Timeline>
                {selectedTourist.recentLocations.map((location, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={location.status === 'safe' ? 'success' : 'error'} />
                      {index < selectedTourist.recentLocations.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">{location.time}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>

              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<Phone />}
                  color="primary"
                >
                  Call Tourist
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EmergencyRecording />}
                  color="secondary"
                >
                  Call Emergency Contact
                </Button>
                <Button
                  variant="contained"
                  startIcon={<LocalPolice />}
                  color="warning"
                >
                  Dispatch Unit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={generateEFIR}
                  sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                  Generate E-FIR
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}


export default App;
