# [SoundSeeker](https://www.soundseeker.app)
A tool for organizing and juxtaposing musical ideas in the form of short audio recordings.
[Watch a demo](https://youtu.be/p5JG3c3R2dA).

## Why? A problem that needed solving:

Composing music is different for everyone, yet some practices are employed by many musicians. One such practice is to record a musical idea on a phone, capturing the idea at its freshest, and for many, clearest. This often leads to a lengthy catalogue of chronologically organized recordings that can be difficult to parse when sitting down to flesh out a piece of music – what matters isn't when the idea was from, but the content of the idea. SoundSeeker allows you to organize musical ideas based on their content instead of when they came to be.

## How

In Soundseeker, there are 3 scopes of organization:
1. Suites - the highest level, a suite represents an overall concept, such as for an album. Suites contain blobs.
2. Blobs - a blob might represent the makings of an idea that's larger than one musical theme, but smaller than the overall picture, such as a song. Blobs contain audioclips.
3. Audioclips - an audioclip represents the most granular form of musical idea. This represents something like a single musical phrase, bass line, rhythm. Something a composer might sing into their phone right before tripping over a curb.

You can associate an audioclip with different blobs, and a blob with different suites. One small idea (audioclip) might be included in multiple songs (blobs). Mix and match however you find useful for your compositional process. For example:

<img alt="Example diagram of how Suites, Blobs, and Clips relate in SoundSeeker, and of how one might use them" src="https://user-images.githubusercontent.com/61553566/192453921-ef83fa42-2195-49a6-a7de-7f5b9edeb14a.png">

## Soundseeker is built with:

- Django and Django REST Framework
- React, Javascript
- HTML, Vanilla CSS
- PostgreSQL
- Webpack

## and deployed using:
- Heroku
- AWS S3
