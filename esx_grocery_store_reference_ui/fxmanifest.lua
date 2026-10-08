fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Jube'
description 'Grocery shop UI reference with player name, inventory usage and ox style action buttons'
version '1.0.0'

ui_page 'html/index.html'

shared_scripts {
    'config.lua'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}

dependency 'es_extended'
