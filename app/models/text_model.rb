class Text < ActiveRecord::Base
  attr_accessible :name, :words, :words_count, :words_size, :translations, :known
end