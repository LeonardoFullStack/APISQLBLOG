export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', `${process.env.CLOUD_PASS}`)
    const options = {
      method: 'POST',
      body: formData
    }
  
    try {
      const petition = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_ID}/image/upload`, options)
      const json = await petition.json()
  
      return json.url
    } catch (error) {
      return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
    }
  }
  