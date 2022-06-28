from rest_framework import serializers
from seeds.models import *

class AudioClipSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username') 

    class Meta:
        model = AudioClip
        fields = ['id', 'url', 'owner', 'name', 'file', 'blobs']

class BlobSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Blob
        fields = ['id', 'url', 'owner', 'name', 'clips', 'suites']

class SuiteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Suite
        fields = ['id', 'url', 'owner', 'name', 'blobs']

class UserSerializer(serializers.ModelSerializer):
    user_suites = SuiteSerializer(many=True, required=False)
    user_blobs = BlobSerializer(many=True, required=False)
    user_clips = AudioClipSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'user_suites', 'user_blobs', 'user_clips']


class LabelSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Label
        fields = ['id', 'url', 'name', 'owner', 'clips', 'blobs', 'suites']