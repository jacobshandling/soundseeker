from typing import *
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from rest_framework import viewsets, permissions
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response

from backend.seeds.serializers import SuiteSerializer, UserSerializer

from .models import User, Suite
from .serializers import SuiteSerializer

def index(request):
    return render(request, 'seeds/index.html')

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            # TODO: modify below line to work with REST / frontend setup
            return HttpResponseRedirect(reverse("index"))
        else:
            # TODO: modify below to work with REST / frontend setup
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else: 
        # TODO: modify below to work with REST / frontend setup
        return render(request, "auctions/login.html")

def logout_view(request):
    logout(request)
    # TODO: modify below to work with REST / frontend setup
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            # TODO: modify below to work with REST / frontend setup
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            # TODO: modify below to work with REST / frontend setup
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        # TODO: modify below to work with REST / frontend setup
        return HttpResponseRedirect(reverse("index"))
    else:
        # TODO: modify below to work with REST / frontend setup
        return render(request, "auctions/register.html")

# API

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    Automatically provides 'list' and 'retrieve' actions
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SuiteViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Suite.objects.all()
    serializer_class = SuiteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# TODO: Implement viewsets for remaining models