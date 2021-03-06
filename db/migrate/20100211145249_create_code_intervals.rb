class CreateCodeIntervals < ActiveRecord::Migration
  def self.up
    create_table :code_intervals do |t|
      t.integer     :incode
      t.string      :inname
      t.string      :stdcode
      t.string      :use_status
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_intervals
  end
end
