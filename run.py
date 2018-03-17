import eel
import utils

eel.init('web')

@eel.expose
def selectInputFolder():
    return utils.selectInputFolder()

@eel.expose
def selectOutputFolder():
    return utils.selectOutputFolder()

eel.start('main.html', size=(650, 612))