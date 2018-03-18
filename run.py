import sys
import os
import eel
import utils

supported_exenstions = ['.jpg', '.jpeg', '.png']

# Get Args
input_folder = ''
if len(sys.argv) > 1:
    input_folder = sys.argv[1]

# Make sure we have an input folder
if not os.path.isdir(input_folder):
    input_folder = utils.selectInputFolder()

# Get files and other info
supported_files = {} # id:{filename, ...}
current_id = 1
for root, dirs, files in os.walk(input_folder, topdown=False):
    for name in files:
        if os.path.splitext(name)[1] in supported_exenstions:
            supported_files[str(current_id)] = {
                'file' : os.path.join(root, name)
            }
            current_id += 1

eel.init('web')

@eel.expose
def selectOutputFolder():
    return utils.selectOutputFolder()


eel.start('main.html', options={'mode': "chrome"})

# TODO When wanting to export, as where to save
