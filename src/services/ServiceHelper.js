export function checkHttpStatus(response) {
    // console.log('---------------',response)
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      console.log('---------------', response);
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  export function parseJSON(response) {
    return response.data;
  }