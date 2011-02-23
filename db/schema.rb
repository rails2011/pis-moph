# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100820185400) do

  create_table "code_abtypes", :force => true do |t|
    t.integer  "abcode"
    t.string   "abtype"
    t.string   "abcheck"
    t.string   "abcount"
    t.string   "abquota"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_amphurs", :force => true do |t|
    t.integer  "amcode"
    t.integer  "provcode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "amname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_areas", :force => true do |t|
    t.integer  "acode"
    t.string   "aname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_countries", :force => true do |t|
    t.integer  "cocode"
    t.string   "coname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_decoratypes", :force => true do |t|
    t.integer  "dccode"
    t.string   "shortname"
    t.string   "dcname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_depts", :force => true do |t|
    t.integer  "deptcode"
    t.string   "deptname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_divs", :force => true do |t|
    t.integer  "divcode"
    t.string   "divname"
    t.string   "prefix"
    t.string   "flag"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_edulevels", :force => true do |t|
    t.integer  "ecode"
    t.string   "edulevel"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_epngroups", :force => true do |t|
    t.integer  "gcode"
    t.string   "gname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_epnposworks", :force => true do |t|
    t.integer  "wcode"
    t.integer  "gcode"
    t.integer  "sgcode"
    t.string   "wname"
    t.string   "level"
    t.decimal  "minwage",    :precision => 8, :scale => 2
    t.decimal  "maxwage",    :precision => 8, :scale => 2
    t.string   "wattrib"
    t.string   "note"
    t.decimal  "numcode"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_epnsubgroups", :force => true do |t|
    t.integer  "sgcode"
    t.string   "sgname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_executives", :force => true do |t|
    t.integer  "excode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "exname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_experts", :force => true do |t|
    t.integer  "epcode"
    t.string   "prename"
    t.string   "expert"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_finpays", :force => true do |t|
    t.integer  "fcode"
    t.string   "finname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_grouplevels", :force => true do |t|
    t.integer  "ccode"
    t.string   "cname"
    t.string   "scname"
    t.string   "stdcode"
    t.decimal  "minsal",     :precision => 8, :scale => 2
    t.decimal  "maxsal",     :precision => 8, :scale => 2
    t.string   "gname"
    t.string   "clname"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_hmods", :primary_key => "hmcode", :force => true do |t|
    t.string   "hmod"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_intervals", :force => true do |t|
    t.integer  "incode"
    t.string   "inname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_j18statuses", :force => true do |t|
    t.integer  "j18code"
    t.string   "j18status"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_jobs", :force => true do |t|
    t.integer  "jobcode"
    t.string   "jobname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_majors", :force => true do |t|
    t.integer  "macode"
    t.string   "major"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_maritals", :force => true do |t|
    t.integer  "mrcode"
    t.string   "marital"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_minis", :force => true do |t|
    t.integer  "mincode"
    t.string   "minname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_positions", :force => true do |t|
    t.integer  "poscode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "posname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_postypes", :force => true do |t|
    t.integer  "ptcode"
    t.string   "ptname"
    t.string   "shortmn"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_prefixes", :force => true do |t|
    t.integer  "precode"
    t.string   "prename"
    t.string   "longpre"
    t.decimal  "prefax"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_provinces", :force => true do |t|
    t.integer  "provcode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "provname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_punishes", :force => true do |t|
    t.integer  "puncode"
    t.string   "punname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_qualifies", :force => true do |t|
    t.integer  "qcode"
    t.integer  "ecode"
    t.string   "qualify"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_religs", :force => true do |t|
    t.integer  "relcode"
    t.string   "relname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_salaries", :force => true do |t|
    t.integer  "c"
    t.decimal  "salary",     :precision => 8, :scale => 2
    t.string   "flagbound"
    t.decimal  "cstep",      :precision => 3, :scale => 1
    t.decimal  "newsal1"
    t.decimal  "newsal2"
    t.decimal  "newsal3"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_sdepts", :force => true do |t|
    t.integer  "sdcode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "sdname"
    t.decimal  "sdtcode"
    t.decimal  "sdgcode"
    t.decimal  "acode"
    t.decimal  "trlcode"
    t.decimal  "provcode"
    t.decimal  "amcode"
    t.decimal  "tmcode"
    t.decimal  "fcode"
    t.decimal  "lcode"
    t.string   "flagbkd"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_sdtypes", :force => true do |t|
    t.integer  "sdtcode"
    t.string   "sdtname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_sects", :force => true do |t|
    t.integer  "sectcode"
    t.string   "shortname"
    t.string   "sectname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_spcodes", :force => true do |t|
    t.string   "spcode"
    t.string   "spdesc"
    t.string   "groupid"
    t.string   "spcodeold"
    t.string   "splevel"
    t.integer  "poscode"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_trades", :force => true do |t|
    t.integer  "codetrade"
    t.string   "trade"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_tumbons", :force => true do |t|
    t.integer  "tmcode"
    t.integer  "amcode"
    t.integer  "provcode"
    t.string   "shortpre"
    t.string   "longpre"
    t.string   "tmname"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_updates", :force => true do |t|
    t.integer  "updcode"
    t.string   "updname"
    t.decimal  "updsort"
    t.string   "stdcode"
    t.string   "use_status"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_absents", :force => true do |t|
    t.string   "pis_personel_id"
    t.integer  "abcode"
    t.date     "begindate"
    t.date     "enddate"
    t.decimal  "amount",          :precision => 5, :scale => 1
    t.string   "flagcount"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_chgnames", :primary_key => "chgno", :force => true do |t|
    t.string   "pis_personel_id"
    t.date     "chgdate"
    t.integer  "precode"
    t.string   "fname"
    t.string   "lname"
    t.string   "ref"
    t.integer  "chgcode"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_educations", :force => true do |t|
    t.string   "pis_personel_id"
    t.integer  "eorder"
    t.integer  "macode"
    t.integer  "qcode"
    t.integer  "ecode"
    t.integer  "cocode"
    t.string   "institute"
    t.date     "enddate"
    t.string   "flag"
    t.string   "spcode"
    t.string   "maxed"
    t.string   "status",          :default => "1"
    t.string   "note"
    t.string   "regisno"
    t.date     "edstart"
    t.date     "edend"
    t.string   "refno"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_insigs", :force => true do |t|
    t.string   "pis_personel_id"
    t.integer  "dccode"
    t.integer  "dcyear"
    t.integer  "book"
    t.string   "section"
    t.integer  "pageno"
    t.integer  "seq"
    t.date     "recdate"
    t.date     "kitjadate"
    t.date     "retdate"
    t.string   "billno"
    t.string   "bookno"
    t.date     "billdate"
    t.integer  "money"
    t.integer  "poscode"
    t.integer  "excode"
    t.integer  "epcode"
    t.integer  "c"
    t.string   "upd_user"
    t.integer  "ptcode"
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_j18s", :force => true do |t|
    t.integer  "posid"
    t.string   "pis_personel_id"
    t.integer  "divcode"
    t.integer  "deptcode"
    t.integer  "sdcode"
    t.integer  "sectcode"
    t.integer  "jobcode"
    t.integer  "poscode"
    t.integer  "excode"
    t.integer  "epcode"
    t.integer  "lastc"
    t.integer  "lastsal"
    t.integer  "nowc"
    t.integer  "nowsal"
    t.integer  "lastcasb"
    t.integer  "lastsalasb"
    t.integer  "nowcasb"
    t.integer  "nowsalasb"
    t.integer  "decmny"
    t.integer  "incmny"
    t.integer  "qualmny"
    t.integer  "posupmny"
    t.integer  "addmny"
    t.string   "flagasb"
    t.integer  "posmny"
    t.integer  "bkdmny"
    t.integer  "precode"
    t.integer  "incode"
    t.integer  "pcdcode"
    t.integer  "ptcode"
    t.string   "rem"
    t.date     "emptydate"
    t.date     "asbdate"
    t.string   "flagupdate"
    t.integer  "c"
    t.integer  "addc"
    t.integer  "salary"
    t.integer  "rp_order"
    t.integer  "posid2"
    t.integer  "dcode2"
    t.integer  "sdcode2"
    t.integer  "seccode2"
    t.integer  "jobcode2"
    t.integer  "sortj182"
    t.integer  "updapr"
    t.integer  "updoct"
    t.integer  "mincode"
    t.integer  "subdcode"
    t.integer  "octsalary"
    t.integer  "octc"
    t.integer  "aprsalary"
    t.integer  "aprc"
    t.string   "rem2"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_personels", :force => true do |t|
    t.string   "pis_personel_id"
    t.integer  "precode"
    t.string   "fname"
    t.string   "lname"
    t.string   "sex"
    t.string   "race"
    t.string   "nationality"
    t.integer  "mrcode"
    t.integer  "relcode"
    t.date     "birthdate"
    t.date     "appointdate"
    t.date     "deptdate"
    t.date     "cdate"
    t.date     "retiredate"
    t.integer  "divcode"
    t.integer  "deptcode"
    t.integer  "sdcode"
    t.integer  "sectcode"
    t.integer  "jobcode"
    t.integer  "hmcode"
    t.integer  "poscode"
    t.integer  "excode"
    t.integer  "epcode"
    t.integer  "provcode"
    t.string   "address1"
    t.string   "address2"
    t.string   "tel"
    t.integer  "zip"
    t.integer  "macode"
    t.integer  "qcode"
    t.integer  "ecode"
    t.integer  "cocode"
    t.integer  "posid"
    t.integer  "c"
    t.decimal  "salary",          :precision => 8, :scale => 2
    t.string   "oldfname"
    t.string   "oldlname"
    t.string   "father"
    t.string   "mother"
    t.string   "spouse"
    t.integer  "childs"
    t.decimal  "totalabsent",     :precision => 5, :scale => 1
    t.integer  "salcode"
    t.integer  "j18code"
    t.string   "picname"
    t.string   "note"
    t.integer  "oldid"
    t.date     "exitdate"
    t.integer  "spcode"
    t.decimal  "spmny",           :precision => 8, :scale => 2
    t.integer  "spexpos"
    t.integer  "codetrade"
    t.date     "renamedate"
    t.date     "getindate"
    t.string   "kbk"
    t.string   "pstatus"
    t.integer  "ptcode"
    t.decimal  "vac1oct",         :precision => 4, :scale => 1
    t.string   "pid"
    t.integer  "mincode"
    t.integer  "officecode"
    t.date     "attenddate"
    t.date     "reentrydate"
    t.date     "quitdate"
    t.string   "note2"
    t.string   "specialty"
    t.integer  "subdcode"
    t.string   "bloodgroup"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_poshis", :force => true do |t|
    t.string   "pis_personel_id"
    t.integer  "historder"
    t.date     "forcedate"
    t.integer  "poscode"
    t.integer  "excode"
    t.integer  "epcode"
    t.integer  "mincode"
    t.integer  "divcode"
    t.integer  "deptcode"
    t.integer  "sdcode"
    t.integer  "sectcode"
    t.integer  "jobcode"
    t.integer  "hmcode"
    t.integer  "updcode"
    t.integer  "posid"
    t.integer  "c"
    t.integer  "salary"
    t.string   "refcmnd"
    t.text     "note"
    t.integer  "ptcode"
    t.string   "persontype"
    t.integer  "subdcode"
    t.integer  "officecode"
    t.integer  "histno"
    t.integer  "upsalary"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_punishes", :force => true do |t|
    t.string   "pis_personel_id"
    t.date     "forcedate"
    t.integer  "puncode"
    t.string   "description"
    t.string   "cmdno"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pis_trainnings", :force => true do |t|
    t.integer  "tno"
    t.date     "begindate"
    t.string   "pis_personel_id"
    t.integer  "cocode"
    t.date     "enddate"
    t.string   "cource"
    t.string   "institute"
    t.string   "upd_user"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
