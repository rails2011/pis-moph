class CreateCodeAmphurs < ActiveRecord::Migration
  def self.up
    create_table :code_amphurs do |t|
      t.integer  :amcode
      t.integer  :provcode      
      t.string   :shortpre
      t.string   :longpre
      t.string   :amname
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_amphurs
  end
end
