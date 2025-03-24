import unittest
from unittest.mock import MagicMock, patch
from fastapi.responses import JSONResponse
from app.utils.delete_profile import _delete_profile
from argon2.exceptions import VerificationError

class TestDeleteProfile(unittest.TestCase):
    def setUp(self):
        # Mock MongoDB collection
        self.collection = MagicMock()
        
        # Test user data
        self.test_uuid = "test-user-id-123"
        self.test_email = "test@example.com"
        self.test_password = "secure_password"
        
        # Mock user data from database
        self.mock_user = {
            "Password": "hashed_password",
            "Email": "test@example.com"
        }

    @patch('app.utils.delete_profile.hasher')
    @patch('app.utils.delete_profile.hmac')
    def test_successful_profile_deletion(self, mock_hmac, mock_hasher):
        # Set up mock collection to return our user
        self.collection.find_one.return_value = self.mock_user
        
        # Set up password verification to succeed
        mock_hasher.verify.return_value = True
        
        # Set up email comparison to succeed
        mock_hmac.compare_digest.return_value = True
        
        # Call the function
        result = _delete_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            email=self.test_email,
            pw=self.test_password
        )
        
        # Assert that collection.find_one was called with the right arguments
        self.collection.find_one.assert_called_once_with(
            {"UserID": self.test_uuid},
            {"_id": 0, "Password": 1, "Email": 1}
        )
        
        # Assert that password was verified
        mock_hasher.verify.assert_called_once_with(
            password=self.test_password,
            hash=self.mock_user["Password"]
        )
        
        # Assert that email was compared
        mock_hmac.compare_digest.assert_called_once_with(
            self.mock_user["Email"],
            self.test_email
        )
        
        # Assert that delete_one was called with the right arguments
        self.collection.delete_one.assert_called_once_with({
            "UserID": self.test_uuid
        })
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 418)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"account deleted succesfully"}')

    @patch('app.utils.delete_profile.hasher')
    def test_invalid_password_verification_error(self, mock_hasher):
        # Set up mock collection to return our user
        self.collection.find_one.return_value = self.mock_user
        
        # Set up password verification to fail with VerificationError
        mock_hasher.verify.side_effect = VerificationError("Invalid password")
        
        # Call the function
        result = _delete_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            email=self.test_email,
            pw="wrong_password"
        )
        
        # Assert that collection.find_one was called
        self.collection.find_one.assert_called_once()
        
        # Assert that delete_one was NOT called
        self.collection.delete_one.assert_not_called()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 406)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"password is invalid"}')

    @patch('app.utils.delete_profile.hasher')
    def test_invalid_password(self, mock_hasher):
        # Set up mock collection to return our user
        self.collection.find_one.return_value = self.mock_user
        
        # Set up password verification to return False
        mock_hasher.verify.return_value = False
        
        # Call the function
        result = _delete_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            email=self.test_email,
            pw="wrong_password"
        )
        
        # Assert that collection.find_one was called
        self.collection.find_one.assert_called_once()
        
        # Assert that delete_one was NOT called
        self.collection.delete_one.assert_not_called()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 406)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"password is invalid"}')

    @patch('app.utils.delete_profile.hasher')
    @patch('app.utils.delete_profile.hmac')
    def test_invalid_email(self, mock_hmac, mock_hasher):
        # Set up mock collection to return our user
        self.collection.find_one.return_value = self.mock_user
        
        # Set up password verification to succeed
        mock_hasher.verify.return_value = True
        
        # Set up email comparison to fail
        mock_hmac.compare_digest.return_value = False
        
        # Call the function
        result = _delete_profile(
            collection=self.collection,
            c_uuid=self.test_uuid,
            email="wrong@example.com",
            pw=self.test_password
        )
        
        # Assert that collection.find_one was called
        self.collection.find_one.assert_called_once()
        
        # Assert that password was verified
        mock_hasher.verify.assert_called_once()
        
        # Assert that delete_one was NOT called
        self.collection.delete_one.assert_not_called()
        
        # Check response
        self.assertIsInstance(result, JSONResponse)
        self.assertEqual(result.status_code, 406)
        self.assertEqual(result.body.decode('utf-8'), '{"msg":"NIC is invalid"}')

    def test_user_not_found(self):
        # Set up mock collection to return None (user not found)
        self.collection.find_one.return_value = None
        
        # This should cause an AttributeError when trying to access .get("Password")
        with self.assertRaises(AttributeError):
            _delete_profile(
                collection=self.collection,
                c_uuid=self.test_uuid,
                email=self.test_email,
                pw=self.test_password
            )
        
        # Assert that collection.find_one was called
        self.collection.find_one.assert_called_once()
        
        # Assert that delete_one was NOT called
        self.collection.delete_one.assert_not_called()

if __name__ == '__main__':
    unittest.main()