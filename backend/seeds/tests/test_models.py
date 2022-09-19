from django.test import TestCase
from seeds.models import User, Suite, Blob, AudioClip

class UserTests(TestCase):
    def setUp(self):
        User.objects.create(username="test_user")
    
    def test_user_has_username(self, test_username="test_user"):
        test_user = User.objects.get(username=test_username)
        self.assertEqual(test_user.get_username(), test_username)
