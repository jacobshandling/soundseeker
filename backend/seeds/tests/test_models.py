from django.test import TestCase
from seeds.models import Blob, Suite, User

# "Django only flushes the default database at the start of each test run"
# https://docs.djangoproject.com/en/4.1/topics/testing/tools/#testcase


class UserTests(TestCase):
    def setUp(self):
        self.test_user = User.objects.create(username="test_user")

    def tearDown(self):
        self.test_user.delete()

    def test_user_exists_with_name(self):
        self.assertIsNotNone(self.test_user)
        self.assertEqual(self.test_user.get_username(), "test_user")


class SuiteTests(TestCase):
    def setUp(self):
        """
        Initialize all Suite tests with new Suite and User records
        """
        self.test_user = User.objects.create(username="test_user")
        self.test_suite = Suite.objects.create(name="test_suite", owner=self.test_user)

    def test_suite_exists_with_name_and_owner(self):
        self.assertIsNotNone(self.test_suite)
        self.assertEqual(self.test_suite.name, "test_suite")
        self.assertEqual(self.test_suite.owner, self.test_user)

    def test_suite_has_no_blobs(self):
        self.assertEqual(self.test_suite.blobs.count(), 0)

    def test_add_blob_to_suite(self):
        # create a new blob and add it to suite's blobs
        test_blob = self.test_suite.blobs.create(name="test_blob", owner=self.test_user)
        # test that this relationship exists from both directions
        self.assertEqual(self.test_suite.blobs.get(name="test_blob"), test_blob)
        self.assertEqual(test_blob.suites.get(name="test_suite"), self.test_suite)


class BlobTests(TestCase):
    def setUp(self):
        """
        Initialize all Blob tests with new User, Blob records
        """
        self.test_user = User.objects.create(username="test_user")
        self.test_blob = Blob.objects.create(name="test_blob", owner=self.test_user)

    def test_blob_exists_with_name_and_owner(self):
        self.assertIsNotNone(self.test_blob)
        self.assertEqual(self.test_blob.name, "test_blob")
        self.assertEqual(self.test_blob.owner, self.test_user)

    def test_blob_has_no_suites(self):
        self.assertEqual(self.test_blob.suites.count(), 0)

    def test_blob_has_no_clips(self):
        self.assertEqual(self.test_blob.clips.count(), 0)

    def test_add_suite_to_blob(self):
        # add a new suite to test_blob's suites
        test_suite = self.test_blob.suites.create(
            name="test_suite", owner=self.test_user
        )
        # test that this relationship exists from both directions
        self.assertEqual(test_suite.blobs.get(name="test_blob"), self.test_blob)
        self.assertEqual(self.test_blob.suites.get(name="test_suite"), test_suite)

    def test_add_clip_to_blob(self):
        """
        TODO: use Mock to simulate uploading an audio file to create a test AudioClip
        """
        pass


class AudioClipTest(TestCase):
    def setUp(self):
        """
        Initialize each test with a new User and new AudioClip
        """
        pass

    def test_audioclip_exists_with_name_and_owner_and_file(self):
        pass

    def test_audioclip_has_no_blobs(self):
        pass

    def test_add_blob_to_audioclip(self):
        pass
