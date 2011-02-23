class CreatePisAbsents < ActiveRecord::Migration
  def self.up
    create_table :pis_absents do |t|
      t.string      :pis_personel_id
      t.integer     :abcode
      t.date        :begindate
      t.date        :enddate
      t.decimal     :amount,:precision => 5, :scale => 1
      t.string      :flagcount
      t.string      :upd_user      
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_absents
  end
end
