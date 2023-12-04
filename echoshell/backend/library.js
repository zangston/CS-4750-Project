function viewLibrary(libType, username) {
    const dataToSend = {
        key1: libType,
        key2: username
    };
    fetch('backend/get-library.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the PHP backend
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    // var type = libType
    // var user = username
    // $.ajax({
    //     url:"get-library.php",    //the page containing php script
    //     method: "POST",    //request type,
    //     data: {type, user},
    //     success: function(){
    //         alert('success');
    //     }
    // });
}

// function getLib(libType, username) {
//     if ()
// }