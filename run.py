import datetime
from flask import Flask, render_template, send_from_directory, jsonify, request
import os
import sys
import time
import threading
import webbrowser
from shutil import copyfile
from PIL import Image
if sys.version_info.major >= 3:
    from tkinter import Tk
    from tkinter.filedialog import askdirectory, askopenfilenames
else:
    from Tkinter import Tk
    try:
        from Tkinter.filedialog import askdirectory, askopenfilenames
    except:
        from tkFileDialog import askdirectory as askdirectory
        from tkFileDialog import askopenfilenames as askopenfilenames


supported_extensions = ['.jpg', '.jpeg', '.png', '.svg', '.bmp', '.ico', '.gif']


def select_directory():
    """ Opens a select directory dialog and returns the path selected """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    directory = askdirectory(parent=root)
    return directory


def select_files():
    """ Opens a select files dialog and returns the files selected """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    files = askopenfilenames(parent=root,
                             title="Select file",
                             filetypes=(("Image files", '*' + ';*'.join(supported_extensions)), ("all files", "*.*"))
                             )
    return root.tk.splitlist(files)


def get_files_from_directory(directory):
    """ Gets files with supported file extensions within a directory """
    file_list = []
    for root, dirs, files in os.walk(directory.replace('/', '\\'), topdown=False):
        for name in files:
            if os.path.splitext(name)[1] in supported_extensions:
                file_list.append(os.path.join(root, name))
    return file_list


def add_images_to_dict(image_dict, image_list):
    """ Adds a new image to a dictionary object. image_dict[next_index] = {'location' : location...}"""
    if len(image_dict) > 0:
        next_value = max([int(i) for i in image_dict]) + 1
    else:
        next_value = 1
    files = [image_dict[i]['location'] for i in image_dict]
    for image in image_list:
        if image not in files:
            image_dict[str(next_value)] = {
                'location' : image,
                'size' : round(os.path.getsize(image) / 1000000, 2),
                'date' : get_exif(image, 'date'),
                'model' : get_exif(image, 'model')
            }
            next_value += 1


def get_exif(file, data):
    try: # Also handles if exif is not None
        exif = Image.open(file)._getexif()
        if data == 'date' and 36867 in exif:
            return exif[36867]
        if data == 'model' and 272 in exif:
            return exif[272]
    except:
        pass
    return 'N/A'


def copy_media(items, dest):
    """ Copies files from their location to a new destination """
    for file in items:
        filename = os.path.basename(file)
        copyfile(file, dest + '\\' + filename)


def move_media(items, dest):
    """ Moves files from their location to a new destination """
    for file in items:
        filename = os.path.basename(file)
        os.rename(file, dest + '\\' + filename)


images = {}

# Get Args
input_folder = ''
if len(sys.argv) > 1:
    image_files = get_files_from_directory(sys.argv[1])
    add_images_to_dict(images, image_files)


class PingThread(threading.Thread):
    timeout = 0
    EXTEND_TIME = 60

    def __init__(self):
        super(PingThread, self).__init__()
        self.refresh()

    def run(self):
        while True:
            if datetime.datetime.now() > self.timeout:
                print ("No client found, shutting server down")
                os._exit(0)
            time.sleep(5)

    def refresh(self):
        self.timeout = datetime.datetime.now() + datetime.timedelta(0, self.EXTEND_TIME)

app = Flask(__name__, static_url_path='')

@app.route('/')
def rootRoute():
    return render_template('main.html')

@app.route('/getImages')
def getImagesRoute():
    return jsonify(images)

@app.route('/image<id>')
def getImageRoute(id):
    directory, filename = os.path.split(images[id]['location'])
    return send_from_directory(directory, filename)

@app.route('/selectDirectory')
def selectDirectoryRoute():
    directory = select_directory()
    files = get_files_from_directory(directory)
    add_images_to_dict(images, files)
    return jsonify(images)

@app.route('/selectFiles')
def selectFilesRoute():
    files = select_files()
    add_images_to_dict(images, files)
    return jsonify(images)

@app.route('/clearImages')
def clearImagesRoute():
    images.clear()
    return jsonify(images)

@app.route('/exportCopy', methods=['POST'])
def exportCopyRoute():
    items = request.json
    try:
        output_dir = select_directory()
        file_locations = [images[i]['location'] for i in items]
        copy_media(file_locations, output_dir)
    except Exception as e:
        return jsonify({'success': False, 'message' : str(e)})
    return jsonify({'success': True})

@app.route('/exportMove', methods=['POST'])
def exportMoveRoute():
    items = request.json
    try:
        output_dir = select_directory()
        file_locations = [images[i]['location'] for i in items]
        move_media(file_locations, output_dir)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    return jsonify({'success': True})

@app.route('/ping')
def pingRoute():
    pingThread.refresh()
    return jsonify({'success': True})

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

pingThread = PingThread()
pingThread.start()
ip = "127.0.0.1"
port = 8080
webbrowser.open('http://' + ip + ':' + str(port) + '/', new=2, autoraise=True)
print("Site starting on http://" + ip + ":" + str(port))
app.run(host=ip, port=port)
