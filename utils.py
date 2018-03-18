from tkinter.filedialog import askdirectory
from tkinter import Tk

import PIL.ExifTags
from PIL import ExifTags

def selectInputFolder():
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    folder = askdirectory(parent=root)
    return folder

def selectOutputFolder():
    pass

def moveMedia(src, items, dest):
    # items - src -> dest
    pass

def parseExifData(data):
    exif = {
        ExifTags.TAGS[k]: v
        for k, v in data.items()
        if k in ExifTags.TAGS
    }
    return_exif = {}
    if 'Model' in exif:
        return_exif['model'] = exif['Model']
    else:
        return_exif['model'] = ''
    if 'DateTime' in exif:
        return_exif['date'] = exif['DateTime']
    else:
        return_exif['date'] = ''

    return return_exif
