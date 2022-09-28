from django.test import TestCase


class SeedsRootAPITests(TestCase):
    def test_unauthenticated_get(self):
        # 403 forbidden
        pass

    def test_get(self):
        # {users: ..., suites: ..., blobs: ..., audioclips: ...}
        pass


class SeedsUserAPITests(TestCase):
    # low priority - out-of-the-box functionality

    def test_unauthenticated_user_all_methods(self):
        # create, read, update, destroy
        # 403 forbidden with JSON message
        pass

    def test_list(self):
        pass

    def test_detail(self):
        # user: {suites: ..., blobs: ..., clips ... }
        # called by getAndSetFreshUserDataMaps
        pass

    def test_create(self):
        pass

    def test_delete(self):
        pass


class SeedsSuiteAPITests(TestCase):
    def test_unauthenticated_suite_all_methods(self):
        # create, read, update, destroy
        # 403 forbidden + message
        pass

    def test_create(self):
        pass

    def test_read(self):
        # called within user detail
        pass

    def test_update(self):
        pass

    def test_delete(seld):
        pass


class SeedsBlobAPITests(TestCase):
    def test_unauthenticated_blob_all_methods(self):
        # create, read, update, destroy
        # 403 forbidden + message
        pass

    def test_create(self):
        # called by onCreateBlob
        pass

    def test_read(self):
        # called within user detail
        pass

    def test_update(self):
        pass

    def test_delete(seld):
        pass


class SeedsAudioClipAPITests(TestCase):
    def test_unauthenticated_audioclip_all_methods(self):
        # create, read, update, destroy
        # 403 forbidden + message
        pass

    def test_create(self):
        # called by onCreateClip
        # try invalid, then valid post
        pass

    def test_read(self):
        # called within user detail
        pass

    def test_update(self):
        # called by onEditClip
        pass

    def test_delete(self):
        # delete audioclip, say it's okay
        pass
