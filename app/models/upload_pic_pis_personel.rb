class UploadPicPisPersonel < ActiveRecord::Base  
  def self.save(upload,name)
    ext =  File.extname(upload.original_filename)
    directory = "public/images/pis_personel"
    @path = File.join(directory, name+ext)
    File.open(@path, "wb") { |f| f.write(upload.read) }
  end
end
