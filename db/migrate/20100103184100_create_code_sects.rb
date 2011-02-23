class CreateCodeSects < ActiveRecord::Migration
  def self.up
    create_table :code_sects do |t|
      t.integer :sectcode
      t.string  :shortname
      t.string  :sectname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_sects
  end
end