class CreateCodeEdulevels < ActiveRecord::Migration
  def self.up
    create_table :code_edulevels do |t|
      t.integer :ecode
      t.string  :edulevel
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_edulevels
  end
end