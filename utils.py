import sys
import os
from shutil import copyfile
if sys.version_info.major >= 3:
    from tkinter import Tk
    from tkinter.filedialog import askdirectory, askopenfilenames
else:
    from Tkinter import Tk
    from Tkinter.filedialog import askdirectory, askopenfilenames

supported_extensions = ['.jpg', '.jpeg', '.png']

def selectDirectory():
    """ Opens a select directory dialog and returns the path selected """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    directory = askdirectory(parent=root)
    return directory

def selectFiles():
    """ Opens a select files dialog and returns the files selected """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    files = askopenfilenames(parent=root, initialdir="/", title="Select file", filetypes=(("jpeg files", "*.jpg"), ("all files", "*.*")))
    return root.tk.splitlist([file.replace('/', '\\') for file in files])

def getFilesFromDirectory(directory):
    """ Gets files with supported file extensions within a directory """
    file_list = []
    for root, dirs, files in os.walk(directory.replace('/', '\\'), topdown=False):
        for name in files:
            if os.path.splitext(name)[1] in supported_extensions:
                file_list.append(os.path.join(root, name))
    return file_list

def addImagesToDict(image_dict, images):
    """ Adds a new image to a dictionary object. image_dict[next_index] = {'location' : location...}"""
    if len(image_dict) > 0:
        next_value = max([int(i) for i in image_dict]) + 1
    else:
        next_value = 1
    files = [image_dict[i]['location'] for i in image_dict]
    for image in images:
        if image not in files:
            image_dict[str(next_value)] = {
                'location' : image,
                'size': round(os.path.getsize(image) / 1000000, 2)
                # TODO Get date and model
            }
            next_value += 1

def copyMedia(items, dest):
    """ Copies files from their location to a new destination """
    for file in items:
        filename = os.path.basename(file)
        copyfile(file, dest + '\\' + filename)

def moveMedia(items, dest):
    """ Moves files from their location to a new destination """
    for file in items:
        filename = os.path.basename(file)
        os.rename(file, dest + '\\' + filename)
