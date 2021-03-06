class CreatePisPersonels < ActiveRecord::Migration
  def self.up
    create_table :pis_personels do |t|      
      t.string      :pis_personel_id
      t.integer     :precode
      t.string      :fname
      t.string      :lname
      t.string      :sex
      t.string      :race
      t.string      :nationality
      t.integer     :mrcode
      t.integer     :relcode
      t.date        :birthdate
      t.date        :appointdate
      t.date        :deptdate
      t.date        :cdate
      t.date        :retiredate
      t.integer     :divcode
      t.integer     :deptcode
      t.integer     :sdcode
      t.integer     :sectcode
      t.integer     :jobcode
      t.integer     :hmcode      
      t.integer     :poscode
      t.integer     :excode
      t.integer     :epcode
      t.integer     :provcode
      t.string      :address1
      t.string      :address2
      t.string      :tel
      t.integer     :zip
      t.integer     :macode
      t.integer     :qcode
      t.integer     :ecode
      t.integer     :cocode      
      t.integer     :posid
      t.integer     :c
      t.decimal     :salary ,:precision => 8, :scale => 2           
      t.string      :oldfname
      t.string      :oldlname
      t.string      :father
      t.string      :mother
      t.string      :spouse      
      t.integer     :childs
      t.decimal     :totalabsent ,:precision => 5, :scale => 1
      t.integer     :salcode
      t.integer     :j18code
      t.string      :picname
      t.string      :note
      t.integer     :oldid
      t.date        :exitdate
      t.integer     :spcode
      t.decimal     :spmny,:precision => 8, :scale => 2
      t.integer     :spexpos
      t.integer     :codetrade
      t.date        :renamedate
      t.date        :getindate
      t.string      :kbk
      t.string      :pstatus
      t.integer     :ptcode
      t.decimal     :vac1oct,:precision => 4, :scale => 1
      t.string      :pid
      t.integer     :mincode
      t.integer     :officecode
      t.date        :attenddate
      t.date        :reentrydate
      t.date        :quitdate
      t.string      :note2
      t.string      :specialty
      t.integer     :subdcode
      t.string      :bloodgroup
      t.string      :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_personels
  end
end
