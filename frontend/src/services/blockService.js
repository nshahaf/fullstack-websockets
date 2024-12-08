
const block =
  `
// Simulate fetching user data from an API
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Change this to false to simulate an error
      if (success) {
        resolve({ id: 1, name: 'John Doe' });
      } else {
        reject('Failed to fetch user data');
      }
    }, 2000);
  });
}

// Implement the "getUserData" async function below
async function getUserData() {
  try {
    // Complete the code: Use await to get the result from fetchUserData
    const user = ____;  // Fill in the blank
    console.log(user);  // Log the fetched user data
  } catch (error) {
    console.error(error);  // Handle errors
  }
}

// Call the function to test the implementation
getUserData();`

export const fetchCodeBlock = async (blockName) => {

  return Promise.resolve(block);
  try {
    const response = await fetch(`http://localhost:3000/codeblock/${blockName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching block:', error);
    return 'No data'
  }
};