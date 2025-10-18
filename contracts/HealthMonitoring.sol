// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title HealthMonitoring
 * @dev Smart contract for AI-powered health monitoring with email notifications
 * @author Sanjeevan AI Team
 */
contract HealthMonitoring {
    
    // Owner of the contract
    address public owner;
    
    // Structs
    struct VitalsData {
        uint256 timestamp;
        uint256 heartRate;
        uint256 systolicBP;
        uint256 diastolicBP;
        uint256 oxygenSaturation;
        uint256 temperature;
        uint256 steps;
        uint256 calories;
        uint256 sleepHours;
        uint256 stressLevel;
        string deviceType;
    }
    
    struct HealthAnalysis {
        uint256 timestamp;
        string riskLevel; // "low", "medium", "high"
        string[] predictions;
        string[] recommendations;
        string[] insights;
        bool emailSent;
        string emailId;
        uint256 dataPoints;
    }
    
    struct HealthAlert {
        uint256 timestamp;
        string alertType; // "warning", "critical"
        string message;
        bool resolved;
        bool emailSent;
        string emailId;
    }
    
    struct Patient {
        string name;
        uint256 age;
        string gender;
        string[] medicalHistory;
        string email;
        bool isActive;
        uint256 totalReadings;
        uint256 lastAnalysisTimestamp;
    }
    
    // State variables
    uint256 private _patientIds = 0;
    uint256 private _vitalsIds = 0;
    uint256 private _analysisIds = 0;
    uint256 private _alertIds = 0;
    
    mapping(uint256 => Patient) public patients;
    mapping(uint256 => VitalsData[]) public patientVitals;
    mapping(uint256 => HealthAnalysis[]) public patientAnalyses;
    mapping(uint256 => HealthAlert[]) public patientAlerts;
    mapping(string => uint256) public emailToPatientId;
    
    // Events
    event PatientRegistered(uint256 indexed patientId, string name, string email);
    event VitalsRecorded(uint256 indexed patientId, uint256 indexed vitalsId, uint256 timestamp);
    event HealthAnalysisCompleted(uint256 indexed patientId, uint256 indexed analysisId, string riskLevel, bool emailSent);
    event HealthAlertTriggered(uint256 indexed patientId, uint256 indexed alertId, string alertType, bool emailSent);
    event EmailNotificationSent(uint256 indexed patientId, string notificationType, string emailId);
    event PatientUpdated(uint256 indexed patientId, string email);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyValidPatient(uint256 _patientId) {
        require(_patientId > 0 && _patientId < _patientIds, "Invalid patient ID");
        require(patients[_patientId].isActive, "Patient not active");
        _;
    }
    
    modifier onlyValidVitals(VitalsData memory _vitals) {
        require(_vitals.heartRate > 0 && _vitals.heartRate <= 300, "Invalid heart rate");
        require(_vitals.systolicBP > 0 && _vitals.systolicBP <= 300, "Invalid systolic BP");
        require(_vitals.diastolicBP > 0 && _vitals.diastolicBP <= 200, "Invalid diastolic BP");
        require(_vitals.oxygenSaturation >= 70 && _vitals.oxygenSaturation <= 100, "Invalid oxygen saturation");
        require(_vitals.temperature >= 30 && _vitals.temperature <= 45, "Invalid temperature");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
        // Initialize counters - start from 1
        _patientIds = 1;
        _vitalsIds = 1;
        _analysisIds = 1;
        _alertIds = 1;
    }
    
    /**
     * @dev Register a new patient
     * @param _name Patient's name
     * @param _age Patient's age
     * @param _gender Patient's gender
     * @param _medicalHistory Array of medical conditions
     * @param _email Patient's email address
     */
    function registerPatient(
        string memory _name,
        uint256 _age,
        string memory _gender,
        string[] memory _medicalHistory,
        string memory _email
    ) external onlyOwner returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_age > 0 && _age <= 150, "Invalid age");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(emailToPatientId[_email] == 0, "Email already registered");
        
        uint256 patientId = _patientIds;
        _patientIds++;
        
        patients[patientId] = Patient({
            name: _name,
            age: _age,
            gender: _gender,
            medicalHistory: _medicalHistory,
            email: _email,
            isActive: true,
            totalReadings: 0,
            lastAnalysisTimestamp: 0
        });
        
        emailToPatientId[_email] = patientId;
        
        emit PatientRegistered(patientId, _name, _email);
        return patientId;
    }
    
    /**
     * @dev Record vitals data for a patient
     * @param _patientId Patient's ID
     * @param _vitals Vitals data struct
     */
    function recordVitals(
        uint256 _patientId,
        VitalsData memory _vitals
    ) external onlyOwner onlyValidPatient(_patientId) onlyValidVitals(_vitals) {
        _vitals.timestamp = block.timestamp;
        
        patientVitals[_patientId].push(_vitals);
        patients[_patientId].totalReadings++;
        
        uint256 vitalsId = _vitalsIds;
        _vitalsIds++;
        
        emit VitalsRecorded(_patientId, vitalsId, _vitals.timestamp);
        
        // Check for health alerts
        _checkHealthAlerts(_patientId, _vitals);
    }
    
    /**
     * @dev Record AI health analysis results
     * @param _patientId Patient's ID
     * @param _riskLevel Risk level assessment
     * @param _predictions Array of health predictions
     * @param _recommendations Array of recommendations
     * @param _insights Array of health insights
     * @param _emailSent Whether email was sent
     * @param _emailId Email ID if sent
     * @param _dataPoints Number of data points analyzed
     */
    function recordHealthAnalysis(
        uint256 _patientId,
        string memory _riskLevel,
        string[] memory _predictions,
        string[] memory _recommendations,
        string[] memory _insights,
        bool _emailSent,
        string memory _emailId,
        uint256 _dataPoints
    ) external onlyOwner onlyValidPatient(_patientId) {
        require(bytes(_riskLevel).length > 0, "Risk level cannot be empty");
        require(_predictions.length > 0, "Predictions cannot be empty");
        require(_recommendations.length > 0, "Recommendations cannot be empty");
        
        HealthAnalysis memory analysis = HealthAnalysis({
            timestamp: block.timestamp,
            riskLevel: _riskLevel,
            predictions: _predictions,
            recommendations: _recommendations,
            insights: _insights,
            emailSent: _emailSent,
            emailId: _emailId,
            dataPoints: _dataPoints
        });
        
        patientAnalyses[_patientId].push(analysis);
        patients[_patientId].lastAnalysisTimestamp = block.timestamp;
        
        uint256 analysisId = _analysisIds;
        _analysisIds++;
        
        emit HealthAnalysisCompleted(_patientId, analysisId, _riskLevel, _emailSent);
        
        if (_emailSent) {
            emit EmailNotificationSent(_patientId, "analysis", _emailId);
        }
    }
    
    /**
     * @dev Record health alert
     * @param _patientId Patient's ID
     * @param _alertType Type of alert (warning/critical)
     * @param _message Alert message
     * @param _emailSent Whether email was sent
     * @param _emailId Email ID if sent
     */
    function recordHealthAlert(
        uint256 _patientId,
        string memory _alertType,
        string memory _message,
        bool _emailSent,
        string memory _emailId
    ) external onlyOwner onlyValidPatient(_patientId) {
        require(bytes(_alertType).length > 0, "Alert type cannot be empty");
        require(bytes(_message).length > 0, "Alert message cannot be empty");
        
        HealthAlert memory alert = HealthAlert({
            timestamp: block.timestamp,
            alertType: _alertType,
            message: _message,
            resolved: false,
            emailSent: _emailSent,
            emailId: _emailId
        });
        
        patientAlerts[_patientId].push(alert);
        
        uint256 alertId = _alertIds;
        _alertIds++;
        
        emit HealthAlertTriggered(_patientId, alertId, _alertType, _emailSent);
        
        if (_emailSent) {
            emit EmailNotificationSent(_patientId, "alert", _emailId);
        }
    }
    
    /**
     * @dev Update patient email address
     * @param _patientId Patient's ID
     * @param _newEmail New email address
     */
    function updatePatientEmail(
        uint256 _patientId,
        string memory _newEmail
    ) external onlyOwner onlyValidPatient(_patientId) {
        require(bytes(_newEmail).length > 0, "Email cannot be empty");
        require(emailToPatientId[_newEmail] == 0, "Email already registered");
        
        string memory oldEmail = patients[_patientId].email;
        emailToPatientId[oldEmail] = 0;
        emailToPatientId[_newEmail] = _patientId;
        
        patients[_patientId].email = _newEmail;
        
        emit PatientUpdated(_patientId, _newEmail);
    }
    
    /**
     * @dev Resolve a health alert
     * @param _patientId Patient's ID
     * @param _alertIndex Index of the alert to resolve
     */
    function resolveAlert(
        uint256 _patientId,
        uint256 _alertIndex
    ) external onlyOwner onlyValidPatient(_patientId) {
        require(_alertIndex < patientAlerts[_patientId].length, "Invalid alert index");
        require(!patientAlerts[_patientId][_alertIndex].resolved, "Alert already resolved");
        
        patientAlerts[_patientId][_alertIndex].resolved = true;
    }
    
    /**
     * @dev Check for health alerts based on vitals
     * @param _patientId Patient's ID
     * @param _vitals Vitals data
     */
    function _checkHealthAlerts(uint256 _patientId, VitalsData memory _vitals) internal {
        // Heart rate alerts
        if (_vitals.heartRate > 100) {
            string memory message = string(abi.encodePacked(
                "Elevated heart rate detected: ",
                _uint2str(_vitals.heartRate),
                " BPM"
            ));
            
            if (_vitals.heartRate > 120) {
                // Critical heart rate - would trigger email in real implementation
                _recordAlert(_patientId, "critical", message, true, "auto-generated");
            } else {
                _recordAlert(_patientId, "warning", message, false, "");
            }
        }
        
        // Blood pressure alerts
        if (_vitals.systolicBP > 140 || _vitals.diastolicBP > 90) {
            string memory message = string(abi.encodePacked(
                "High blood pressure: ",
                _uint2str(_vitals.systolicBP),
                "/",
                _uint2str(_vitals.diastolicBP),
                " mmHg"
            ));
            
            // Always critical - would trigger email in real implementation
            _recordAlert(_patientId, "critical", message, true, "auto-generated");
        }
        
        // Oxygen saturation alerts
        if (_vitals.oxygenSaturation < 95) {
            string memory message = string(abi.encodePacked(
                "Low oxygen saturation: ",
                _uint2str(_vitals.oxygenSaturation),
                "%"
            ));
            
            if (_vitals.oxygenSaturation < 92) {
                // Critical - would trigger email in real implementation
                _recordAlert(_patientId, "critical", message, true, "auto-generated");
            } else {
                _recordAlert(_patientId, "warning", message, false, "");
            }
        }
        
        // Temperature alerts
        if (_vitals.temperature > 375) { // 37.5°C in tenths
            string memory message = string(abi.encodePacked(
                "Elevated temperature: ",
                _uint2str(_vitals.temperature / 10),
                ".",
                _uint2str(_vitals.temperature % 10),
                "C"
            ));
            
            if (_vitals.temperature > 380) { // 38.0°C in tenths
                // Critical - would trigger email in real implementation
                _recordAlert(_patientId, "critical", message, true, "auto-generated");
            } else {
                _recordAlert(_patientId, "warning", message, false, "");
            }
        }
    }
    
    /**
     * @dev Internal function to record alerts
     */
    function _recordAlert(
        uint256 _patientId,
        string memory _alertType,
        string memory _message,
        bool _emailSent,
        string memory _emailId
    ) internal {
        HealthAlert memory alert = HealthAlert({
            timestamp: block.timestamp,
            alertType: _alertType,
            message: _message,
            resolved: false,
            emailSent: _emailSent,
            emailId: _emailId
        });
        
        patientAlerts[_patientId].push(alert);
        
        uint256 alertId = _alertIds;
        _alertIds++;
        
        emit HealthAlertTriggered(_patientId, alertId, _alertType, _emailSent);
        
        if (_emailSent) {
            emit EmailNotificationSent(_patientId, "alert", _emailId);
        }
    }
    
    /**
     * @dev Convert uint to string
     */
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    
    // View functions
    function getPatient(uint256 _patientId) external view returns (Patient memory) {
        require(_patientId > 0 && _patientId < _patientIds, "Invalid patient ID");
        return patients[_patientId];
    }
    
    function getPatientVitals(uint256 _patientId) external view returns (VitalsData[] memory) {
        require(_patientId > 0 && _patientId < _patientIds, "Invalid patient ID");
        return patientVitals[_patientId];
    }
    
    function getPatientAnalyses(uint256 _patientId) external view returns (HealthAnalysis[] memory) {
        require(_patientId > 0 && _patientId < _patientIds, "Invalid patient ID");
        return patientAnalyses[_patientId];
    }
    
    function getPatientAlerts(uint256 _patientId) external view returns (HealthAlert[] memory) {
        require(_patientId > 0 && _patientId < _patientIds, "Invalid patient ID");
        return patientAlerts[_patientId];
    }
    
    function getPatientIdByEmail(string memory _email) external view returns (uint256) {
        return emailToPatientId[_email];
    }
    
    function getTotalPatients() external view returns (uint256) {
        return _patientIds - 1;
    }
    
    function getTotalVitals() external view returns (uint256) {
        return _vitalsIds - 1;
    }
    
    function getTotalAnalyses() external view returns (uint256) {
        return _analysisIds - 1;
    }
    
    function getTotalAlerts() external view returns (uint256) {
        return _alertIds - 1;
    }
    
    function getContractInfo() external view returns (
        address contractOwner,
        uint256 totalPatients,
        uint256 totalVitals,
        uint256 totalAnalyses,
        uint256 totalAlerts
    ) {
        return (
            owner,
            _patientIds - 1,
            _vitalsIds - 1,
            _analysisIds - 1,
            _alertIds - 1
        );
    }
}