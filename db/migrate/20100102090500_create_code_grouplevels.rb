class CreateCodeGrouplevels < ActiveRecord::Migration
  def self.up
    create_table :code_grouplevels do |t|
      t.integer :ccode
      t.string  :cname
      t.string  :scname
      t.string  :stdcode
			t.decimal :minsal, :precision => 8, :scale => 2
			t.decimal :maxsal, :precision => 8, :scale => 2
			t.string :gname
			t.string :clname
      t.string  :use_status
      t.string  :upd_user   
      t.timestamps
    end
  end

  def self.down
    drop_table :code_grouplevels
  end
end