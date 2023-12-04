async function readFile(filename) {
    try {
      const response = await fetch(filename);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      return text.trim(); // Trim any leading/trailing whitespaces
    } catch (error) {
      console.error('Error reading the file:', error);
      throw error; // Rethrow the error for further handling
    }
  }