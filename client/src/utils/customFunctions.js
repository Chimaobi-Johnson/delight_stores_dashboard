export const convertCloudinaryImagetoId = (image) => {
    const location = image.split("/").slice(-3)[0];
    const subLocation = image.split("/").slice(-2)[0];
    const id = image.split("/").pop().split(".")[0];
    return `${location}/${subLocation}/${id}`;
}