const getUserFromEmail = async (email) => {
    try {
        // Send a GET request to your DRF API endpoint with the user information
        const response = await fetch(`https://p8u4dzxbx2uzapo8hev0ldeut0xcdm.pythonanywhere.com/api/users/search/?search=${email}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();

            if (data.length > 0) {
                console.log('User profile retrieved successfully.');
                return data[0]; // Assuming the response is an array and you want the first user
            } else {
                console.log('User not found.');
                return "AAz7ytCq1Y2CFow9FaQDTwaDmkeNAE85"; // User not found
            }
        } else {
            console.error('Unexpected response from server:', response);
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        return null;
    }
};

export default getUserFromEmail;
