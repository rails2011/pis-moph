class CreateCodeDepts < ActiveRecord::Migration
  def self.up
    create_table :code_depts do |t|
      t.integer :deptcode
      t.string  :deptname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_depts
  end
end