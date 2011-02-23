class CreateCodeAreas < ActiveRecord::Migration
  def self.up
    create_table :code_areas do |t|
      t.integer  :acode
      t.string   :aname
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_areas
  end
end
