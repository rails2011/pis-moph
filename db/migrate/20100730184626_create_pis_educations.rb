class CreatePisEducations < ActiveRecord::Migration
  def self.up
    create_table :pis_educations do |t|      
      t.string          :pis_personel_id
      t.integer         :eorder
      t.integer         :macode
      t.integer         :qcode
      t.integer         :ecode        
      t.integer         :cocode
      t.string          :institute
      t.date            :enddate
      t.string          :flag
      t.string          :spcode
      t.string          :maxed
      t.string          :status, :default => 1
      t.string          :note
      t.string          :regisno
      t.date            :edstart
      t.date            :edend
      t.string          :refno
      t.string          :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_educations
  end
end
