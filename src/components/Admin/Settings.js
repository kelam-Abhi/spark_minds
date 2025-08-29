import React, { useState } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Database,
  Bell,
  Globe,
  Palette,
  User,
  Lock,
  Mail,
  Calendar,
  Clock,
  Monitor,
  Smartphone,
  Code,
  MessageSquare,
  Video,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  CreditCard,
  BarChart3,
  FileText
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Maganti LMS',
      systemEmail: 'admin@maganti.com',
      timezone: 'UTC+5:30',
      dateFormat: 'DD/MM/YYYY',
      language: 'English',
      maintenanceMode: false,
      maxFileSize: '10MB',
      allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'mp4'],
      sessionTimeout: 30
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notificationFrequency: 'immediate',
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      },
      emailTemplates: {
        welcome: true,
        courseEnrollment: true,
        taskReminder: true,
        completion: true
      }
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      requireTwoFactor: false,
      passwordPolicy: 'strong',
      ipWhitelist: '',
      auditLogging: true,
      dataEncryption: true,
      backupFrequency: 'daily',
      sslRequired: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      sidebarCollapsed: false,
      compactMode: false,
      showAnimations: true,
      customLogo: '',
      favicon: ''
    },
    integrations: {
      googleCalendar: false,
      slack: false,
      teams: false,
      zoom: false,
      github: false,
      stripe: false,
      sendgrid: false
    },
    advanced: {
      debugMode: false,
      performanceMonitoring: true,
      errorReporting: true,
      analytics: true,
      caching: true,
      compression: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));

    // Clear validation errors when user makes changes
    if (validationErrors[`${category}_${key}`]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${category}_${key}`];
        return newErrors;
      });
    }
  };

  const handleNestedSettingChange = (category, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value
        }
      }
    }));
  };

  const validateSettings = () => {
    const errors = {};

    if (!settings.general.companyName.trim()) {
      errors.general_companyName = 'Company name is required';
    }

    if (!settings.general.systemEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.general.systemEmail)) {
      errors.general_systemEmail = 'Valid system email is required';
    }

    if (settings.security.maxLoginAttempts < 1 || settings.security.maxLoginAttempts > 10) {
      errors.security_maxLoginAttempts = 'Max login attempts must be between 1 and 10';
    }

    if (settings.security.sessionTimeout < 5 || settings.security.sessionTimeout > 120) {
      errors.security_sessionTimeout = 'Session timeout must be between 5 and 120 minutes';
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validateSettings();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaveMessage('Settings saved successfully!');
    setValidationErrors({});
    
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
    setSettings({
      general: {
        companyName: 'Maganti LMS',
        systemEmail: 'admin@maganti.com',
        timezone: 'UTC+5:30',
        dateFormat: 'DD/MM/YYYY',
        language: 'English',
          maintenanceMode: false,
          maxFileSize: '10MB',
          allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'mp4'],
          sessionTimeout: 30
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        notificationFrequency: 'immediate',
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00'
          },
          emailTemplates: {
            welcome: true,
            courseEnrollment: true,
            taskReminder: true,
            completion: true
        }
      },
      security: {
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        requireTwoFactor: false,
        passwordPolicy: 'strong',
        ipWhitelist: '',
          auditLogging: true,
          dataEncryption: true,
          backupFrequency: 'daily',
          sslRequired: true
      },
      appearance: {
        theme: 'light',
        primaryColor: '#3B82F6',
        sidebarCollapsed: false,
        compactMode: false,
          showAnimations: true,
          customLogo: '',
          favicon: ''
      },
      integrations: {
        googleCalendar: false,
        slack: false,
        teams: false,
        zoom: false,
          github: false,
          stripe: false,
          sendgrid: false
        },
        advanced: {
          debugMode: false,
          performanceMonitoring: true,
          errorReporting: true,
          analytics: true,
          caching: true,
          compression: true
        }
      });
      setValidationErrors({});
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'advanced', label: 'Advanced', icon: Code }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.general_companyName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.general_companyName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.general_companyName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Email *
          </label>
          <input
            type="email"
            value={settings.general.systemEmail}
            onChange={(e) => handleSettingChange('general', 'systemEmail', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.general_systemEmail ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.general_systemEmail && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.general_systemEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC+5:30">UTC+5:30 (IST)</option>
            <option value="UTC+0:00">UTC+0:00 (GMT)</option>
            <option value="UTC-5:00">UTC-5:00 (EST)</option>
            <option value="UTC-8:00">UTC-8:00 (PST)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max File Size
          </label>
          <select
            value={settings.general.maxFileSize}
            onChange={(e) => handleSettingChange('general', 'maxFileSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5MB">5MB</option>
            <option value="10MB">10MB</option>
            <option value="25MB">25MB</option>
            <option value="50MB">50MB</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allowed File Types
        </label>
        <div className="flex flex-wrap gap-2">
          {['pdf', 'doc', 'docx', 'jpg', 'png', 'mp4', 'zip', 'txt'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={settings.general.allowedFileTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleSettingChange('general', 'allowedFileTypes', [...settings.general.allowedFileTypes, type]);
                  } else {
                    handleSettingChange('general', 'allowedFileTypes', settings.general.allowedFileTypes.filter(t => t !== type));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900 capitalize">{type}</span>
            </label>
          ))}
        </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.general.maintenanceMode}
            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        <span className="ml-2 text-sm text-gray-900">Enable Maintenance Mode</span>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Email Notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Push Notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.smsNotifications}
            onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">SMS Notifications</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Frequency
          </label>
          <select
            value={settings.notifications.notificationFrequency}
            onChange={(e) => handleSettingChange('notifications', 'notificationFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Quiet Hours</h4>
        <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={settings.notifications.quietHours.enabled}
            onChange={(e) => handleNestedSettingChange('notifications', 'quietHours', 'enabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Enable Quiet Hours</span>
          </div>

        {settings.notifications.quietHours.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              value={settings.notifications.quietHours.start}
                onChange={(e) => handleNestedSettingChange('notifications', 'quietHours', 'start', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              value={settings.notifications.quietHours.end}
                onChange={(e) => handleNestedSettingChange('notifications', 'quietHours', 'end', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Email Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.notifications.emailTemplates).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleNestedSettingChange('notifications', 'emailTemplates', key, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes) *
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="120"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.security_sessionTimeout ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.security_sessionTimeout && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.security_sessionTimeout}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts *
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            min="1"
            max="10"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.security_maxLoginAttempts ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.security_maxLoginAttempts && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.security_maxLoginAttempts}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Policy
          </label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="basic">Basic (8+ characters)</option>
            <option value="strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
            <option value="very-strong">Very Strong (16+ characters, mixed case, numbers, symbols)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Backup Frequency
          </label>
          <select
            value={settings.security.backupFrequency}
            onChange={(e) => handleSettingChange('security', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IP Whitelist (one per line)
          </label>
        <textarea
            value={settings.security.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
          rows={3}
          placeholder="192.168.1.1&#10;10.0.0.1&#10;172.16.0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <p className="text-sm text-gray-500 mt-1">Leave empty to allow all IPs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security.requireTwoFactor}
            onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Require Two-Factor Authentication</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security.auditLogging}
            onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Enable Audit Logging</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security.dataEncryption}
            onChange={(e) => handleSettingChange('security', 'dataEncryption', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Enable Data Encryption</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security.sslRequired}
            onChange={(e) => handleSettingChange('security', 'sslRequired', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Require SSL Connection</span>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={settings.appearance.theme}
            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Logo URL
          </label>
          <input
            type="url"
            value={settings.appearance.customLogo}
            onChange={(e) => handleSettingChange('appearance', 'customLogo', e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favicon URL
          </label>
          <input
            type="url"
            value={settings.appearance.favicon}
            onChange={(e) => handleSettingChange('appearance', 'favicon', e.target.value)}
            placeholder="https://example.com/favicon.ico"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.appearance.sidebarCollapsed}
            onChange={(e) => handleSettingChange('appearance', 'sidebarCollapsed', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Collapse Sidebar by Default</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.appearance.compactMode}
            onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Compact Mode</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.appearance.showAnimations}
            onChange={(e) => handleSettingChange('appearance', 'showAnimations', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">Show Animations</span>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.integrations).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                {key === 'googleCalendar' && <Calendar className="w-5 h-5 text-blue-600" />}
                {key === 'slack' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                {key === 'teams' && <Users className="w-5 h-5 text-blue-600" />}
                {key === 'zoom' && <Video className="w-5 h-5 text-blue-600" />}
                {key === 'github' && <Code className="w-5 h-5 text-gray-800" />}
                {key === 'stripe' && <CreditCard className="w-5 h-5 text-green-600" />}
                {key === 'sendgrid' && <Mail className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {value ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('integrations', key, !value)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                value
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {value ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
              </div>
            </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.advanced).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                {key === 'debugMode' && <Code className="w-5 h-5 text-red-600" />}
                {key === 'performanceMonitoring' && <Monitor className="w-5 h-5 text-blue-600" />}
                {key === 'errorReporting' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                {key === 'analytics' && <BarChart3 className="w-5 h-5 text-green-600" />}
                {key === 'caching' && <Database className="w-5 h-5 text-purple-600" />}
                {key === 'compression' && <FileText className="w-5 h-5 text-indigo-600" />}
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {value ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('advanced', key, !value)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                value
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {value ? 'Disable' : 'Enable'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'advanced':
        return renderAdvancedSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-md ${
          saveMessage.includes('successfully')
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {saveMessage.includes('successfully') ? (
            <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 inline mr-2" />
          )}
          {saveMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

        <div className="p-6">
        {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
