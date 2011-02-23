class CreateCodeJ18statuses < ActiveRecord::Migration
  def self.up
    create_table :code_j18statuses do |t|
      t.integer  :j18code
      t.string   :j18status
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_j18statuses
  end
end
