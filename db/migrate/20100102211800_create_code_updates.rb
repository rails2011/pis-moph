class CreateCodeUpdates < ActiveRecord::Migration
  def self.up
    create_table :code_updates do |t|
      t.integer :updcode
      t.string  :updname
      t.decimal :updsort
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_updates
  end
end