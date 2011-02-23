class CreateCodePrefixes < ActiveRecord::Migration
  def self.up
    create_table :code_prefixes do |t|
      t.integer :precode
      t.string  :prename
      t.string  :longpre
      t.decimal :prefax
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_prefixes
  end
end