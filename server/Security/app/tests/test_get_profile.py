import unittest
from unittest.mock import MagicMock, patch
import uuid
from fastapi.responses import JSONResponse
from app.utils.get_profile import _get_profile, endpoints

class TestGetProfile(unittest.TestCase):
    def setUp(self):
        # Mock MongoDB collection
        self.collection = MagicMock()
        
        # Create test user ID
        self.test_uuid = uuid.uuid4()
        
        # Sample profile data for different endpoint types
        self.patient_data = {
            "NIC": "123456789X",
            "FirstName": "John",
            "LastName": "Doe",
            "Email": "john.doe@example.com",
            "Telephone": "1234567890",
            "DateOfBirth": "1990-01-01"
        }
        
        self.doctor_data = {
            "FullName": "Dr. Jane Smith",
            "NIC": "987654321X",
            "Email": "jane.smith@example.com",
            "Telephone": "0987654321",
            "Address": "123 Medical Center",
            "Specialization": "Cardiology",
            "Affiliation": "General Hospital",
            "OfficeHours": "9-5",
            "Experience": "10 years",
            "Qualifications": ["MD", "PhD"]
        }
        
        self.hospital_data = {
            "FullName": "Admin User",
            "DateOfBirth": "1985-05-15",
            "Gender": "Female",
            "NIC": "567890123X",
            "ContactNumber": "5678901234",
            "Email": "admin@hospital.com",
            "Address": "456 Hospital Road",
            "City": "Healthcare City",
            "PostalCode": "12345",
            "HospitalName": "Central Hospital",
            "PhoneNumber": "5555555555",
            "WorkLocation": "Main Building",
            "Department": "Administration",
            "MedicalRegistrationNumber": "MRN12345",
            "YearsOfExperience": "8",
            "ShiftType": "Day"
        }

    def test_get_patient_profile(self):
        # Set up mock collection to return patient data
        self.collection.find_one.return_value = self.patient_data
        
        # Call the function
        result = _get_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            endpoint="patient"
        )
        
        # Assert that collection.find_one was called with the right arguments
        self.collection.find_one.assert_called_once_with(
            {"UserID": self.test_uuid},
            endpoints.get("patient")
        )
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 200)
        
        # Convert the response body to string and check if all expected fields are present
        response_body = result.body.decode('utf-8')
        for key in self.patient_data.keys():
            self.assertIn(key, response_body)
            self.assertIn(str(self.patient_data[key]), response_body)

    def test_get_doctor_profile(self):
        # Set up mock collection to return doctor data
        self.collection.find_one.return_value = self.doctor_data
        
        # Call the function
        result = _get_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            endpoint="doctor"
        )
        
        # Assert that collection.find_one was called with the right arguments
        self.collection.find_one.assert_called_once_with(
            {"UserID": self.test_uuid},
            endpoints.get("doctor")
        )
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 200)
        
        # Check response contains doctor data fields (without checking exact JSON string)
        response_body = result.body.decode('utf-8')
        for key in self.doctor_data.keys():
            if key != "Qualifications":  # Skip array field for simple test
                self.assertIn(key, response_body)

    def test_get_hospital_profile(self):
        # Set up mock collection to return hospital data
        self.collection.find_one.return_value = self.hospital_data
        
        # Call the function
        result = _get_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            endpoint="hospital"
        )
        
        # Assert that collection.find_one was called with the right arguments
        self.collection.find_one.assert_called_once_with(
            {"UserID": self.test_uuid},
            endpoints.get("hospital")
        )
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 200)
        
        # Check response contains hospital data fields
        response_body = result.body.decode('utf-8')
        for key in self.hospital_data.keys():
            self.assertIn(key, response_body)
            self.assertIn(str(self.hospital_data[key]), response_body)

    def test_profile_not_found(self):
        # Set up mock collection to return None (profile not found)
        self.collection.find_one.return_value = None
        
        # Call the function
        result = _get_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            endpoint="patient"
        )
        
        # Assert that collection.find_one was called
        self.collection.find_one.assert_called_once()
        
        # Check response - should return a JSONResponse with null content
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.body.decode('utf-8'), 'null')

    def test_endpoints_dictionary(self):
        # Test that endpoints dictionary contains the expected keys
        self.assertIn("patient", endpoints)
        self.assertIn("doctor", endpoints)
        self.assertIn("hospital", endpoints)
        
        # Test that each endpoint dictionary contains the expected fields
        for key in ["NIC", "FirstName", "LastName", "Email"]:
            self.assertIn(key, endpoints["patient"])
            
        for key in ["FullName", "NIC", "Email", "Specialization"]:
            self.assertIn(key, endpoints["doctor"])
            
        for key in ["FullName", "HospitalName", "Department"]:
            self.assertIn(key, endpoints["hospital"])
        
        # Test that _id field is set to 0 (excluded) in all endpoint dictionaries
        self.assertEqual(endpoints["patient"]["_id"], 0)
        self.assertEqual(endpoints["doctor"]["_id"], 0)
        self.assertEqual(endpoints["hospital"]["_id"], 0)

if __name__ == '__main__':
    unittest.main()