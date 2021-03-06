class CreateCodeSdepts < ActiveRecord::Migration
  def self.up
    create_table :code_sdepts do |t|
      t.integer  :sdcode
      t.string   :shortpre
      t.string   :longpre
      t.string   :sdname
      t.decimal  :sdtcode
      t.decimal  :sdgcode
      t.decimal  :acode
      t.decimal  :trlcode
      t.decimal  :provcode
      t.decimal  :amcode
      t.decimal  :tmcode
      t.decimal  :fcode
      t.decimal  :lcode
      t.string   :flagbkd
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_sdepts
  end
end