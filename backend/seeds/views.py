import os
from django.contrib.auth import login
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import User


@ensure_csrf_cookie
def index(request):
    whereami = (
        "prod"
        if os.getenv("DJANGO_SETTINGS_MODULE") == "config.settings.prod"
        else "dev"
    )
    return render(request, "seeds/index.html", {"whereami": whereami})


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request,
                "registration/register.html",
                {"message": "Passwords must match."},
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            # TODO: modify below to work with REST / frontend setup
            return render(
                request,
                "registration/register.html",
                {"message": "Username already taken."},
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "registration/register.html")
