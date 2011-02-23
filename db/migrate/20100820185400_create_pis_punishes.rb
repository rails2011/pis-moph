class CreatePisPunishes < ActiveRecord::Migration
  def self.up
    create_table :pis_punishes do |t|
      t.string      :pis_personel_id
      t.date        :forcedate
      t.integer     :puncode
      t.string      :description
      t.string      :cmdno
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_punishes
  end
end
