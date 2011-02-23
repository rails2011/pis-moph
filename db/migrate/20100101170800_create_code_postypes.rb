class CreateCodePostypes < ActiveRecord::Migration
  def self.up
    create_table :code_postypes do |t|
      t.integer :ptcode
      t.string  :ptname
      t.string  :shortmn
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user   
      t.timestamps
    end
  end

  def self.down
    drop_table :code_postypes
  end
end