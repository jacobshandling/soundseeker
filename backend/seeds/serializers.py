from rest_framework import serializers
from seeds.models import User, Suite, Blob, AudioClip

class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')
    class Meta:
        model = Snippet
        fields = ['url', 'id', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style']

class AudioClipSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    file = serializers.HyperlinkedIdentityField(view_name='audio-file', format='mp3')  # TODO: How to server audio ?!
    
    class Meta:
        model = AudioClip
        fields = ['url', 'id', 'user', 'name', 'file']

class BlobSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Blob
        fields = ['url', 'id', 'user', 'name', 'clips']

class SuiteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Suite
        fields = ['url', 'id', 'user', 'name', 'blobs']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    suites = serializers.HyperlinkedRelatedField(many=True, view_name='suite-detail', read_only=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'user_suites']
