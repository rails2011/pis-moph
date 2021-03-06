# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_pis-moph-rails_session',
  :secret      => '5390d97ff0bcd7850710e54a563ced2e0a04713046783a8f81fd79770924b378254c5f7f308facf675c48817b37dfc9ed4139f90a5ae02dd06dc460bbd014726'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
