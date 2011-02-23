class CreateCodeSdtypes < ActiveRecord::Migration
  def self.up
    create_table :code_sdtypes do |t|
      t.integer :sdtcode
      t.string  :sdtname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_sdtypes
  end
end