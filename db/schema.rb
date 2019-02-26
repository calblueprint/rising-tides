# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

<<<<<<< HEAD
ActiveRecord::Schema.define(version: 2019_02_25_053805) do
=======
ActiveRecord::Schema.define(version: 2019_02_24_000002) do
>>>>>>> df06293... Allow profile image upload

  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'admins', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['email'], name: 'index_admins_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_admins_on_reset_password_token', unique: true
  end

  create_table 'applications', force: :cascade do |t|
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    # labeled 'why are you interested'
    t.text 'question1'
    # labeled 'what experience could you contribute'
    t.text 'question2'
    # labeled 'skills'
    t.text 'question3'
    t.bigint 'project_id'
    # 1 = rejected; 2 = approved
    t.integer 'status', default: 0
    t.bigint 'user_id'
  end

  create_table 'organizations', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'name'
    t.string 'city'
    t.string 'state'
    t.string 'link'
    t.string 'description'
    t.string 'contact_first_name'
    t.string 'contact_last_name'
    t.string 'contact_phone_number'
    t.index ['email'], name: 'index_organizations_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_organizations_on_reset_password_token', unique: true
  end

<<<<<<< HEAD
  create_table 'projects', force: :cascade do |t|
    t.string 'title'
    t.text 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'limit'
    # labeled 'project plan'
    t.text 'overview'
    # labeled 'project outputs'
    t.text 'deliverable'
    # labeled 'professional skills needed'
    t.text 'volunteer_requirements'
    t.text 'other_details'
    t.integer 'organization_id'
    t.datetime 'start_time'
    t.datetime 'end_time'
    # labeled 'Our Community Needs This If'
    t.text 'question1'
    # labeled 'the right volunteer for this project is'
    t.text 'question2'
    # labeled 'what you give, what you get'
    t.text 'question3'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'first_name'
    t.string 'last_name'
    t.string 'city'
    t.string 'state'
    t.string 'link'
    t.string 'bio'
    t.string 'skills'
    t.string 'phone_number'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
=======
  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "city"
    t.string "state"
    t.string "link"
    t.string "bio"
    t.string "skills"
    t.string "phone_number"
    t.string "profile_image_file_name"
    t.string "profile_image_content_type"
    t.integer "profile_image_file_size"
    t.datetime "profile_image_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
>>>>>>> df06293... Allow profile image upload
  end

end
