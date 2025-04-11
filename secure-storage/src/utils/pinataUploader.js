// src/utils/pinataUploader.js

export async function uploadToPinata(file) {
  const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

  if (!PINATA_JWT) {
    throw new Error("Missing Pinata JWT in environment variables.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });

  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });

  formData.append("pinataOptions", options);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Upload failed: ${res.status} ${errorBody}`);
  }

  const data = await res.json();
  return data; // includes IpfsHash, PinSize, Timestamp, etc.
}
