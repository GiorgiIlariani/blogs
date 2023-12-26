import { token } from "./accessToken";

export const postCategories = async ({ title, description, image, publish_date, author, categories, email }: any) => {
    console.log(token);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    try {
        // Append the binary string to the FormData
        if (image instanceof Blob) {
            formData.append('image', image);
        } else {
            throw new Error('Image must be a valid Blob object.');
        }

        formData.append('publish_date', publish_date);
        formData.append('author', author);

        // Check if 'categories' is an array and not empty before appending
        if (Array.isArray(categories) && categories.length > 0) {
            formData.append('categories', JSON.stringify(categories));
        } else {
            throw new Error('Categories field is missing or empty.');
        }

        formData.append('email', email);

        const response = await fetch('https://api.blog.redberryinternship.ge/api/blogs', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to create blog. Status: ${response.status}`);
        }

        return true; // Blog creation successful
    } catch (error: any) {
        console.error('Error creating blog:', error.message);
        return false; // Blog creation failed
    }
};
