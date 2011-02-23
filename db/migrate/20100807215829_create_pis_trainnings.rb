class CreatePisTrainnings < ActiveRecord::Migration
  def self.up
    create_table :pis_trainnings do |t|
      t.integer     :tno
      t.date        :begindate
      t.string      :pis_personel_id
      t.integer     :cocode
      t.date        :enddate
      t.string      :cource
      t.string      :institute
     t.string       :upd_user      
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_trainnings
  end
end
