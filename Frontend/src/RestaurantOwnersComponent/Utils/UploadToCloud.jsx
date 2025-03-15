import {CLOUD_NAME, UPLOAD_PRESET} from "../../CONFIG";

const upload_preset = UPLOAD_PRESET;
const cloud_name = CLOUD_NAME;
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloud = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const response = await fetch(api_url, {
        method: "post",
        body: data
    });

    const fileData = await response.json();
    return fileData.url;
};
