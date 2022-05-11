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
    user_suites = SuiteSerializer(many=True, required=False)
    user_blobs = BlobSerializer(many=True, required=False)
    user_clips = AudioClipSerializer(many=True, required=False)
    
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'user_suites', 'user_blobs', 'user_clips']


class LabelSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Label
        fields = ['url', 'id', 'name', 'owner', 'clips', 'blobs', 'suites']