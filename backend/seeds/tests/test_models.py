from django.test import TestCase
from seeds.models import Suite, User, Blob


class UserTests(TestCase):
    def setUp(self):
        User.objects.create(username="test_user")

    def tearDown(self):
        User.objects.get(username="test_user").delete()

    def test_user_has_username(self):
        test_user = User.objects.get(username="test_user")
        self.assertEqual(test_user.get_username(), "test_user")


class SuiteTests(TestCase):
    def setUp(self):
        """
        Initialize all Suite tests with new Suite and User records
        """
        test_user = User.objects.create(username="test_user")
        Suite.objects.create(name="test_suite", owner=user)

    def test_suite_exists_and_has_name(self):
        test_suite = Suite.objects.get(name="test_suite")
        self.assertIsNotNone(test_suite)

    def test_suite_has_correct_owner(self):
        test_suite = Suite.objects.get(name="test_suite")
        test_user = User.objects.get(username="test_user")
        self.assertEqual(test_suite.owner, test_user)

    def test_suite_has_blobs(self):
        test_suite = Suite.objects.get(name="test_suite")
        # create a new blob and add it to suite's blobs
        test_blob = suite.blobs.create(name="test_blob", owner=test_suite.owner)
        # test that this relationship exists from both directions
        self.assertEqual(test_suite.blobs.get(name="test_blob"), test_blob)
        self.assertEqual(test_blob.suites.get(name="test_suite"), test_suite)

class BlobTests(TestCase):
    def setUp(self):
        """
        Initialize all Blob tests with new User, Blob records
        """
        blob_test_user = User.objects.create(username="test_user")
        Blob.objects.create(name="Blob_test_blob", owner=blob_test_user)
    
    def test_blob_exists_and_has_name(self):
        blob = Blob.objects.get(name="Blob_test_blob")
        self.assertIsNotNone(blob)

    def test_blob_has_correct_owner(self):
        blob = Blob.objects.get(name="Blob_test_blob")
        user = User.objects.get(username="Blob_test_user")
        self.assertEqual(suite.owner, user)

    def test_suite_has_no_suites(self):
        suite = Suite.objects.get(name="Suite_test_suite")
        # create a new blob and add it to suite's blobs
        blob = suite.blobs.create(name="Suite_test_blob", owner=suite.owner)
        # test that this relationship exists from both directions
        self.assertEqual(suite.blobs.get(name="Suite_test_blob"), blob)
        self.assertEqual(blob.suites.get(name="Suite_test_suite"), suite)
    
    def test_blob_has_no_clips(self):
        pass

    def test_blob_has_suite(self):
        pass

    def test_blob_has_clip(self):
        pass
