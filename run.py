import base64
import sys
import os
import io
import eel
import utils
from PIL import Image

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
            with open(os.path.join(root, name), "rb") as image_file:
                file_contents = image_file.read()
                encoded_string = base64.b64encode(file_contents)
                image = Image.open(io.BytesIO(file_contents))
                image.thumbnail((200, 300))
                buffered = io.BytesIO()
                image.save(buffered, format="PNG")
                supported_files[str(current_id)]['base64'] = encoded_string.decode('utf-8')
                supported_files[str(current_id)]['base64_thum'] = base64.b64encode(buffered.getvalue()).decode('utf-8')

            current_id += 1

eel.init('web')

@eel.expose
def getImageData():
    return supported_files

@eel.expose
def export(items):
    output = utils.selectOutputFolder()
    # TODO Move


eel.start('main.html', options={'mode': "chrome"})

# TODO When wanting to export, as where to save
