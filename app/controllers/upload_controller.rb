class UploadController < ApplicationController
  def index
    end
  def upload_file
      uploaded_file = params[:file]
      file_content = uploaded_file.read
      puts "file_content"
    end
end
