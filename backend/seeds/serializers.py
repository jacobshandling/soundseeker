from rest_framework import serializers
from seeds.models import *

# https://www.django-rest-framework.org/api-guide/serializers/#dealing-with-nested-objects

class AudioClipSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username') 
    class Meta:
        model = AudioClip
        fields = ['url', 'id', 'owner', 'name', 'file', 'blobs']

class BlobSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    clips = AudioClipSerializer(many=True, required=False)
    
    class Meta:
        model = Blob
        fields = ['url', 'id', 'owner', 'name', 'clips', 'suites']

class SuiteSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user.id')
    blobs = BlobSerializer(many=True)

    class Meta:
        model = Suite
        fields = ['url', 'id', 'owner', 'name', 'blobs']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    # user_suites = serializers.HyperlinkedRelatedField(many=True, view_name='suite-detail', read_only=True)
    user_suites = SuiteSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'user_suites']


class LabelSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Label
        fields = ['url', 'id', 'name', 'owner', 'clips', 'blobs', 'suites']