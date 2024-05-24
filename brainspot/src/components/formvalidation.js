// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
// Validate password format

export const isValidPassword = (password) => {
    if (password.length < 8) {
      return { valid: false, reason: 'short' };
    }
  
    let hasNumber = false;
    let hasSpecialCharacter = false;
  
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
  
      if (!isNaN(parseInt(char))) {
        hasNumber = true;
      }
  
      if (
        char === '!' ||
        char === '@' ||
        char === '#' ||
        char === '$' ||
        char === '%' ||
        char === '^' ||
        char === '&' ||
        char === '*'
      ) {
        hasSpecialCharacter = true;
      }
  
      if (hasNumber && hasSpecialCharacter) {
        return { valid: true };
      }
    }
  
    return { valid: false, reason: 'format' };
  };
  

  // Validate username length
export const isValidUsername = (username) => {
    return username.length >= 6;
  };