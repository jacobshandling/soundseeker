from rest_framework import serializers
from seeds.models import AudioClip, Blob, Suite, User

# https://www.django-rest-framework.org/api-guide/serializers/#dealing-with-nested-objects

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
