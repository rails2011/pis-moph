class CreateCodeDivs < ActiveRecord::Migration
  def self.up
    create_table :code_divs do |t|
      t.integer :divcode
      t.string  :divname
      t.string  :prefix
      t.string  :flag
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_divs
  end
end