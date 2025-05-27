class User < ApplicationRecord
    has_many :posts
    has_many :editors_posts
    has_many :editors, through: :editors_posts, source: :user
end
