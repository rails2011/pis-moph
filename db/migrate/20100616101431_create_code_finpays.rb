class CreateCodeFinpays < ActiveRecord::Migration
  def self.up
    create_table :code_finpays do |t|
      t.integer     :fcode
      t.string      :finname
      t.string      :stdcode
      t.string      :use_status
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_finpays
  end
end
