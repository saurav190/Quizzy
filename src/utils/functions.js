export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
       
  
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result 
          resolve(base64String);
        };
        reader.onerror = (event) => {
          console.error('Error reading file:', event.target?.error);
          reject(event.target?.error || new Error('Error reading file'));
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
  };
  
