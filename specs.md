# soundseeker
A tool for organizing musical ideas

## **Specifications**


### **frontend**
---
- Homepage
  - If user is not logged in:
    - welcome them
    - prompt them to either create a user account or log in
  - If the user is logged in:
    - Bring up the **seeds** app:
      - Displays:
        -  a grid of cards
           -  each card corresponds to an audio clip. On each card, be able to:
              -  play the clip
              -  add a tag to the clip
              -  add the clip to an existing or new "blob" (grouping of clips that might go together in a composition)
              -  delete the clip
        -  an option to upload a new clip
        - a set of filters:
          - by tag(s)
          - by blob(s)

### **backend**
---
- Models:
  - Clip
  - Tag
  - User
  - Blob
  - Suite
- Audio files stored on disk (not in DB), with reference to filepaths in db