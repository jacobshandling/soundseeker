from django.test import TestCase
from seeds.models import User, Suite, Blob


class UserTests(TestCase):
    def setUp(self):
        User.objects.create(username="User_test_user")
    
    def tearDown(self):
        User.objects.get(username="User_test_user").delete()

    def test_user_has_username(self):
        test_user = User.objects.get(username="User_test_user")
        self.assertEqual(test_user.get_username(), "User_test_user")

class SuiteTests(TestCase):
    def setUp(self):
        '''
        Initialize all Suite tests with a suite: Suite that has an owner: User
        '''
        suite_test_user = User.objects.create(username="Suite_test_user")
        Suite.objects.create(name="Suite_test_suite", owner=suite_test_user)
    
    def test_suite_has_name(self):
        suite = Suite.objects.get(name="Suite_test_suite")
        self.assertIsNotNone(suite)

    def test_suite_has_owner(self):
        suite = Suite.objects.get(name="Suite_test_suite")
        user = User.objects.get(username="Suite_test_user")
        self.assertEqual(suite.owner, user)
    
    def test_suite_has_blobs(self):
        suite = Suite.objects.get(name="Suite_test_suite")
        # create a new blob and add it to suite's blobs
        blob = suite.blobs.create(name="Suite_test_blob", owner = suite.owner)
        # test that this relationship exists from both directions
        self.assertEqual(suite.blobs.get(name="Suite_test_blob"), blob)
        self.assertEqual(blob.suites.get(name="Suite_test_suite"), suite)
