import unittest
from unittest.mock import MagicMock, patch
import uuid
import bson
from fastapi.responses import JSONResponse
from app.utils.reset_pw import _password_reset
from argon2.exceptions import VerificationError

class TestPasswordReset(unittest.TestCase):
    def setUp(self):
        # Mock MongoDB collection
        self.collection = MagicMock()
        
        # Create test user ID
        self.test_uuid = uuid.uuid4()
        
        # Test passwords
        self.old_password = "oldSecurePassword123"
        self.new_password = "newSecurePassword456"
        
        # Mock user data from database
        self.mock_user = {
            "Password": "hashed_password"
        }

    @patch('app.utils.reset_pw.hasher')
    def test_successful_password_reset(self, mock_hasher):
        # Set up mock collection to return our user
        self.collection.aggregate.return_value = iter([self.mock_user])
        
        # Set up password verification to succeed
        mock_hasher.verify.return_value = True
        
        # Set up new password hashing
        mock_hasher.hash.return_value = "new_hashed_password"
        
        # Call the function
        result = _password_reset(
            collection=self.collection,
            c_uuid=self.test_uuid,
            old_pw=self.old_password,
            new_pw=self.new_password
        )
        
        # Assert that collection.aggregate was called
        self.collection.aggregate.assert_called_once()
        
        # Assert that password was verified
        mock_hasher.verify.assert_called_once_with(
            password=self.old_password,
            hash=self.mock_user["Password"]
        )
        
        # Assert that the new password was hashed
        mock_hasher.hash.assert_called_once_with(self.new_password)
        
        # Assert that update_one was called with the right arguments
        self.collection.update_one.assert_called_once()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 202)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"password successfuly updated"}')

    @patch('app.utils.reset_pw.hasher')
    def test_invalid_old_password_verification_error(self, mock_hasher):
        # Set up mock collection to return our user
        self.collection.aggregate.return_value = iter([self.mock_user])
        
        # Set up password verification to fail with VerificationError
        mock_hasher.verify.side_effect = VerificationError("Invalid password")
        
        # Call the function
        result = _password_reset(
            collection=self.collection,
            c_uuid=self.test_uuid,
            old_pw="wrongPassword",
            new_pw=self.new_password
        )
        
        # Assert that collection.aggregate was called
        self.collection.aggregate.assert_called_once()
        
        # Assert that update_one was NOT called
        self.collection.update_one.assert_not_called()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 406)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"Old password is invalid"}')

    @patch('app.utils.reset_pw.hasher')
    def test_invalid_old_password(self, mock_hasher):
        # Set up mock collection to return our user
        self.collection.aggregate.return_value = iter([self.mock_user])
        
        # Set up password verification to return False
        mock_hasher.verify.return_value = False
        
        # Call the function
        result = _password_reset(
            collection=self.collection,
            c_uuid=self.test_uuid,
            old_pw="wrongPassword",
            new_pw=self.new_password
        )
        
        # Assert that collection.aggregate was called
        self.collection.aggregate.assert_called_once()
        
        # Assert that update_one was NOT called
        self.collection.update_one.assert_not_called()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 406)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"Old password is invalid"}')

    def test_user_not_found(self):
        # Set up mock collection to return empty iterator (user not found)
        self.collection.aggregate.return_value = iter([])
        
        # This should cause an AttributeError when trying to call .get("Password") on None
        with self.assertRaises(AttributeError):
            _password_reset(
                collection=self.collection,
                c_uuid=self.test_uuid,
                old_pw=self.old_password,
                new_pw=self.new_password
            )
        
        # Assert that collection.aggregate was called
        self.collection.aggregate.assert_called_once()
        
        # Assert that update_one was NOT called
        self.collection.update_one.assert_not_called()

if __name__ == '__main__':
    unittest.main()