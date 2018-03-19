# Media Picker
Easily chose which media files to keep in a folder with a simple interface.


# TODO
- Click on image enlarges to whole window (allow for zoom?)
- Click on right/left side of image to go to next
- Ping server to stay awake, 20 shutdown

- Buttons
    - Add files
    - Clear Files -> Clear files in memory, refresh the bar and remove image
    - Clear choices -> Set everything to blue
    - Set output -> Select output, default is output/
    - View output -> Open current output
    - Export (copy) -> copy to new dir
    - Export (move) -> same as above but more

- Second select items:
    - Add files:
        - Add Files
        - Add directory
    - Clear:
        - Files
        - Choices
    - Export:
        - Copy
        - Move

- From Previous:
'size' : round(os.path.getsize(os.path.join(root, name)) / 1000000, 2)