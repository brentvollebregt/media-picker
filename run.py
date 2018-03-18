import eel
import utils

eel.init('web')

@eel.expose
def selectInputFolder():
    return utils.selectInputFolder()

@eel.expose
def selectOutputFolder():
    return utils.selectOutputFolder()

# TODO Request for an input file if arg not provided (halt)

eel.start('main.html', options={'mode': "chrome"})

# TODO When wanting to export, as where to save
