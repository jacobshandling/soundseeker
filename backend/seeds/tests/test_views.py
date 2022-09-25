# TODO: 2 scoops recommends using django.test.client.RequestFactory to generate requests
# because it "provides greater amount of isolation than the standard Django test client"

from django.test import TestCase
from django.urls import reverse


class IndexTests(TestCase):
    def test_successful_url(self):
        response = self.client.get(reverse("index"))
        self.assertEqual(response.status_code, 200)


class RegisterTests(TestCase):
    # user unauthenticated
    def test_success_if_unauthenticated(self):
        response = self.client.get(reverse("register"))
        self.assertEqual(response.status_code, 200)

    def test_redirect_to_index_if_authenticated(self):
        pass


class AccountsLoginTests(TestCase):
    # user not authenticated (normal)
    def test_success(self):
        pass

    def test_authenticate_and_redirect_to_index_on_post_correct_credentials(self):
        pass

    def test_fail_and_message_on_post_incorrect_credentials(self):
        pass

    # user already authenticated (strange)
    def test_redirect_to_index_if_already_authenticated(self):
        pass


class AccountsLogoutTests(TestCase):
    # user not authenticated (strange)
    def test_redirect_to_login_if_not_authenticated(self):
        pass

    # user is authenticated (normal)
    def test_successful_logout(self):
        pass
