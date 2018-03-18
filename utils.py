from tkinter.filedialog import askdirectory
from tkinter import Tk

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