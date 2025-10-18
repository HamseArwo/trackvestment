export default async function Validate() {
  try {
    const response = await fetch("http://localhost:8080/validate", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
    // const status = response.status;
    // return status;
  } catch (error) {
    console.error(error);
    return false;
  }
}
