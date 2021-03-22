/**
 * UTILITY TO READ FILES FROM ALL FOLDERS LISTED
 * https://stackoverflow.com/a/62371090
 * 
 * returns a 
 */

const fs = require('fs')
const util = require('util')
const path = require('path')

// Multiple folders list
const in_dir_list = [
  '../assets/dungeon/LowRes',
  '../assets/dwarven_tomb/LowRes',
  '../assets/forgotten_temple/LowRes',
  '../assets/wizard_workshop/LowRes'
]

// BEST PRACTICES: (1) Faster folder list For loop has to be outside async_capture_callback functions for async to make sense
//                 (2) Slower Read Write or I/O processes best be contained in an async_capture_callback functions because these processes are slower than for loop events and faster completed items get callback-ed out first 

for (i = 0; i < in_dir_list.length; i++) {
  var in_dir = in_dir_list[i]

  // function is created (see below) so each folder is processed asynchronously for readFile_async that follows
  readdir_async_capture(in_dir, function(files_path) {
    console.log("Processing folders asynchronously ...")

    for (j = 0; j < files_path.length; j++) {
      file_path = files_path[j]
      file = file_path.substr(file_path.lastIndexOf("/") + 1, file_path.length)

      // function is created (see below) so all files are read simultaneously but the smallest file will be completed first and get callback-ed first 
      readFile_async_capture(file_path, file, function(file_string) {
        try {
          console.log(file_path)
          console.log(file_string)
        } catch (error) {
          console.log(error)
          console.log("System exiting first to catch error if not async will continue...")
          process.exit()
        }
      })
    }
  })
}

// fs.readdir async_capture function to deal with asynchronous code above
function readdir_async_capture(in_dir, callback) {
  fs.readdir(in_dir, function(error, files) {
    if (error) { return console.log(error) }
    files_path = files.map(function(x) { return path.join(in_dir, x) })
    callback(files_path)
  })
}

// fs.readFile async_capture function to deal with asynchronous code above
function readFile_async_capture(file_path, file, callback) {
  fs.readFile(file_path, function(error, data) {
    if (error) { return console.log(error) }
    file_string = data.toString()
    callback(file_string)
  })
}