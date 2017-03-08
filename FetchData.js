//FetchData.js//

const api = window.ModuleApi;


function fetchData(params, progress, callback) {
  //Do nothing for now
  //TODO: Remove the requirement of a fetchData for sub modules
  progress(100);
  callback();
}


module.exports = fetchData;
