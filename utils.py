from tkinter.filedialog import askdirectory, askopenfilenames
from tkinter import Tk
import os

supported_exenstions = ['.jpg', '.jpeg', '.png']

def selectDirectory():
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    directory = askdirectory(parent=root)
    return directory

def selectFiles():
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    files = askopenfilenames(parent=root, initialdir="/", title="Select file", filetypes=(("jpeg files", "*.jpg"), ("all files", "*.*")))
    return root.tk.splitlist(files)

def selectOutputFolder():
    pass

def getFilesFromDirectory(directory):
    file_list = []
    for root, dirs, files in os.walk(directory, topdown=False):
        for name in files:
            if os.path.splitext(name)[1] in supported_exenstions:
                file_list.append(os.path.join(root, name))
    return file_list

def addImagesToDict(image_dict, images):
    if len(image_dict) > 0:
        next_value = max([int(i) for i in image_dict]) + 1
    else:
        next_value = 1
    files = [image_dict[i]['location'] for i in image_dict]
    for image in images:
        if image not in files:
            image_dict[str(next_value)] = {
                'location' : image
            }
            next_value += 1

def moveMedia(src, items, dest):
    # items - src -> dest
    pass

def test(images, item):
    images[item] = 5
