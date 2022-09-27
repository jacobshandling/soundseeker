# TODO: 2 scoops recommends using django.test.client.RequestFactory to generate requests
# because it "provides greater amount of isolation than the standard Django test client"

from django.http import HttpResponseRedirect
from django.test import TestCase
from django.urls import reverse


class IndexTests(TestCase):
    def test_successful_url(self):
        response = self.client.get(reverse("index"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "text/html; charset=utf-8")


class RegisterTests(TestCase):
    # user unauthenticated
    def test_success_if_unauthenticated(self):
        response = self.client.get(reverse("register"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "text/html; charset=utf-8")

    def test_login_and_redirect_to_index_on_post_valid_credentials(self):
        # use Mock here, so doesn't actually create user in the test DB
        # csrf check is disabled in test client by default
        url = reverse("register")

        # client should have no user id when logged out
        self.assertIsNone(self.client.session.get("_auth_user_id"))
        response = self.client.post(
            url,
            {
                "username": "test_user",
                "email": "test@user.com",
                "password": "supersecure",
                "confirmation": "supersecure",
            },
        )

        self.assertEqual(response.status_code, 302)
        self.assertTrue(type(response), HttpResponseRedirect)
        self.assertEqual(response.headers["Location"], "/")
        self.assertEqual(response.headers["Content-Type"], "text/html; charset=utf-8")

        # after registration, client should have a digit string user id
        client_uid = self.client.session.get("_auth_user_id")
        self.assertIsInstance(client_uid, str)
        self.assertTrue(client_uid.isdigit())

    # strange cases

    # shouldn't occur - UI should never present registration option when authenticated
    def test_redirect_to_index_if_already_authenticated(self):
        pass

    # frontend validation should prevent this from occuring
    def test_error_on_post_invalid_credentials(self):
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
