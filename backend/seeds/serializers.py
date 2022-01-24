from rest_framework import serializers
from seeds.models import *

# https://www.django-rest-framework.org/api-guide/serializers/#dealing-with-nested-objects

class AudioClipSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = AudioClip
        fields = ['url', 'id', 'user', 'name', 'file']

class BlobSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    clips = AudioClipSerializer(many=True, required=False)
    
    class Meta:
        model = Blob
        fields = ['url', 'id', 'user', 'name', 'clips']

class SuiteSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user.id')
    blobs = BlobSerializer(many=True)

    class Meta:
        model = Suite
        fields = ['url', 'id', 'user', 'name', 'blobs']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    # user_suites = serializers.HyperlinkedRelatedField(many=True, view_name='suite-detail', read_only=True)
    user_suites = SuiteSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'user_suites']


class LabelSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Label
        fields = ['url', 'id', 'name', 'user', 'clips', 'blobs', 'suites']