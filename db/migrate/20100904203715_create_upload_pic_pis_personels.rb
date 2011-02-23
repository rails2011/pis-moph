class CreateUploadPicPisPersonels < ActiveRecord::Migration
  def self.up
    create_table :upload_pic_pis_personels do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :upload_pic_pis_personels
  end
end
