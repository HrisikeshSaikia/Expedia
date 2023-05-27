const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({ 
    cloud_name: 'dtnht8rch', 
    api_key: '738364385327756', 
    api_secret: '-sdxxnhOMT475CIqlMm0wjR8_Q4'
    
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'HOTELFINDER',
      allowedFormat: ['png', 'jpg', 'jpeg'],
      public_id: (req, file) => 'computed-filename-using-request',
    },
  });

  module.exports={
    cloudinary,
    storage

  };