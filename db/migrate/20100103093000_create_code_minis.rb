class CreateCodeMinis < ActiveRecord::Migration
  def self.up
    create_table :code_minis do |t|
      t.integer :mincode
      t.string  :minname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_minis
  end
end