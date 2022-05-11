from rest_framework import serializers
from seeds.models import *

# https://www.django-rest-framework.org/api-guide/serializers/#dealing-with-nested-objects

class AudioClipSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username') 

    class Meta:
        model = AudioClip
        fields = ['url', 'id', 'owner', 'name', 'file']

class BlobSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Blob
        fields = ['url', 'id', 'owner', 'name', 'clips']

class SuiteSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Suite
        fields = ['url', 'id', 'owner', 'name', 'blobs']

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class LabelSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Label
        fields = ['url', 'id', 'name', 'owner', 'clips', 'blobs', 'suites']