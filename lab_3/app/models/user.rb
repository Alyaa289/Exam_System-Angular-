class User < ApplicationRecord
  validates :name, :dob, :email, :phone_number, presence: true
  validates :email, uniqueness: { case_sensitive: false }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
end
