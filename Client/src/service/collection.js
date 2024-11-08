const server_url = "http://localhost:7000";

export async function getCollection(category) {
  try {
    const response = await fetch(
      `${server_url}/api/v1/project/projects/${category}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Retrieve error message from the response
      throw new Error(`Failed to fetch collection: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getCollection:", error);
    throw error; // re-throw the error to handle it in the calling function
  }
}
