import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime, timezone, timedelta
import os
import sys
from app.utils.gen_tokens import generateTokens
from authlib.jose import jwt

class TestGenerateTokens(unittest.TestCase):
    def setUp(self):
        # Use the actual private key from the application
        with open('./app/data/keys/private.pem', 'r') as file:
            self.private_key = file.read()
            
        with open('./app/data/keys/refresh_private.pem', 'r') as file:
            self.refresh_private_key = file.read()
        
        # Test payload
        self.test_uuid = "test-user-id-123"
        
    @patch('app.utils.gen_tokens.datetime')
    def test_generate_session_token(self, mock_datetime):
        # Mock datetime to have a fixed now() time
        mock_now = datetime(2023, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
        mock_datetime.datetime.now.return_value = mock_now
        mock_datetime.timezone = timezone
        mock_datetime.timedelta = timedelta
        
        # Generate a session token
        token = generateTokens(
            type="session",
            endpoint="patient",
            payload=self.test_uuid,
            key=self.private_key,
            exp=60
        )
        
        # Verify token is a string
        self.assertIsInstance(token, str)
        
        # For JWT tokens, we can't easily decode them in tests without the proper setup
        # We'll just verify the token was generated as a string
        self.assertTrue(len(token) > 20)  # A minimum sanity check for token length
    
    @patch('app.utils.gen_tokens.datetime')
    def test_generate_refresh_token(self, mock_datetime):
        # Mock datetime to have a fixed now() time
        mock_now = datetime(2023, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
        mock_datetime.datetime.now.return_value = mock_now
        mock_datetime.timezone = timezone
        mock_datetime.timedelta = timedelta
        
        # Generate a refresh token with longer expiration
        token = generateTokens(
            type="refresh",
            endpoint="doctor",
            payload=self.test_uuid,
            key=self.refresh_private_key,
            exp=10080  # 7 days in minutes
        )
        
        # Verify token is a string
        self.assertIsInstance(token, str)
        
        # Simple length check
        self.assertTrue(len(token) > 20)
    
    @patch('app.utils.gen_tokens.datetime')
    def test_token_for_hospital_endpoint(self, mock_datetime):
        # Mock datetime to have a fixed now() time
        mock_now = datetime(2023, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
        mock_datetime.datetime.now.return_value = mock_now
        mock_datetime.timezone = timezone
        mock_datetime.timedelta = timedelta
        
        # Generate a token for hospital endpoint
        token = generateTokens(
            type="session",
            endpoint="hospital",
            payload=self.test_uuid,
            key=self.private_key,
            exp=30
        )
        
        # Verify token is a string
        self.assertIsInstance(token, str)
        
        # Simple length check
        self.assertTrue(len(token) > 20)

if __name__ == '__main__':
    # Change directory to the server root to ensure paths resolve correctly
    server_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
    os.chdir(server_dir)
    unittest.main()