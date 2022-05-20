# [SoundSeeker](https://www.soundseeker.app)
A tool for organizing and juxtaposing musical ideas in the form of short audio recordings. [Watch a short demo](https://youtu.be/_Qm0abmDYak).

## Why? A problem that needed solving:

The process of composing music is different for everyone, yet there exist some techniques and practices employed by many musicians. One such practice is that of recording a short clip on one's phone at the time the musical idea is first thought of. This allows the composer to capture many what would otherwise be fleeting ideas in a moment, simply by singing or playing it into their phone. However, this often leads to a lengthy catalogue of new idea recordings, organized chronoligically, that can be difficult to keep track of. Soundseeker allows the storage of these musical ideas not in chronological order, but in groupings that share some subjective relationship in the composer's mind.

## How

In Soundseeker, musical ideas exist on three levels:
1. Suites - the highest level of idea, a suite represents an overall concept, such as for an album. Suites contain blobs.
2. Blobs - a blob might represent the makings of an idea that's larger than one musical theme, but smaller than the overall picture, such as a song. Blobs contain audioclips.
3. Audioclips - an audioclip represents the most granular form of musical idea. This represents something like a single musical phrase, bass line, rhythm. Something a composer might think of while walking down the street and sing into their phone.

You can associate an audioclip with different blobs, and a blob with different suites. One small idea (audioclip) might be an element to be included in multiple songs (blobs). You can mix and match however you find useful for your compositional process!

## Soundseeker is built with:
- Django and Django REST Framework
- React, Javascript
- HTML, Vanilla CSS
- PostgreSQL
- Webpack

## and deployed using:
- Heroku
- AWS S3
