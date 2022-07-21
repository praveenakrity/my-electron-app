function menutemplate(app) {
  return menuTemplate = [
    {
        label: 'File',
        submenu: [{
          label: 'Add Item',
        },
        {
          label: 'Clear Items',
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ],
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: "Cut"
          },
          {
            label: "Copy"
          },
          {
            label: "Paste"
          },
          {
            type: "separator"
          },
          {
            label: "Delete"
          }
      ]
      },
      {
        label: 'View',
        submenu: [{
          label: "View Page"
        },
        {
          label: "View User details"
        },{
          label: "View Page in Read-Mode"
        }
      ]
      }
    ]
}


    module.exports = {
      menutemplate
    }