class CreateCodeTumbons < ActiveRecord::Migration
  def self.up
    create_table :code_tumbons do |t|
      t.integer  :tmcode
      t.integer  :amcode
      t.integer  :provcode      
      t.string   :shortpre
      t.string   :longpre
      t.string   :tmname
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user
      t.timestamps            
    end
  end

  def self.down
    drop_table :code_tumbons
  end
end
