from flask import Flask, render_template, send_from_directory
import sys
import utils
import webbrowser

images = {}

# Get Args
input_folder = ''
if len(sys.argv) > 1:
    image_files = utils.getFilesFromDirectory(sys.argv[1])
    utils.addImagesToDict(images, image_files)

app = Flask(__name__, static_url_path='')

@app.route("/")
def rootRoute():
    return render_template('main.html')

@app.route('/image/<id>')
def getImageRoute(id):
    return ''
    # return send_from_directory()

@app.route('/selectDirectory/')
def selectDirectoryRoute(id):
    directory = utils.selectDirectory()
    return ''
    # return send_from_directory()

@app.route('/selectFiles/')
def selectFilesRoute(id):
    directory = utils.selectFiles()
    return ''
    # return send_from_directory()


if __name__ == '__main__':
    import socket
    ip = socket.gethostbyname(socket.gethostname())
    port = 8080
    webbrowser.open('http://' + ip + ':' + str(port) + '/', new=2, autoraise=True)
    print("Site starting on http://" + ip + ":" + str(port))
    app.run(host=ip, port=port, debug=True)
