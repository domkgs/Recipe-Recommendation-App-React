function signchecker() {  
  const token = localStorage.getItem('token');
  if (token == null || token == '') {
    return false;
  } else {
    return true;
  }
};

export default signchecker;